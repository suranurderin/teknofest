import { NextResponse } from "next/server";

type ListingInput = {
  id: string;
  team: string;
  title: string;
  competition: string;
  skills: string[];
  city: string;
  workType: string;
  description: string;
};

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as { profile?: Record<string, unknown>; listings?: ListingInput[] };
    const listings = Array.isArray(body.listings) ? body.listings.slice(0, 20).filter((item) => item?.id && item?.title) : [];
    if (listings.length < 3) return NextResponse.json({ error: "Öneri için yeterli takım ilanı bulunamadı." }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    if (!apiKey) return NextResponse.json({ error: "Gemini API anahtarı yapılandırılmamış." }, { status: 500 });

    const schema = {
      type: "object",
      properties: {
        recommendations: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: {
            type: "object",
            properties: {
              id: { type: "string", enum: listings.map((item) => item.id) },
              score: { type: "integer", minimum: 50, maximum: 98 },
              reason: { type: "string" }
            },
            required: ["id", "score", "reason"]
          }
        }
      },
      required: ["recommendations"]
    };

    const prompt = `Bir takım eşleştirme uzmanısın. Kullanıcının profilini açık takım ilanlarıyla karşılaştır. En uygun 3 farklı ilanı, en yüksek puan önce olacak şekilde seç. Doğrulanmış yetkinliklere en yüksek önemi ver. Doğrulanmamış yetkinlikleri yalnızca ilgi göstergesi say ve güçlü kanıt gibi değerlendirme. Bölüm, şehir, eğitim ve hobileri destekleyici sinyal olarak kullan. Profil bilgisi eksikse ilanın erişilebilirliği ve genel uygunluğuna göre değerlendir. Her öneri için Türkçe, samimi, en fazla 18 kelimelik kişisel bir gerekçe yaz. Olmayan veya doğrulanmamış bir yetkinliği doğrulanmış gibi söyleme.\n\nKULLANICI PROFİLİ:\n${JSON.stringify(body.profile || {})}\n\nTAKIM İLANLARI:\n${JSON.stringify(listings)}`;
    const requestBody = JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.35, responseMimeType: "application/json", responseSchema: schema }
    });
    const callGemini = (model: string) => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: requestBody,
      signal: AbortSignal.timeout(75000)
    });

    const models = [...new Set([configuredModel, "gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash-lite"])];
    let response: Response | null = null;
    let result: GeminiResponse = {};
    for (const [index, model] of models.entries()) {
      response = await callGemini(model);
      result = await response.json() as GeminiResponse;
      if (response.ok) break;
      if (![404, 429, 503].includes(response.status) || index === models.length - 1) break;
      console.warn(`Gemini recommendation request returned ${response.status}; trying another Flash model.`);
    }
    if (!response?.ok) {
      console.error("Gemini recommendation error:", response?.status, result.error?.message);
      return NextResponse.json({ error: "Yapay zekâ şu anda öneri oluşturamadı. Lütfen tekrar dene." }, { status: 502 });
    }

    const text = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    if (!text) throw new Error("Gemini boş yanıt döndürdü.");
    const recommendations = JSON.parse(text) as { recommendations?: Array<{ id: string; score: number; reason: string }> };
    if (!Array.isArray(recommendations.recommendations) || recommendations.recommendations.length !== 3) throw new Error("Geçersiz öneri biçimi.");
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Team recommendations failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Öneriler oluşturulurken bir sorun oluştu. Lütfen tekrar dene." }, { status: 500 });
  }
}
