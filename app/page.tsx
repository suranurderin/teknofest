"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

const competitionOptions = [
  "5G & Yapay Zeka ile Akıllı Yol Güvenliği Yarışması",
  "Biyoteknoloji İnovasyon Yarışması",
  "Blokzincir Yarışması",
  "Çip Tasarım Yarışması",
  "Dikey İnişli Roket Yarışması",
  "E-Ticaret Yarışması",
  "Yapay Zeka Destekli Lojistik Anahat Optimizasyonu Yarışması",
  "Finansal Teknolojiler Yarışması",
  "Hareketli Uydu Terminali Yarışması",
  "Havacılıkta Yapay Zeka Yarışması",
  "Çelikkubbe Hava Savunma Sistemleri Yarışması",
  "Hyperloop Geliştirme Yarışması",
  "İnsansız Deniz Aracı Yarışması",
  "İnsansız Kara Aracı Yarışması",
  "İnsansız Su Altı Sistemleri Yarışması",
  "İnsansız Su Altı Sistemleri Yıldızlar Yarışması",
  "Jet Motor Tasarım Yarışması",
  "Kuantum Teknolojileri Yarışması",
  "Liseler Arası İnsansız Hava Araçları Yarışması",
  "Lise Öğrencileri İklim Değişikliği Araştırma Projeleri Yarışması",
  "Lise Öğrencileri Kutup Araştırma Projeleri Yarışması",
  "Model Uydu Yarışması",
  "Nükleer Enerji Teknolojileri Tasarım Yarışması",
  "Onkolojide 3T Yarışması",
  "Pardus Hata Yakalama ve Öneri Yarışması",
  "Robotaksi-Binek Otonom Araç Yarışması",
  "Roket Yarışması",
  "Sağlıkta Yapay Zeka Yarışması",
  "Sanayide Robotik Uygulamalar Yarışması",
  "Sürü İHA Yarışması",
  "Savaşan İHA Yıldızlar Yarışması",
  "Savaşan İHA Yarışması",
  "Savaşan İHA Avcı Drone Yarışması",
  "Su Altı Roket Yarışması",
  "Tarım Teknolojileri Yarışması",
  "TEKNOFEST Drone Şampiyonası",
  "TEKNOFEST Mimari ve Görsel Tasarım Yarışması",
  "TEKNOFEST Robolig Yarışması",
  "World Drone Cup",
  "İnsanlık Yararına Teknolojiler Yarışması - İlkokul Seviyesi",
  "İnsanlık Yararına Teknolojiler Yarışması - Ortaokul Seviyesi",
  "İnsanlık Yararına Teknolojiler Yarışması - Lise Seviyesi",
  "Uluslararası Elektrikli Araç Yarışları",
  "Uluslararası İnsansız Hava Aracı Yarışması",
  "Üniversite Öğrencileri Araştırma Proje Yarışmaları",
  "Yapay Zeka Destekli Havayolu Optimizasyonu Yarışması",
  "Yapay Zeka Dil Ajanları Yarışması",
  "TÜBA-TEKNOFEST Doktora Bilim Ödülleri",
  "HackMasters Güneydoğu",
  "NSOSYAL İnovasyon Yarışması",
  "Mavi Vatan Resim Yarışması",
  "Bağımlılıklarla Mücadelede Teknolojik Uygulamalar Yarışması",
  "FPV Drone İzleme (Tracking) Yarışması",
  "KÜRE TEKNOFEST Mavi Vatan Makale Yazım Yarışması",
  "Elektronik Harp Yarışması",
  "TEKNOFEST Yapay Zeka Film Yarışması",
  "Sıfır Atık & Döngüsel Ekonomi Yarışması",
  "Maden Teknolojileri Yarışması",
  "İleri Otonom Sistemler Tasarım ve Operasyon Yarışması",
  "TEKNOFEST Mesleki Yetenek Yarışması"
];

const skillTestSuggestions = [
  "Python", "React", "Proje Yönetimi", "Yapay Zekâ", "UI/UX Tasarımı",
  "Siber Güvenlik", "İngilizce", "Veri Bilimi", "Grafik Tasarım", "Unity",
  "C#", "JavaScript", "Mobil Uygulama", "Web Geliştirme", "Makine Öğrenmesi",
  "Sosyal Medya Yönetimi", "Dijital Pazarlama", "İş Analizi", "Liderlik",
  "Sunum Teknikleri", "Akademik Yazım", "Girişimcilik", "Görüntü İşleme",
  "Veri Analizi", "Mobil Uygulama Geliştirme", "Robotik Kodlama",
  "Elektronik Devre Tasarımı", "PCB Tasarımı", "Mekanik Tasarım", "CAD Modelleme",
  "Uçuş Kontrol Yazılımı", "Otonom Sistemler", "Sensör Entegrasyonu",
  "Bulut Teknolojileri", "Nesnelerin İnterneti", "Teknik Raporlama",
  "Sunum ve Proje Anlatımı"
];

const testDurations: Record<"Kolay" | "Orta" | "Zor", number> = { Kolay: 3 * 60, Orta: 5 * 60, Zor: 10 * 60 };

type TeamListing = {
  id: string;
  team: string;
  title: string;
  competition: string;
  skills: string[];
  city: string;
  workType: string;
  description: string;
  members: number;
};

