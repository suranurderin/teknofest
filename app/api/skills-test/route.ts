import { NextResponse } from "next/server";

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

const quizSchema = {
  type: "object",
  properties: {
    topic: { type: "string" },
    level: { type: "string", enum: ["Kolay", "Orta", "Zor"] },
    questions: {
      type: "array",
      minItems: 10,
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
          correctIndex: { type: "integer", minimum: 0, maximum: 3 },
          explanation: { type: "string" }
        },
        required: ["question", "options", "correctIndex", "explanation"]
      }
    }
  },
  required: ["topic", "level", "questions"]
};

export async function POST(request: Request) {
  try {
    const { prompt, difficulty } = await request.json() as { prompt?: string; difficulty?: string };
    const cleanPrompt = prompt?.trim();
    const selectedDifficulty = (["Kolay", "Orta", "Zor"].includes(difficulty || "") ? difficulty : "Orta") as "Kolay" | "Orta" | "Zor";
    if (!cleanPrompt || cleanPrompt.length < 2 || cleanPrompt.length > 160) {
      return NextResponse.json({ error: "Lütfen ölçülmek istediğin konuyu kısaca yaz." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API anahtarı yapılandırılmamış." }, { status: 500 });
    }

    const requestBody = JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `Kullanıcının isteği: "${cleanPrompt}"\nKullanıcının arayüzden seçtiği zorluk: "${selectedDifficulty}"\n\nBu istekte belirtilen teknik veya mesleki konuda Türkçe, tam 10 soruluk çoktan seçmeli bir yetenek testi hazırla. Her soruda birbirinden farklı 4 seçenek olsun. Tüm soruların zorluğunu kullanıcının seçtiği ${selectedDifficulty} seviyesine göre ayarla ve çıktının level alanını tam olarak "${selectedDifficulty}" yap. Seçilen zorluk, kullanıcının cümlesinde geçen olası seviye ifadesinden önceliklidir. Sorular ezberden çok kavrayışı ölçsün. Kod konusuysa kısa ve okunabilir kod parçaları kullan. Açıklamalar öğretici ve kısa olsun.` }] }],
        generationConfig: {
          temperature: 0.65,
          responseMimeType: "application/json",
          responseSchema: quizSchema
        }
    });
    const callGemini = (model: string) => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: requestBody,
      signal: AbortSignal.timeout(75000)
    });

    const modelCandidates = [...new Set([configuredModel, "gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash-lite"])];
    let geminiResponse: Response | null = null;
    let result: GeminiResponse = {};
    for (const [index, model] of modelCandidates.entries()) {
      geminiResponse = await callGemini(model);
      result = await geminiResponse.json() as GeminiResponse;
      if (geminiResponse.ok) break;
      const canRetry = [404, 429, 503].includes(geminiResponse.status) && index < modelCandidates.length - 1;
      if (!canRetry) break;
      console.warn(`Gemini model request returned ${geminiResponse.status}; trying another Flash model.`);
    }
    if (!geminiResponse) throw new Error("Gemini isteği başlatılamadı.");
    if (!geminiResponse.ok) {
      console.error("Gemini API error:", geminiResponse.status, result.error?.message);
      return NextResponse.json({ error: "Yapay zekâ testi oluşturamadı. Lütfen tekrar dene." }, { status: 502 });
    }

    const text = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    if (!text) throw new Error("Gemini boş yanıt döndürdü.");
    const quiz = JSON.parse(text) as { questions?: unknown[] };
    if (!Array.isArray(quiz.questions) || quiz.questions.length !== 10) throw new Error("Geçersiz test biçimi.");

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Skills test generation failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Test oluşturulurken bir sorun oluştu. Lütfen tekrar dene." }, { status: 500 });
  }
}
