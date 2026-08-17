"use client";

import { useState } from "react";

const navItems = [
  ["⌂", "Ana Sayfa"], ["♢", "Bildirimler", "40"], ["☵", "Mesajlar"],
  ["◉", "Keşfet"], ["♙", "Nod Oyna"], ["☆", "Topluluklar"],
  ["▱", "Kaydedilenler"], ["♧", "Beğeniler"], ["⌁", "Ayarlar"],
  ["♙", "NTakım", "active"], ["⌘", "TEKNOFEST Kayıt"]
];

const steps = ["Temel Bilgiler", "Yetkinlikler", "Tercihler", "Önizleme"];

function SelectField({ label, value, options }: { label: string; value: string; options?: string[] }) {
  return <label className="field"><span>{label}</span><select defaultValue={value} aria-label={label}>
    {(options || [value]).map((item) => <option key={item}>{item}</option>)}
  </select></label>;
}

export default function Page() {
  const [choice, setChoice] = useState<"team" | "mate">("team");
  const [dark, setDark] = useState(true);
  const [tags, setTags] = useState(["Python", "NLP", "BERT"]);
  const [saved, setSaved] = useState(false);

  return <main className={dark ? "app" : "app light"}>
    <aside className="sidebar">
      <div className="brand"><img src="/logo.png" alt="N Takım" /></div>
      <nav>{navItems.map(([icon, label, state]) => <button key={label} className={state === "active" ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">{icon}</span><span>{label}</span>{state === "40" && <b className="badge">40</b>}
      </button>)}</nav>
      <button className="new-post">♧ <span>Yeni Gönderi</span></button>
      <div className="side-setting"><span>▷</span><b>Medya</b><i className="toggle off" /></div>
      <button className="side-setting" onClick={() => setDark(!dark)}><span>☾</span><b>Karanlık mod</b><i className={dark ? "toggle on" : "toggle"} /></button>
    </aside>

    <section className="workspace">
      <header className="topbar">
        <nav className="tabs"><button className="selected">Profil Oluştur</button><button>Takım İlanı Oluştur</button><button>Öneriler</button><button>Aranan Roller</button><button>Yetenek Testleri</button></nav>
        <div className="top-actions"><label className="search">⌕ <input placeholder="Arama yap" /></label><div className="avatar">●</div><span>⌄</span></div>
      </header>

      <div className="content-grid">
        <section className="profile-shell">
          <div className="page-title"><button aria-label="Geri">←</button><div><h1>N-Takım Profili Oluştur</h1><p>Sana en uygun proje ve takım arkadaşlarını önerebilmemiz için profilini tamamla.</p></div></div>
          <div className="stepper">{steps.map((step, i) => <div className={i === 0 ? "step current" : "step"} key={step}><div className="step-line"><span>{i + 1}</span>{i < 3 && <i />}</div><b>{step}</b></div>)}</div>

          <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
            <h2>Temel Bilgiler</h2>
            <div className="form-top">
              <div className="photo-column"><button type="button" className="photo">▣</button><button type="button" className="add-photo">↥ Fotoğraf ekle</button></div>
              <div className="form-grid">
                <label className="field"><span>Ad Soyad</span><input defaultValue="Şuranur DERİN" /></label>
                <SelectField label="Eğitim durumu" value="Üniversite" options={["Üniversite", "Lise", "Mezun"]} />
                <label className="field"><span>Şehir</span><input defaultValue="Sakarya" /></label>
                <SelectField label="Katılmak istediğin yarışma" value="Tarım Teknolojileri" options={["Tarım Teknolojileri", "Yapay Zeka", "Çevre ve Enerji"]} />
                <SelectField label="Takımdaki rolün" value="Doğal Dil İşleme Geliştiricisi" options={["Doğal Dil İşleme Geliştiricisi", "Veri Bilimci", "Tasarımcı"]} />
                <SelectField label="Haftalık müsaitlik" value="8–10 saat" options={["8–10 saat", "4–6 saat", "10+ saat"]} />
              </div>
            </div>

            <div className="skills"><label>Temel yetkinliklerin</label><div className="tag-row">{tags.map((tag) => <button type="button" key={tag} onClick={() => setTags(tags.filter((x) => x !== tag))}>{tag}<span>×</span></button>)}<button type="button" className="add-tag" onClick={() => !tags.includes("PyTorch") && setTags([...tags, "PyTorch"])}>＋ Yetkinlik ekle</button></div></div>

            <fieldset><legend>Ne arıyorsun?</legend><div className="choice-grid">
              <button type="button" className={choice === "team" ? "choice active" : "choice"} onClick={() => setChoice("team")}><span className="people">♙</span><span><b>Takım arıyorum</b><small>Katılabileceğim bir proje<br/>bulmak istiyorum</small></span><i>{choice === "team" ? "✓" : ""}</i></button>
              <button type="button" className={choice === "mate" ? "choice active" : "choice"} onClick={() => setChoice("mate")}><span className="people">♧</span><span><b>Takım arkadaşı arıyorum</b><small>Mevcut ekibimdeki eksik rolü<br/>tamamlamak istiyorum</small></span><i>{choice === "mate" ? "✓" : ""}</i></button>
            </div></fieldset>

            <div className="form-actions"><button type="button" className="later">Daha sonra tamamla</button><button className="continue">{saved ? "Kaydedildi ✓" : "Devam Et →"}<span>→</span></button></div>
          </form>
        </section>

        <aside className="summary-column">
          <section className="summary-card"><h2>Profil Özeti</h2><div className="progress-wrap"><div className="ring"><span>%25</span></div><div><b><strong>%25</strong> tamamlandı</b><i><em /></i></div></div>
            <dl><div><dt>✧ <span>Hedef yarışma</span></dt><dd>Tarım Teknolojileri</dd></div><div><dt>♙ <span>Rol</span></dt><dd>NLP Geliştiricisi</dd></div><div><dt>▣ <span>Çalışma</span></dt><dd>Uzaktan</dd></div><div><dt>◷ <span>Müsaitlik</span></dt><dd>8–10 saat</dd></div></dl>
          </section>
          <section className="next-card"><h2>Sonraki adımlar</h2><ul><li className="done"><i>✓</i>Temel bilgilerini ekle</li><li><i />Yetkinliklerini doğrula</li><li><i />Çalışma tercihlerini belirt</li></ul></section>
          <section className="privacy"><span>✓</span><p>Telefon ve e-posta bilgilerinin eşleşme gerçekleşene kadar gizli tutulur.<a href="#">Gizlilik ayarlarını gör</a></p></section>
          <button className="message-dock">☵ <span>Mesajlar</span><b>⌃</b><i>♧</i></button>
        </aside>
      </div>
    </section>
  </main>;
}