const initialTeamListings: TeamListing[] = [
  { id: "agrovision", team: "AgroVision", title: "Görüntü İşleme Geliştiricisi Arıyoruz", competition: "Tarım Teknolojileri Yarışması", skills: ["Python", "Görüntü İşleme", "Makine Öğrenmesi"], city: "İstanbul", workType: "Hibrit", description: "Bitki hastalıklarını erken tespit eden görüntü işleme modelimizi geliştirecek takım arkadaşı arıyoruz.", members: 4 },
  { id: "skyroute", team: "SkyRoute AI", title: "Yapay Zekâ ve Optimizasyon Takım Arkadaşı", competition: "Yapay Zeka Destekli Havayolu Optimizasyonu Yarışması", skills: ["Python", "Veri Bilimi", "Optimizasyon"], city: "Ankara", workType: "Uzaktan", description: "Uçuş rotalarını optimize eden karar destek sistemi için veri ve algoritma tarafında çalışacak ekip arkadaşı arıyoruz.", members: 5 },
  { id: "cyberguard", team: "CyberGuard", title: "Siber Güvenlik Araştırmacısı", competition: "HackMasters Güneydoğu", skills: ["Siber Güvenlik", "Linux", "Ağ Güvenliği"], city: "Gaziantep", workType: "Uzaktan", description: "CTF hazırlıkları ve güvenlik analizi süreçlerine katılacak, öğrenmeye açık ekip arkadaşı arıyoruz.", members: 3 },
  { id: "robomotion", team: "RoboMotion", title: "Robotik Yazılım Geliştiricisi", competition: "TEKNOFEST Robolig Yarışması", skills: ["Robotik Kodlama", "C#", "Sensör Entegrasyonu"], city: "Konya", workType: "Yüz yüze", description: "Otonom görevleri ve sensör verilerini işleyecek robotik yazılım geliştiricisi arıyoruz.", members: 6 },
  { id: "deepblue", team: "DeepBlue", title: "Otonom Sistemler Takım Arkadaşı", competition: "İnsansız Su Altı Sistemleri Yarışması", skills: ["Otonom Sistemler", "C++", "Elektronik"], city: "İzmir", workType: "Hibrit", description: "Su altı aracının otonom kontrol ve sensör füzyonu modüllerini geliştirecek ekip arkadaşı arıyoruz.", members: 5 },
  { id: "designlab", team: "DesignLab", title: "UI/UX Tasarımcısı Arıyoruz", competition: "TEKNOFEST Mimari ve Görsel Tasarım Yarışması", skills: ["UI/UX Tasarımı", "Grafik Tasarım", "Figma"], city: "Sakarya", workType: "Uzaktan", description: "Proje arayüzleri, kullanıcı akışları ve sunum görselleri üzerinde çalışacak yaratıcı bir tasarımcı arıyoruz.", members: 4 }
];

type IconName = "users" | "search" | "chevron" | "profile" | "settings" | "logout" | "back" | "image" | "upload" | "plus" | "arrow" | "school" | "briefcase" | "clock" | "location" | "trophy" | "calendar" | "tag" | "message";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1v.1h-4v-.1A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4h-.1v-4H3A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1v-.1h4V3A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.37.72.6 1 .27.32.63.46 1 .5h.1v4H21a1.7 1.7 0 0 0-1.6.5Z"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></>,
    back: <><path d="m15 18-6-6 6-6"/><path d="M9 12h11"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    school: <><path d="m3 10 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 10v6"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM12 13v4M8 21h8M9 17h6"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
    tag: <><path d="M20 13 13 20 4 11V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A7 7 0 0 1 3 14V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></>
  };
  return <svg className="ui-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options?: string[]; onChange: (value: string) => void }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
    {(options || [value]).map((item) => <option key={item}>{item}</option>)}
  </select></label>;
}

type QuizQuestion = { question: string; options: string[]; correctIndex: number; explanation: string };
type Quiz = { topic: string; level: string; questions: QuizQuestion[] };
type TeamRecommendation = { id: string; score: number; reason: string };

const conversations = [
  { id: "agrovision", name: "AgroVision", initials: "AV", preview: "Toplantıyı takvime ekledim.", time: "14:32", unread: 2, online: true },
  { id: "skyroute", name: "SkyRoute AI", initials: "SA", preview: "Model sonuçlarını paylaşabilir misin?", time: "12:08", unread: 0, online: true },
  { id: "designlab", name: "DesignLab", initials: "DL", preview: "Arayüz taslağı hazır 🎨", time: "Dün", unread: 0, online: false },
  { id: "cyberguard", name: "CyberGuard", initials: "CG", preview: "Hafta sonu görüşelim.", time: "Pzt", unread: 0, online: false }
];

const calendarEvents = [
  { day: 18, time: "16:00", title: "AgroVision proje görüşmesi", color: "cyan" },
  { day: 20, time: "11:30", title: "SkyRoute teknik toplantı", color: "blue" },
  { day: 23, time: "19:00", title: "Takım tanışma buluşması", color: "purple" },
  { day: 27, time: "15:00", title: "DesignLab tasarım değerlendirmesi", color: "green" }
];

export default function Page() {
  const [activeView, setActiveView] = useState<"team-search" | "create-listing" | "skills-test" | "my-profile" | "messages">("team-search");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState("agrovision");
  const [messageInput, setMessageInput] = useState("");
  const [sentMessages, setSentMessages] = useState<Record<string, string[]>>({});
  const [testPrompt, setTestPrompt] = useState("");
  const [testDifficulty, setTestDifficulty] = useState<"Kolay" | "Orta" | "Zor">("Orta");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [antiCheatViolations, setAntiCheatViolations] = useState(0);
  const [quizEndReason, setQuizEndReason] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [skillResults, setSkillResults] = useState<Record<string, { level: string; score: number }>>({});
  const [skillToVerify, setSkillToVerify] = useState<string | null>(null);
  const [teamRecommendations, setTeamRecommendations] = useState<TeamRecommendation[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState("");
  const [appliedListings, setAppliedListings] = useState<string[]>([]);
  const [createdTeamListings, setCreatedTeamListings] = useState<TeamListing[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    school: "",
    education: "Üniversite",
    competition: "Tarım Teknolojileri Yarışması",
    department: "",
    grade: "",
    city: "",
    availability: ""
  });
  const [listingSent, setListingSent] = useState(false);
  const [listingSkills, setListingSkills] = useState<string[]>([]);
  const [listingSkillInput, setListingSkillInput] = useState("");
  const [listing, setListing] = useState({
    title: "",
    projectName: "",
    category: competitionOptions[0],
    stage: "Fikir aşaması",
    weeklyTime: "",
    deadline: "",
    description: ""
  });
  const updateListing = (field: keyof typeof listing, value: string) => {
    setListing((current) => ({ ...current, [field]: value }));
    setListingSent(false);
  };
  const createTeamListing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newListing: TeamListing = {
      id: `futureminds-${Date.now()}`,
      team: listing.projectName.trim(),
      title: listing.title.trim(),
      competition: listing.category,
      skills: listingSkills,
      city: profile.city.trim() || "Şehir belirtilmedi",
      workType: "",
      description: listing.description.trim(),
      members: 1
    };
    setCreatedTeamListings((current) => [newListing, ...current]);
    setListing({ title: "", projectName: "", category: competitionOptions[0], stage: "Fikir aşaması", weeklyTime: "", deadline: "", description: "" });
    setListingSkills([]);
    setListingSkillInput("");
    setListingSent(false);
    setTeamRecommendations([]);
    setActiveView("team-search");
  };
  const listingProgress = Math.round([
    listing.title.trim(), listing.projectName.trim(), listing.category, listing.stage,
    listingSkills.length > 0, listing.weeklyTime.trim(), listing.deadline, listing.description.trim()
  ].filter(Boolean).length / 8 * 100);
  const addListingSkill = () => {
    const skill = listingSkillInput.trim();
    if (!skill) return;
    if (!listingSkills.some((item) => item.toLocaleLowerCase("tr") === skill.toLocaleLowerCase("tr"))) {
      setListingSkills((current) => [...current, skill]);
    }
    setListingSkillInput("");
    setListingSent(false);
  };
  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };
  const completedItems = [
    profile.name.trim(),
    profile.education,
    profile.school.trim(),
    profile.department.trim(),
    profile.grade.trim(),
    profile.city.trim(),
    profile.availability.trim(),
    profile.competition,
    tags.length > 0,
    saved
  ];
  const progress = completedItems.filter(Boolean).length * 10;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };
  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhoto(reader.result);
        setSaved(false);
        setProfileSaved(false);
      }
    };
    reader.readAsDataURL(file);
  };
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (!tags.some((tag) => tag.toLocaleLowerCase("tr") === skill.toLocaleLowerCase("tr"))) {
      setTags((current) => [...current, skill]);
    }
    setSkillInput("");
    setSaved(false);
    setProfileSaved(false);
  };
  const generateQuiz = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!testPrompt.trim()) return;
    setQuizLoading(true);
    setQuizError("");
    setQuiz(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    try {
      const response = await fetch("/api/skills-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: testPrompt, difficulty: testDifficulty })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Test oluşturulamadı.");
      const generatedQuiz = data as Quiz;
      setQuiz(generatedQuiz);
      setSecondsLeft(testDurations[generatedQuiz.level as "Kolay" | "Orta" | "Zor"] || testDurations[testDifficulty]);
      setAntiCheatViolations(0);
      setQuizEndReason("");
    } catch (error) {
      setQuizError(error instanceof Error ? error.message : "Test oluşturulamadı.");
    } finally {
      setQuizLoading(false);
    }
  };
  const quizScore = quiz ? quiz.questions.reduce((score, question, index) => score + (quizAnswers[index] === question.correctIndex ? 1 : 0), 0) : 0;
  const quizPoints = quizScore * 10;
  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const addHobby = () => {
    const hobby = hobbyInput.trim();
    if (!hobby) return;
    if (!hobbies.some((item) => item.toLocaleLowerCase("tr") === hobby.toLocaleLowerCase("tr"))) setHobbies((current) => [...current, hobby]);
    setHobbyInput("");
    setProfileSaved(false);
  };
  const addSuggestedSkill = (skill: string) => {
    if (!tags.some((item) => item.toLocaleLowerCase("tr") === skill.toLocaleLowerCase("tr"))) setTags((current) => [...current, skill]);
    setProfileSaved(false);
  };
  const myProfileProgress = Math.round([profile.name, profile.education, profile.school, profile.department, profile.grade, profile.city, tags.length, hobbies.length].filter(Boolean).length / 8 * 100);
  const allTeamListings = [...createdTeamListings, ...initialTeamListings];
  const getTeamRecommendations = async () => {
    if (!profile.department.trim() && !profile.city.trim() && tags.length === 0) {
      setRecommendationsError("Sana özel öneri oluşturabilmemiz için Profilim bölümüne şehir, bölüm veya en az bir yetkinlik ekle.");
      return;
    }
    setRecommendationsLoading(true);
    setRecommendationsError("");
    try {
      const response = await fetch("/api/team-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: { education: profile.education, school: profile.school, department: profile.department, grade: profile.grade, city: profile.city, skills: tags.map((skill) => ({ name: skill, verified: verifiedSkills.includes(skill), level: skillResults[skill]?.level, score: skillResults[skill]?.score })), hobbies },
          listings: allTeamListings
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Öneriler oluşturulamadı.");
      setTeamRecommendations(data.recommendations as TeamRecommendation[]);
    } catch (error) {
      setRecommendationsError(error instanceof Error ? error.message : "Öneriler oluşturulamadı.");
    } finally {
      setRecommendationsLoading(false);
    }
  };
  const rankedTeamListings = [...allTeamListings].sort((a, b) => {
    const aScore = teamRecommendations.find((item) => item.id === a.id)?.score || 0;
    const bScore = teamRecommendations.find((item) => item.id === b.id)?.score || 0;
    return bScore - aScore;
  });
  const displayedTeamListings = teamRecommendations.length
    ? rankedTeamListings.filter((listing) => teamRecommendations.some((recommendation) => recommendation.id === listing.id))
    : rankedTeamListings;
  const bestRecommendation = [...teamRecommendations].sort((a, b) => b.score - a.score)[0];
  const bestTeamListing = allTeamListings.find((item) => item.id === bestRecommendation?.id);
  const openSkillVerification = (skill: string) => {
    setSkillToVerify(skill);
    setTestPrompt(`${skill} seviyemi test eder misin?`);
    setQuiz(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizError("");
    setActiveView("skills-test");
  };
  const submitQuiz = (reason = "") => {
    if (!quiz || quizSubmitted) return;
    setQuizSubmitted(true);
    setQuizEndReason(reason);
    const verificationName = skillToVerify || quiz.topic;
    if (quizPoints >= 60) {
      setVerifiedSkills((current) => current.some((skill) => skill.toLocaleLowerCase("tr") === verificationName.toLocaleLowerCase("tr")) ? current : [...current, verificationName]);
      setTags((current) => current.some((skill) => skill.toLocaleLowerCase("tr") === verificationName.toLocaleLowerCase("tr")) ? current : [...current, verificationName]);
      setSkillResults((current) => ({ ...current, [verificationName]: { level: quiz.level, score: quizPoints } }));
    }
  };
  const registerViolation = (message: string) => {
    if (!quiz || quizSubmitted) return;
    setQuizEndReason(message);
    setAntiCheatViolations((current) => {
      const next = current + 1;
      if (next >= 3) setTimeout(() => submitQuiz("3 kopya koruması ihlali nedeniyle test otomatik teslim edildi."), 0);
      return next;
    });
  };

  useEffect(() => {
    if (!quiz || quizSubmitted) return;
    if (secondsLeft <= 0) {
      submitQuiz("Süre dolduğu için test otomatik teslim edildi.");
      return;
    }
    const timer = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [quiz, quizSubmitted, secondsLeft]);

  useEffect(() => {
    if (!quiz || quizSubmitted) return;
    const handleVisibility = () => { if (document.hidden) registerViolation("Sekme değişikliği algılandı."); };
    const handleProtectedShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ["c", "u", "p", "a"].includes(event.key.toLocaleLowerCase())) {
        event.preventDefault();
        registerViolation("Kopyalama veya korumalı kısayol girişimi algılandı.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("keydown", handleProtectedShortcut);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("keydown", handleProtectedShortcut);
    };
  }, [quiz, quizSubmitted, antiCheatViolations]);

  return <main className="app">
    <aside className="sidebar">
      <div className="brand"><img src="/logo.png" alt="N Takım" /></div>
      <nav><button className="nav-item active">
        <span className="nav-icon"><Icon name="users" size={21} /></span><span>NTakım</span>
      </button></nav>
    </aside>

    <section className="workspace">
      <header className="topbar">
        <nav className="tabs"><button className={activeView === "team-search" ? "selected" : ""} onClick={() => setActiveView("team-search")}>Takım Ara</button><button className={activeView === "create-listing" ? "selected" : ""} onClick={() => setActiveView("create-listing")}>Takım İlanı Oluştur</button><button className={activeView === "skills-test" ? "selected" : ""} onClick={() => setActiveView("skills-test")}>Yetenek Testleri</button></nav>
        <div className="top-actions">
          <label className="search"><Icon name="search" size={19} /><input placeholder="Arama yap" /></label>
          <div className="account-area">
            <button className="account-button" type="button" aria-expanded={accountMenuOpen} aria-haspopup="menu" onClick={() => setAccountMenuOpen((current) => !current)}>
              <span className="account-avatar">FM<span className="online-dot" /></span>
              <span className="account-copy"><strong>futureminds</strong><small>@futureminds</small></span>
              <span className={`account-chevron ${accountMenuOpen ? "open" : ""}`}><Icon name="chevron" size={16} /></span>
            </button>
            {accountMenuOpen && <div className="account-menu" role="menu">
              <div className="account-menu-head"><span className="account-avatar large">FM<span className="online-dot" /></span><div><strong>futureminds</strong><small>@futureminds</small></div></div>
              <button type="button" role="menuitem" onClick={() => { setActiveView("my-profile"); setAccountMenuOpen(false); }}><Icon name="profile" /><span>Profilim</span></button>
              <button type="button" role="menuitem"><Icon name="settings" /><span>Hesap ayarları</span></button>
              <button type="button" role="menuitem" className="sign-out"><Icon name="logout" /><span>Çıkış yap</span></button>
            </div>}
          </div>
        </div>
      </header>

      <div className="content-grid">
        <section className="profile-shell">
          {activeView === "team-search" ? <>
          <div className="page-title team-search-title"><button aria-label="Geri"><Icon name="back" size={26} /></button><div><h1>Takım Ara</h1><p>Takımların açık ilanlarını keşfet, yapay zekâ desteğiyle sana en uygun projeyi bul.</p></div></div>
          <section className="ai-match-banner">
            <div className="ai-match-icon"><Icon name="trophy" size={28} /></div>
            <div><span>Yapay zekâ destekli eşleşme</span><h2>{teamRecommendations.length ? "Sana uygun ilanları öne çıkardık" : "Hangi takım sana daha uygun?"}</h2><p>Profilindeki bölüm, şehir ve yetkinlikleri ilanların ihtiyaçlarıyla karşılaştırıyoruz.</p></div>
            <button type="button" onClick={getTeamRecommendations} disabled={recommendationsLoading}>{recommendationsLoading ? "Analiz ediliyor…" : teamRecommendations.length ? "Yeniden analiz et" : "Bana göre öner"}<Icon name="arrow" size={18} /></button>
          </section>
          {recommendationsError && <p className="recommendation-error" role="alert">{recommendationsError}</p>}
          <div className="listing-toolbar"><div><h2>{teamRecommendations.length ? "Sana Uygun İlanlar" : "Açık Takım İlanları"}</h2><span>{displayedTeamListings.length} {teamRecommendations.length ? "kişisel eşleşme" : "aktif ilan"}</span></div><button type="button"><Icon name="settings" size={17} /> Filtrele</button></div>
          <div className="team-listings">{displayedTeamListings.map((item) => {
            const recommendation = teamRecommendations.find((match) => match.id === item.id);
            const applied = appliedListings.includes(item.id);
            return <article className={`team-listing-card ${recommendation && recommendation.score >= 70 ? "recommended" : ""}`} key={item.id}>
              <div className="team-card-head"><div className="team-logo">{item.team.slice(0, 2).toUpperCase()}</div><div><span>{item.team}</span><h3>{item.title}</h3></div>{recommendation && <div className="match-score"><strong>%{recommendation.score}</strong><small>Sana göre</small></div>}</div>
              {recommendation && <div className="ai-reason"><Icon name="trophy" size={17} /><span><strong>Yapay zekâ önerisi:</strong> {recommendation.reason}</span></div>}
              <p className="team-description">{item.description}</p>
              <div className="listing-meta"><span><Icon name="trophy" size={15} />{item.competition}</span><span><Icon name="location" size={15} />{item.city}</span><span><Icon name="users" size={15} />{item.members} üye</span></div>
              <div className="team-card-footer"><div className="listing-skill-tags">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><button type="button" className={applied ? "applied" : ""} onClick={() => setAppliedListings((current) => applied ? current.filter((id) => id !== item.id) : [...current, item.id])}>{applied ? "Başvuru gönderildi ✓" : "Takıma başvur"}<Icon name="arrow" size={17} /></button></div>
            </article>;
          })}</div>
          </> : activeView === "create-listing" ? <>
            <div className="page-title"><button aria-label="Geri" onClick={() => setActiveView("team-search")}><Icon name="back" size={26} /></button><div><h1>Takım İlanı Oluştur</h1><p>Projen için doğru ekip arkadaşlarına ulaşacak ilanını hazırla.</p></div></div>
            <form className="form-card listing-form" onSubmit={createTeamListing}>
              <h2>İlan Bilgileri</h2>
              <div className="form-grid listing-grid">
                <label className="field"><span>İlan başlığı</span><input required value={listing.title} onChange={(event) => updateListing("title", event.target.value)} /></label>
                <label className="field"><span>Proje adı</span><input required value={listing.projectName} onChange={(event) => updateListing("projectName", event.target.value)} /></label>
                <SelectField label="Yarışma kategorisi" value={listing.category} onChange={(value) => updateListing("category", value)} options={competitionOptions} />
                <SelectField label="Proje aşaması" value={listing.stage} onChange={(value) => updateListing("stage", value)} options={["Fikir aşaması", "Planlama", "Geliştirme", "Prototip", "Test aşaması"]} />
                <label className="field"><span>Son başvuru tarihi</span><input required type="date" value={listing.deadline} onChange={(event) => updateListing("deadline", event.target.value)} /></label>
                <label className="field"><span>Haftalık zaman</span><input required value={listing.weeklyTime} onChange={(event) => updateListing("weeklyTime", event.target.value)} placeholder="Örn. 8–10 saat" /></label>
                <div className="field full-field listing-skills-field"><span>Aranan yetkinlikler</span><div className="skill-entry"><input id="listing-skill-input" value={listingSkillInput} onChange={(event) => setListingSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addListingSkill(); } }} placeholder="Örn. Python, mekanik tasarım" /><button type="button" className="add-tag" onClick={addListingSkill}><Icon name="plus" size={17} /> Ekle</button></div><div className="tag-row">{listingSkills.map((skill) => <button type="button" key={skill} onClick={() => { setListingSkills(listingSkills.filter((item) => item !== skill)); setListingSent(false); }}>{skill}<span>×</span></button>)}</div>{listingSkills.length === 0 && <small className="skill-hint">Henüz aranan bir yetkinlik eklemedin.</small>}</div>
                <label className="field full-field"><span>İlan açıklaması</span><textarea required value={listing.description} onChange={(event) => updateListing("description", event.target.value)} placeholder="Projeyi ve aradığın takım arkadaşını kısaca anlat." /></label>
              </div>
              <div className="form-actions listing-actions"><button type="button" className="later" onClick={() => setActiveView("team-search")}>Vazgeç</button><button className="continue" disabled={listingSkills.length === 0}>{listingSent ? "İlan oluşturuldu ✓" : "İlanı Oluştur"}<span><Icon name="arrow" size={21} /></span></button></div>
            </form>
          </> : activeView === "skills-test" ? <>
            <div className="page-title"><button aria-label="Geri" onClick={() => setActiveView("team-search")}><Icon name="back" size={26} /></button><div><h1>Yapay Zekâ Yetenek Testi</h1><p>Ölçülmek istediğin konuyu yaz, Gemini sana özel 10 soruluk bir test hazırlasın.</p></div></div>
            {!quiz && <form className="form-card ai-test-intro" onSubmit={generateQuiz}>
              <div className="ai-orb"><Icon name="trophy" size={34} /></div>
              <h2>Hangi konuda kendini ölçmek istiyorsun?</h2>
              <p>Teknoloji, tasarım, proje yönetimi veya uzmanlık alanını doğal bir cümleyle yazabilirsin.</p>
              <div className="difficulty-picker"><span>Zorluk seviyesi</span><div>{(["Kolay", "Orta", "Zor"] as const).map((level) => <button type="button" className={testDifficulty === level ? "active" : ""} aria-pressed={testDifficulty === level} onClick={() => setTestDifficulty(level)} key={level}>{level}<small>{testDurations[level] / 60} dk</small></button>)}</div></div>
              <div className="ai-prompt-row"><input value={testPrompt} onChange={(event) => { setTestPrompt(event.target.value); setSkillToVerify(null); }} placeholder='Örn. "Python seviyemi test eder misin?"' maxLength={160} disabled={quizLoading} /><button disabled={quizLoading || !testPrompt.trim()}>{quizLoading ? "Sorular hazırlanıyor…" : "10 soruluk test oluştur"}<Icon name="arrow" size={19} /></button></div>
              <div className="prompt-suggestions">{skillTestSuggestions.map((topic) => <button type="button" onClick={() => { setTestPrompt(`${topic} seviyemi test eder misin?`); setSkillToVerify(topic); }} key={topic}>{topic}</button>)}</div>
              {quizError && <p className="quiz-error" role="alert">{quizError}</p>}
            </form>}
            {quiz && <section className="form-card quiz-card protected-quiz" onCopy={(event) => { event.preventDefault(); registerViolation("Kopyalama girişimi engellendi."); }} onCut={(event) => event.preventDefault()} onContextMenu={(event) => { event.preventDefault(); registerViolation("Sağ tık girişimi engellendi."); }} onDragStart={(event) => event.preventDefault()}>
              <div className="quiz-header"><div><span className="ai-label">{skillToVerify ? "Yetkinlik doğrulama testi" : "Gemini ile oluşturuldu"}</span><h2>{quiz.topic} Yetenek Testi</h2><p>{quiz.level} seviye · 10 soru · Her soru 10 puan · Doğrulama barajı 60/100</p></div>{quizSubmitted ? <strong className="score-badge">{quizPoints}<small>/100 · {quiz.level}</small></strong> : <div className={`quiz-live-status ${secondsLeft <= 60 ? "urgent" : ""}`}><strong>{formattedTime}</strong><small>Kalan süre</small><span>{antiCheatViolations}/3 ihlal</span></div>}</div>
              {!quizSubmitted && <div className="anti-cheat-notice"><Icon name="settings" size={18} /><div><strong>Kopya koruması etkin</strong><span>Kopyalama, sağ tık ve sekme değiştirme izlenir. 3 ihlalde test otomatik teslim edilir.</span></div></div>}
              {!quizSubmitted && quizEndReason && <div className="anti-cheat-warning" role="alert">⚠ {quizEndReason} ({antiCheatViolations}/3)</div>}
              <div className="quiz-questions">{quiz.questions.map((item, questionIndex) => <article className="quiz-question" key={`${item.question}-${questionIndex}`}>
                <div className="question-title"><span>{questionIndex + 1}</span><h3>{item.question}</h3><em>10 puan</em></div>
                <div className="option-grid">{item.options.map((option, optionIndex) => {
                  const selected = quizAnswers[questionIndex] === optionIndex;
                  const correct = quizSubmitted && optionIndex === item.correctIndex;
                  const wrong = quizSubmitted && selected && optionIndex !== item.correctIndex;
                  return <button type="button" disabled={quizSubmitted} className={`${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => setQuizAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} key={option}><span>{String.fromCharCode(65 + optionIndex)}</span><b>{option}</b></button>;
                })}</div>
                {quizSubmitted && <p className="answer-explanation"><strong>Açıklama:</strong> {item.explanation}</p>}
              </article>)}</div>
              {quizSubmitted && quizEndReason && <div className="quiz-end-reason">{quizEndReason}</div>}
              {quizSubmitted && <div className={`verification-result ${quizPoints >= 60 ? "passed" : "failed"}`}><strong>{quizPoints >= 60 ? `Yetkinlik doğrulandı · ${quiz.level} seviyede ${quizPoints}/100 ✓` : `Yetkinlik henüz doğrulanmadı · ${quiz.level} seviyede ${quizPoints}/100`}</strong><span>{quizPoints >= 60 ? `${skillToVerify || quiz.topic} profilinde ${quiz.level} düzeyinde doğrulanmış olarak gösterilecek.` : "Doğrulamak için en az 60 puan gerekiyor. Açıklamaları inceleyip tekrar deneyebilirsin."}</span></div>}
              <div className="quiz-actions"><button type="button" className="later" onClick={() => { setQuiz(null); setQuizSubmitted(false); setQuizAnswers({}); setSecondsLeft(0); setAntiCheatViolations(0); setQuizEndReason(""); }}>Yeni test oluştur</button><button type="button" className="continue" disabled={quizSubmitted || Object.keys(quizAnswers).length !== 10} onClick={() => submitQuiz()}>{quizSubmitted ? `${quiz.level} seviyede ${quizPoints}/100` : "Testi tamamla"}<span><Icon name="arrow" size={21} /></span></button></div>
            </section>}
          </> : activeView === "my-profile" ? <>
            <div className="page-title"><button aria-label="Geri" onClick={() => setActiveView("team-search")}><Icon name="back" size={26} /></button><div><h1>Profilim</h1><p>Kendini tanıt, yetkinliklerini ve ilgi alanlarını topluluğunla paylaş.</p></div></div>
            <form className="form-card my-profile-form" onSubmit={(event) => { event.preventDefault(); setProfileSaved(true); }}>
              <div className="profile-identity">
                <div className="photo-column"><input className="photo-input" id="my-profile-photo" type="file" accept="image/*" onChange={handlePhoto} /><label className="photo" htmlFor="my-profile-photo">{photo ? <img src={photo} alt="Profil fotoğrafı" /> : <span><Icon name="profile" size={38} /></span>}</label><label className="add-photo" htmlFor="my-profile-photo"><Icon name="upload" size={17} /> {photo ? "Fotoğrafı değiştir" : "Fotoğraf ekle"}</label></div>
                <div><span className="profile-handle">@futureminds</span><h2>{profile.name || "Ad Soyad"}</h2><p>Profil bilgilerini tamamlayarak takım arkadaşlarının seni daha kolay tanımasını sağla.</p></div>
              </div>
              <section className="profile-edit-section"><h2>Kişisel Bilgiler</h2><div className="form-grid profile-fields">
                <label className="field"><span>Ad Soyadı</span><input required value={profile.name} onChange={(event) => { updateProfile("name", event.target.value); setProfileSaved(false); }} placeholder="Adını ve soyadını yaz" /></label>
                <SelectField label="Eğitim Durumu" value={profile.education} onChange={(value) => { updateProfile("education", value); setProfileSaved(false); }} options={["Lise", "Önlisans", "Üniversite", "Yüksek Lisans", "Doktora", "Mezun"]} />
                <label className="field"><span>Okul Adı</span><input required value={profile.school} onChange={(event) => { updateProfile("school", event.target.value); setProfileSaved(false); }} placeholder="Okulunun adını yaz" /></label>
                <label className="field"><span>Bölüm</span><input required value={profile.department} onChange={(event) => { updateProfile("department", event.target.value); setProfileSaved(false); }} placeholder="Bölümünü yaz" /></label>
                <label className="field"><span>Sınıf</span><input required value={profile.grade} onChange={(event) => { updateProfile("grade", event.target.value); setProfileSaved(false); }} placeholder="Örn. 3. sınıf" /></label>
                <label className="field"><span>Şehir</span><input required value={profile.city} onChange={(event) => { updateProfile("city", event.target.value); setProfileSaved(false); }} placeholder="Yaşadığın şehir" /></label>
              </div></section>
              <section className="profile-edit-section"><h2>Yetkinlikler</h2><p>Öne çıkan bilgi ve becerilerini ekle. Yetenek testini geçmeden eklenen yetkinlikler doğrulanmamış görünür.</p><div className="skill-entry"><input value={skillInput} onChange={(event) => setSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSkill(); } }} placeholder="Örn. Python, UI/UX, proje yönetimi" /><button type="button" className="add-tag" onClick={addSkill}><Icon name="plus" size={17} /> Ekle</button></div>
                <div className="profile-skill-list">{tags.map((tag) => { const verified = verifiedSkills.some((skill) => skill.toLocaleLowerCase("tr") === tag.toLocaleLowerCase("tr")); const result = Object.entries(skillResults).find(([name]) => name.toLocaleLowerCase("tr") === tag.toLocaleLowerCase("tr"))?.[1]; return <div className={verified ? "verified" : "unverified"} key={tag}><div><strong>{tag}</strong><span>{verified && result ? `✓ ${result.level} · ${result.score}/100` : verified ? "✓ Doğrulandı" : "Doğrulanmadı"}</span></div><div>{!verified && <button type="button" className="verify-skill" onClick={() => openSkillVerification(tag)}>Testle doğrula</button>}<button type="button" className="remove-skill" aria-label={`${tag} yetkinliğini kaldır`} onClick={() => { setTags(tags.filter((item) => item !== tag)); setVerifiedSkills(verifiedSkills.filter((item) => item !== tag)); setSkillResults((current) => { const next = { ...current }; delete next[tag]; return next; }); setProfileSaved(false); }}>×</button></div></div>; })}</div>
                {tags.length === 0 && <small className="skill-hint">Henüz bir yetkinlik eklemedin.</small>}<div className="suggested-skills"><strong>Hazır yetkinlikler</strong><p>Profiline eklemek istediğin alanları seç.</p><div>{skillTestSuggestions.map((skill) => { const selected = tags.includes(skill); return <button type="button" className={selected ? "selected" : ""} disabled={selected} onClick={() => addSuggestedSkill(skill)} key={skill}>{selected ? "✓" : "+"} {skill}</button>; })}</div></div></section>
              <section className="profile-edit-section"><h2>Hobiler</h2><p>Boş zamanlarında ilgilendiğin aktiviteleri paylaş.</p><div className="skill-entry"><input value={hobbyInput} onChange={(event) => setHobbyInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addHobby(); } }} placeholder="Örn. Fotoğrafçılık, satranç, koşu" /><button type="button" className="add-tag" onClick={addHobby}><Icon name="plus" size={17} /> Ekle</button></div><div className="tag-row hobby-tags">{hobbies.map((hobby) => <button type="button" key={hobby} onClick={() => { setHobbies(hobbies.filter((item) => item !== hobby)); setProfileSaved(false); }}>{hobby}<span>×</span></button>)}</div>{hobbies.length === 0 && <small className="skill-hint">Henüz bir hobi eklemedin.</small>}</section>
              <div className="profile-save-row"><button type="button" className="later" onClick={() => setActiveView("team-search")}>Vazgeç</button><button className="continue">{profileSaved ? "Profil kaydedildi ✓" : "Profili kaydet"}<span><Icon name="arrow" size={21} /></span></button></div>
            </form>
          </> : <>
            <div className="page-title messages-title"><button aria-label="Geri" onClick={() => setActiveView("team-search")}><Icon name="back" size={26} /></button><div><h1>Mesajlar</h1><p>Takımlarınla konuş, görüşmelerini planla ve takvimini tek yerden takip et.</p></div></div>
            <section className="messaging-layout">
              <aside className="conversation-panel">
                <div className="conversation-head"><div><h2>Sohbetler</h2><span>{conversations.length} konuşma</span></div><button type="button" aria-label="Yeni mesaj"><Icon name="plus" size={18} /></button></div>
                <label className="conversation-search"><Icon name="search" size={16} /><input placeholder="Sohbetlerde ara" /></label>
                <div className="conversation-list">{conversations.map((conversation) => <button type="button" className={selectedConversation === conversation.id ? "active" : ""} onClick={() => setSelectedConversation(conversation.id)} key={conversation.id}>
                  <span className="conversation-avatar">{conversation.initials}{conversation.online && <i />}</span>
                  <span className="conversation-copy"><strong>{conversation.name}</strong><small>{conversation.preview}</small></span>
                  <span className="conversation-meta"><time>{conversation.time}</time>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
                </button>)}</div>
              </aside>
              <section className="chat-panel">
                {(() => { const activeConversation = conversations.find((item) => item.id === selectedConversation) || conversations[0]; return <>
                  <header className="chat-head"><span className="conversation-avatar">{activeConversation.initials}{activeConversation.online && <i />}</span><div><h2>{activeConversation.name}</h2><span>{activeConversation.online ? "Çevrimiçi" : "Son görülme dün"}</span></div><button type="button" title="Takvimde görüşme oluştur"><Icon name="calendar" size={19} /></button></header>
                  <div className="chat-messages">
                    <div className="chat-date">Bugün</div>
                    <div className="chat-bubble incoming"><p>Merhaba! Başvurunu inceledik, projedeki görüntü işleme rolü için tanışmak isteriz.</p><time>14:18</time></div>
                    <div className="chat-bubble outgoing"><p>Merhaba, çok sevinirim. Projenizin mevcut durumunu konuşabiliriz.</p><time>14:24</time></div>
                    <div className="chat-bubble incoming"><p>Harika! Bugün 16.00 için bir görüşme oluşturdum. Takvimde görebilirsin.</p><time>14:32</time></div>
                    {(sentMessages[selectedConversation] || []).map((message, index) => <div className="chat-bubble outgoing" key={`${message}-${index}`}><p>{message}</p><time>Şimdi ✓</time></div>)}
                  </div>
                  <form className="message-composer" onSubmit={(event) => { event.preventDefault(); const value = messageInput.trim(); if (!value) return; setSentMessages((current) => ({ ...current, [selectedConversation]: [...(current[selectedConversation] || []), value] })); setMessageInput(""); }}><button type="button" aria-label="Dosya ekle"><Icon name="plus" size={20} /></button><input value={messageInput} onChange={(event) => setMessageInput(event.target.value)} placeholder="Bir mesaj yaz..." /><button className="send-message" aria-label="Mesajı gönder" disabled={!messageInput.trim()}><Icon name="arrow" size={19} /></button></form>
                </>; })()}
              </section>
            </section>
          </>}
        </section>

        <aside className="summary-column">
          {activeView === "team-search" ? <section className="summary-card team-match-summary">
            <div className="summary-heading"><div><h2>AI Takım Önerin</h2><p>Profiline göre en güçlü eşleşme</p></div><span>AI</span></div>
            {bestTeamListing && bestRecommendation ? <><div className="best-match-score"><span>%{bestRecommendation.score}</span><small>uyum oranı</small></div><div className="best-match-team"><strong>{bestTeamListing.team}</strong><h3>{bestTeamListing.title}</h3><p>{bestRecommendation.reason}</p></div><div className="best-match-skills">{bestTeamListing.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></> : <div className="empty-ai-match"><Icon name="users" size={34} /><strong>Önerin hazır değil</strong><p>İlanları profilinle karşılaştırmak için “Bana göre öner” butonuna bas.</p><button type="button" onClick={getTeamRecommendations} disabled={recommendationsLoading}>{recommendationsLoading ? "Analiz ediliyor…" : "AI önerisi oluştur"}</button></div>}
            <div className="match-stats"><div><strong>{teamRecommendations.length || allTeamListings.length}</strong><span>{teamRecommendations.length ? "Sana uygun ilan" : "Aktif ilan"}</span></div><div><strong>{appliedListings.length}</strong><span>Başvuru</span></div></div>
          </section> : activeView === "create-listing" ? <section className="summary-card listing-summary">
            <div className="summary-heading"><div><h2>İlan Özeti</h2><p>İlanın anlık görünümü</p></div><span>%{listingProgress}</span></div>
            <dl><div><dt><Icon name="message" /><span>İlan başlığı</span></dt><dd className={listing.title ? "" : "empty"}>{listing.title || "Belirtilmedi"}</dd></div><div><dt><Icon name="users" /><span>Proje adı</span></dt><dd className={listing.projectName ? "" : "empty"}>{listing.projectName || "Belirtilmedi"}</dd></div><div><dt><Icon name="trophy" /><span>Kategori</span></dt><dd>{listing.category}</dd></div><div><dt><Icon name="briefcase" /><span>Proje aşaması</span></dt><dd>{listing.stage}</dd></div><div><dt><Icon name="calendar" /><span>Son başvuru</span></dt><dd className={listing.deadline ? "" : "empty"}>{listing.deadline || "Belirtilmedi"}</dd></div><div><dt><Icon name="clock" /><span>Haftalık zaman</span></dt><dd className={listing.weeklyTime ? "" : "empty"}>{listing.weeklyTime || "Belirtilmedi"}</dd></div><div><dt><Icon name="tag" /><span>Yetkinlikler</span></dt><dd className={listingSkills.length ? "" : "empty"}>{listingSkills.length ? listingSkills.join(", ") : "Belirtilmedi"}</dd></div></dl>
          </section> : activeView === "skills-test" ? <section className="summary-card ai-summary">
            <div className="summary-heading"><div><h2>Yetenek Testi</h2><p>Yapay zekâ destekli değerlendirme</p></div><span>AI</span></div>
            <div className="ai-summary-visual"><Icon name="trophy" size={32} /><strong>{quizSubmitted ? `${quizPoints}/100` : quiz ? `${Object.keys(quizAnswers).length}/10` : "100"}</strong><small>{quizSubmitted ? `${quiz?.level} seviye sonucu` : quiz ? "soru yanıtlandı" : "alınabilecek puan"}</small></div>
            <ul className="ai-benefits"><li><Icon name="message" /> Konuna özel sorular</li><li><Icon name="briefcase" /> Dengeli zorluk seviyesi</li><li><Icon name="trophy" /> Anında puan ve açıklama</li></ul>
            {quizSubmitted && <div className="result-note"><strong>{quizScore >= 8 ? "Harika sonuç!" : quizScore >= 6 ? "İyi gidiyorsun!" : "Gelişime devam!"}</strong><p>{quizScore >= 8 ? "Bu konuda güçlü bir bilgi seviyesine sahipsin." : quizScore >= 6 ? "Temelin sağlam; birkaç konuyu tekrar ederek ilerleyebilirsin." : "Açıklamaları inceleyip yeni bir testle tekrar deneyebilirsin."}</p></div>}
          </section> : activeView === "my-profile" ? <section className="summary-card my-profile-summary">
            <div className="summary-heading"><div><h2>Profil Durumu</h2><p>@futureminds</p></div><span>%{myProfileProgress}</span></div>
            <div className="profile-summary-user"><span className="account-avatar large">FM<span className="online-dot" /></span><div><strong>{profile.name || "futureminds"}</strong><small>Çevrimiçi</small></div></div>
            <dl><div><dt><Icon name="school" /><span>Eğitim</span></dt><dd className={profile.education ? "" : "empty"}>{profile.education || "Belirtilmedi"}</dd></div><div><dt><Icon name="school" /><span>Okul</span></dt><dd className={profile.school ? "" : "empty"}>{profile.school || "Belirtilmedi"}</dd></div><div><dt><Icon name="briefcase" /><span>Bölüm</span></dt><dd className={profile.department ? "" : "empty"}>{profile.department || "Belirtilmedi"}</dd></div><div><dt><Icon name="location" /><span>Şehir</span></dt><dd className={profile.city ? "" : "empty"}>{profile.city || "Belirtilmedi"}</dd></div><div><dt><Icon name="tag" /><span>Yetkinlikler</span></dt><dd>{verifiedSkills.length}/{tags.length} doğrulandı</dd></div><div><dt><Icon name="trophy" /><span>Hobiler</span></dt><dd>{hobbies.length}</dd></div></dl>
          </section> : <section className="summary-card calendar-card">
            <div className="calendar-heading"><div><span>Takvim</span><h2>Ağustos 2026</h2></div><button type="button" aria-label="Yeni etkinlik"><Icon name="plus" size={18} /></button></div>
            <div className="calendar-weekdays">{["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => <span key={day}>{day}</span>)}</div>
            <div className="calendar-grid">{Array.from({ length: 42 }, (_, index) => { const day = index - 4; const inMonth = day >= 1 && day <= 31; const displayDay = day < 1 ? 31 + day : day > 31 ? day - 31 : day; const hasEvent = calendarEvents.some((event) => event.day === day); return <button type="button" className={`${inMonth ? "" : "outside"} ${day === 18 ? "today" : ""} ${hasEvent ? "has-event" : ""}`} key={index}>{displayDay}</button>; })}</div>
            <div className="upcoming-head"><h3>Yaklaşan görüşmeler</h3><span>{calendarEvents.length} etkinlik</span></div>
            <div className="event-list">{calendarEvents.map((event) => <article key={`${event.day}-${event.title}`}><i className={event.color} /><div><time>{event.day} Ağustos · {event.time}</time><strong>{event.title}</strong></div><button type="button" aria-label="Etkinlik seçenekleri">•••</button></article>)}</div>
          </section>}
          {activeView !== "messages" && <button className="message-dock" aria-label="Mesajları aç" onClick={() => setActiveView("messages")}><span className="chat-launch-icon"><Icon name="message" size={23} /></span><span className="message-copy"><strong>Mesajlar</strong><small>Sohbet ve takvimini görüntüle</small></span><span className="message-arrow"><Icon name="arrow" size={19} /></span></button>}
        </aside>
      </div>
    </section>
  </main>;
}
