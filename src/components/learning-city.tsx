"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getGame, getLesson, grades, subjects, type GradeId, type SubjectId } from "@/data/catalog";
import { STORAGE_KEY, challengeProgress, completeActivity, createProgress, parseProgress, starCount } from "@/lib/progress";
import Icon from "./icon";
import { Artwork } from "./artwork";
import QuestionCard from "./question-card";

const navigation = [
  { label: "Trang chủ", target: "home", icon: "home" },
  { label: "Môn học", target: "subjects", icon: "book" },
  { label: "Theo lớp", target: "grades", icon: "flag" },
  { label: "Trò chơi", target: "games", icon: "game" },
  { label: "Thử thách", target: "challenge", icon: "trophy" },
  { label: "Góc của bé", target: "my-corner", icon: "star" },
] as const;

function focusSection(target: string) {
  document.getElementById(target)?.focus({ preventScroll: true });
}

function scrollToLesson() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("lesson")?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
  focusSection("lesson");
}

export default function LearningCity() {
  const [progress, setProgress] = useState(createProgress);
  const [ready, setReady] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [variant, setVariant] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try { setProgress(parseProgress(localStorage.getItem(STORAGE_KEY))); }
      catch { setStorageUnavailable(true); }
      setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { queueMicrotask(() => setStorageUnavailable(true)); }
  }, [progress, ready]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    }
    function handleOutside(event: MouseEvent) {
      if (!menuContainer.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleOutside);
    return () => { document.removeEventListener("keydown", handleKey); document.removeEventListener("mousedown", handleOutside); };
  }, [menuOpen]);

  const currentGrade = grades.find((grade) => grade.id === progress.grade)!;
  const currentSubject = subjects.find((subject) => subject.id === progress.subject)!;
  const lesson = getLesson(progress.subject, progress.grade, variant);
  const game = getGame(progress.grade);
  const challenge = challengeProgress(progress);
  const stars = starCount(progress);
  const completedForGrade = progress.completed.filter((id) => id.startsWith(`${progress.grade}:`)).length;

  function chooseGrade(grade: GradeId) {
    setProgress((previous) => ({ ...previous, grade }));
    setVariant(0);
    setAnnouncement(`Đã chọn ${grades.find((item) => item.id === grade)?.name}. Bài học bên dưới đã cập nhật.`);
  }

  function chooseSubject(subject: SubjectId) {
    setProgress((previous) => ({ ...previous, subject }));
    setVariant(0);
    setAnnouncement(`Đã chọn môn ${subjects.find((item) => item.id === subject)?.name}.`);
    scrollToLesson();
  }

  function onComplete(id: string) {
    setProgress((previous) => completeActivity(previous, id));
  }

  function visitChallenge(subject: SubjectId, lessonVariant = 0) {
    setProgress((previous) => ({ ...previous, subject }));
    setVariant(lessonVariant);
    scrollToLesson();
  }

  return <>
    <a className="skip-link" href="#main-content">Bỏ qua menu, đến nội dung chính</a>
    <header className="site-header">
      <div className="header-inner" ref={menuContainer}>
        <a href="#home" className="brand" aria-label="Thành Phố Học Tập — Trang chủ"><span className="brand-mark"><Icon name="home" size={29}/></span><span>Thành Phố<span className="brand-second">Học Tập<span className="brand-dot">.</span></span></span></a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">{navigation.map((item) => <a href={`#${item.target}`} key={item.target} onClick={() => focusSection(item.target)}>{item.label}</a>)}</nav>
        <div className="header-tools"><a href="#my-corner" className="star-wallet" aria-label={`${stars} sao minh họa, xem góc của bé`}><Icon name="star" size={18}/><span>{stars}</span></a><button type="button" className="icon-button sound-toggle" aria-label={progress.sound ? "Tắt giọng đọc" : "Bật giọng đọc"} aria-pressed={progress.sound} disabled={!ready} onClick={() => {
          if (progress.sound && "speechSynthesis" in window) window.speechSynthesis.cancel();
          setProgress((previous) => ({ ...previous, sound: !previous.sound }));
        }}><Icon name={progress.sound ? "sound" : "mute"}/></button><button ref={menuButton} type="button" className="icon-button menu-toggle" aria-label={menuOpen ? "Đóng menu" : "Mở menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"}/></button></div>
        {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Menu trên điện thoại">{navigation.map((item) => <a href={`#${item.target}`} key={item.target} onClick={() => { setMenuOpen(false); focusSection(item.target); }}>{item.label}<Icon name="arrow" size={18}/></a>)}<a href="#parents" onClick={() => setMenuOpen(false)}>Dành cho phụ huynh<Icon name="shield" size={18}/></a></nav>}
      </div>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="home" tabIndex={-1} aria-labelledby="hero-title">
        <div className="hero-copy wrap"><span className="welcome-pill"><span className="live-dot"/>MỘT THÀNH PHỐ NHỎ. NGÀN ĐIỀU TO LỚN.</span><h1 id="hero-title">Chào mừng bé đến với<br/><span>Thành Phố Học Tập</span></h1><p>Học vui – Chơi hay – Tiến bộ mỗi ngày!</p><a className="button hero-cta" href="#grades" onClick={() => focusSection("grades")}>Bắt đầu học ngay<Icon name="arrow"/></a><span className="hero-note">Dành cho bé từ mẫu giáo đến lớp 5</span></div>
        <div className="wrap city-wrap"><div className="city-heading"><div><span className="eyebrow">BẢN ĐỒ KHÁM PHÁ</span><h2 id="subjects" tabIndex={-1}>Hôm nay bé muốn học gì?</h2></div><span className="city-hint">Chọn một tòa nhà để bắt đầu<Icon name="arrow" size={18}/></span></div>
          <div className="city-world"><div className="city-weather" aria-hidden="true"><span>Ngày đẹp trời để khám phá!</span></div><div className="subjects-grid" role="group" aria-label="Chọn môn học">{subjects.map((subject, index) => <button key={subject.id} type="button" disabled={!ready} className={`subject-building building-${index} ${progress.subject === subject.id ? "subject-selected" : ""}`} style={{ "--subject": subject.color, "--tint": subject.tint } as CSSProperties} aria-pressed={progress.subject === subject.id} onClick={() => chooseSubject(subject.id)}><Artwork name={subject.id}/><span className="building-label"><span className="subject-icon"><Icon name={subject.id} size={19}/></span><span>{subject.name}</span>{progress.subject === subject.id ? <Icon name="check" size={17}/> : <Icon name="arrow" size={17}/>}</span><span className="building-place">{subject.place}</span></button>)}</div>
            <div className="city-friends" aria-label="Bốn người bạn đồng hành"><div className="friend-wave">Đi cùng chúng mình nhé!</div>{[{id:"minh",name:"Bé Minh"},{id:"an",name:"Bé An"},{id:"go",name:"Rô-bốt Go"},{id:"sao",name:"Cún Sao"}].map((friend) => <div key={friend.id} className="city-friend"><Artwork name={friend.id}/><span>{friend.name}</span></div>)}</div>
            <span className="city-sign" aria-hidden="true"><Icon name="shield" size={17}/>Học theo nhịp của bé</span>
          </div>
        </div>
      </section>

      <div className="wrap content-wrap">
        <section className="grade-section section-space" aria-labelledby="grades"><div className="section-heading"><div><span className="eyebrow">HÀNH TRÌNH VỪA VẶN VỚI BÉ</span><h2 id="grades" tabIndex={-1}>Bé đang học lớp mấy?</h2></div><p>Mỗi độ tuổi, một thế giới thú vị.</p></div><div className="grade-grid" role="group" aria-label="Chọn lớp học">{grades.map((grade) => <button key={grade.id} type="button" disabled={!ready} className={`grade-card ${progress.grade === grade.id ? "grade-selected" : ""}`} style={{ "--grade": grade.color } as CSSProperties} aria-pressed={progress.grade === grade.id} onClick={() => chooseGrade(grade.id)}><Artwork name={grade.shape}/><strong>{grade.name}</strong><span>{grade.age}</span><span className="grade-check" aria-hidden="true"><Icon name="check" size={14}/></span></button>)}</div><div className="grade-description"><Icon name="flag" size={19}/><p><strong>{currentGrade.name}:</strong> {currentGrade.description}</p><a href="#lesson" onClick={() => focusSection("lesson")}>Xem bài học<Icon name="arrow" size={16}/></a></div></section>

        <section className="lesson-section section-space" aria-labelledby="lesson"><div className="section-heading"><div><span className="eyebrow">MỘT CHÚT TÒ MÒ, THÊM NHIỀU KIẾN THỨC</span><h2 id="lesson" tabIndex={-1}>Ghé thăm {currentSubject.place.toLowerCase()}</h2></div><span className="demo-tag">Bài học mẫu · {currentGrade.name}</span></div><QuestionCard key={lesson.id} lesson={lesson} completed={progress.completed.includes(lesson.id)} sound={progress.sound} onComplete={onComplete} onNext={() => {
          if (progress.subject === "math") setVariant((previous) => previous === 0 ? 1 : 0);
          else { setProgress((previous) => ({ ...previous, subject: "math" })); setVariant(0); }
        }} nextLabel={progress.subject === "math" ? "Đổi bài Toán" : "Khám phá Toán học"}/></section>

        <section className="section-space" aria-labelledby="little-steps"><div className="section-heading"><div><span className="eyebrow">MỖI BƯỚC NHỎ ĐỀU ĐÁNG TỰ HÀO</span><h2 id="little-steps">Hôm nay, mình cùng tiến bộ!</h2></div><span className="demo-tag">Dữ liệu minh họa</span></div><div className="support-grid">
          <article className="support-card challenge-card"><div className="card-heading"><span className="card-icon yellow"><Icon name="trophy" size={25}/></span><span className="bonus-pill">+30 sao</span></div><h3 id="challenge" tabIndex={-1}>Thử thách hôm nay</h3><p>4 bước nhỏ cho {currentGrade.name.toLowerCase()}.</p><div className="challenge-list"><button type="button" disabled={!ready} onClick={() => visitChallenge("math", progress.completed.includes(`${progress.grade}:math:0`) ? 1 : 0)}><span className={`task-check ${challenge.math === 2 ? "task-done" : ""}`}><Icon name={challenge.math === 2 ? "check" : "math"} size={16}/></span><span>2 bài Toán học</span><strong>{challenge.math}/2</strong></button><button type="button" disabled={!ready} onClick={() => visitChallenge("vietnamese")}><span className={`task-check ${challenge.vietnamese ? "task-done" : ""}`}><Icon name={challenge.vietnamese ? "check" : "book"} size={16}/></span><span>1 bài Tiếng Việt</span><strong>{challenge.vietnamese}/1</strong></button><a href="#games" onClick={() => focusSection("games")}><span className={`task-check ${challenge.game ? "task-done" : ""}`}><Icon name={challenge.game ? "check" : "game"} size={16}/></span><span>1 trò chơi học tập</span><strong>{challenge.game}/1</strong></a></div><div className="progress-track" role="progressbar" aria-label="Tiến độ thử thách" aria-valuenow={challenge.total} aria-valuemin={0} aria-valuemax={4}><span style={{ width: `${challenge.total * 25}%` }}/></div><p className="small-note">{challenge.complete ? "Hoàn thành rồi! Bé đã nhận 30 sao thưởng." : "Hoàn thành cả 4 bước để tự động nhận 30 sao."}</p><span className="tiny-note">Thử thách demo theo lớp, không tự đặt lại mỗi ngày.</span></article>

          <article className="support-card journey-card"><div className="card-heading"><span className="card-icon green"><Icon name="flag" size={25}/></span><span className="small-note">{completedForGrade}/8 hoạt động</span></div><h3 id="journey" tabIndex={-1}>Hành trình học tập</h3><p>Mỗi bài học mở một điều mới.</p><div className="journey-map" aria-label={`${completedForGrade} trên 8 hoạt động mẫu đã hoàn thành`}><svg viewBox="0 0 300 135" aria-hidden="true"><path d="M28 103c75 24 28-102 107-66s80 72 137-4" stroke="#d3e4bd" strokeWidth="14" fill="none"/><path d="M28 103c75 24 28-102 107-66s80 72 137-4" stroke="#fff" strokeWidth="3" strokeDasharray="6 7" fill="none"/></svg>{[0, 1, 2, 3].map((step) => <span key={step} className={`map-stop stop-${step} ${completedForGrade >= (step + 1) * 2 ? "stop-completed" : ""}`}>{completedForGrade >= (step + 1) * 2 ? <Icon name="check" size={18}/> : step + 1}</span>)}<Artwork name="tree" className="map-tree"/></div><a href="#lesson" className="text-button" onClick={() => focusSection("lesson")}>Tiếp tục khám phá<Icon name="arrow" size={18}/></a><p className="tiny-note">Bản đồ minh họa · {currentGrade.name}</p></article>

          <article className="support-card corner-card"><div className="card-heading"><span className="card-icon purple"><Icon name="star" size={25}/></span><span className="demo-tag">Dữ liệu minh họa</span></div><h3 id="my-corner" tabIndex={-1}>Góc của bé</h3><div className="kid-profile"><Artwork name="minh"/><div><strong>Nhà thám hiểm nhỏ</strong><p>Cấp độ minh họa {Math.floor(stars / 50) + 1}</p><span className="profile-stars"><Icon name="star" size={20}/>{stars} sao</span></div></div><p>Mình đã hoàn thành <strong>{progress.completed.length}</strong> hoạt động. Từng cố gắng đều thật tuyệt!</p><a href="#badges" className="text-button" onClick={() => focusSection("badges")}>Bộ sưu tập của bé<Icon name="arrow" size={18}/></a><span className="tiny-note">Chỉ lưu trên thiết bị này · Không có tài khoản</span></article>
        </div></section>

        <section className="utility-grid section-space" aria-label="Thêm điều thú vị">{[
          { icon: "game", title: "Trò chơi học tập", text: "Chơi một chút, học một điều", target: "games", color: "blue" },
          { icon: "trophy", title: "Huy hiệu & phần thưởng", text: "Ghi lại những cố gắng nhỏ", target: "badges", color: "yellow" },
          { icon: "flag", title: "Theo dõi tiến độ", text: "Nhìn lại hành trình của mình", target: "journey", color: "green" },
          { icon: "shield", title: "Dành cho phụ huynh", text: "Cùng con lớn lên mỗi ngày", target: "parents", color: "purple" },
        ].map((item) => <a href={`#${item.target}`} key={item.target} className="utility-card" onClick={() => focusSection(item.target)}><span className={`card-icon ${item.color}`}><Icon name={item.icon as "game" | "trophy" | "flag" | "shield"} size={27}/></span><h3>{item.title}</h3><p>{item.text}</p><Icon name="arrow" size={18}/></a>)}</section>

        <section className="games-section section-space" aria-labelledby="games"><div className="section-heading"><div><span className="eyebrow">HỌC BẰNG NIỀM VUI</span><h2 id="games" tabIndex={-1}>Săn sao cùng Cún Sao</h2></div><span className="demo-tag">Mini game · {currentGrade.name}</span></div><div className="game-layout"><div className="game-intro"><Artwork name="sao"/><h3>Một câu đố, một khám phá!</h3><p>Không đếm giờ, không so điểm. Bé cứ thử, Cún Sao sẽ luôn cổ vũ.</p><span className="demo-tag">Có thể chơi lại bất cứ lúc nào</span></div><QuestionCard key={game.id} lesson={game} sound={progress.sound} completed={progress.completed.includes(game.id)} onComplete={onComplete}/></div></section>

        <section className="badges-section section-space" aria-labelledby="badges"><div><span className="eyebrow">NHỮNG CỘT MỐC ĐÁNG NHỚ</span><h2 id="badges" tabIndex={-1}>Bộ sưu tập của bé</h2><p className="small-note">Dữ liệu minh họa · Huy hiệu đến từ hoạt động bé đã hoàn thành.</p></div><div className="badge-grid">{[
          { title: "Bước đầu khám phá", threshold: 1, icon: "sprout" },
          { title: "Bạn của tri thức", threshold: 4, icon: "rocket" },
          { title: "Ngôi sao chăm học", threshold: 8, icon: "trophy" },
        ].map((badge) => <div className={`badge-item ${progress.completed.length >= badge.threshold ? "badge-earned" : ""}`} key={badge.title}><Artwork name={badge.icon}/><strong>{badge.title}</strong><span>{progress.completed.length >= badge.threshold ? "Đã đạt được" : `Hoàn thành ${badge.threshold} hoạt động`}</span></div>)}</div></section>

        <section className="parent-section section-space" aria-labelledby="parents"><div className="parent-intro"><span className="card-icon blue"><Icon name="shield" size={29}/></span><div><span className="eyebrow">AN TÂM ĐỒNG HÀNH CÙNG CON</span><h2 id="parents" tabIndex={-1}>Một góc nhỏ dành cho phụ huynh</h2><p>Cho con thời gian để tò mò, thử sức và nghỉ ngơi. Hãy cùng con học từng chút một, theo nhịp riêng của con.</p></div></div><div className="parent-details"><details><summary>Đây có phải chương trình học đầy đủ?</summary><p>Đây là phiên bản demo với bài học ngắn, minh họa cho 6 môn và 6 cấp lớp. Nội dung chưa thay thế chương trình học chính thức. Chưa có video, CMS, đăng nhập hay hệ thống quản lý học tập.</p></details><details><summary>Thông tin của bé được lưu ở đâu?</summary><p>Chỉ lựa chọn lớp, môn, giọng đọc và mã hoạt động đã hoàn thành được lưu trên thiết bị này. Không có tên, tuổi, email hay dữ liệu cá nhân được thu thập. Chưa đồng bộ giữa thiết bị hoặc các thẻ trình duyệt.</p></details><details><summary>Đồng hành và nghỉ ngơi như thế nào?</summary><p>Phụ huynh có thể đọc câu hỏi cùng bé, bật giọng đọc khi cần và chủ động nghỉ giữa các hoạt động. Demo không đếm ngược, không bảng xếp hạng, không quảng cáo và không trò chuyện công khai. Giọng đọc phụ thuộc trình duyệt và giọng tiếng Việt trên thiết bị.</p></details><div className="reset-area"><button type="button" className="text-button" onClick={() => setResetOpen(!resetOpen)} disabled={!ready} aria-expanded={resetOpen}>Đặt lại dữ liệu minh họa</button>{resetOpen && <div className="reset-confirm"><p>Xóa lựa chọn, sao và tiến độ demo trên thiết bị này?</p><div><button type="button" className="button button-small" onClick={() => { setProgress(createProgress()); setVariant(0); setResetOpen(false); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setAnnouncement("Đã đặt lại dữ liệu minh họa. Bé có thể bắt đầu hành trình mới."); }}>Đồng ý đặt lại</button><button type="button" className="text-button" onClick={() => setResetOpen(false)}>Giữ lại</button></div></div>}</div></div></section>

        {storageUnavailable && <p role="status" className="storage-notice">Trình duyệt đang chặn lưu dữ liệu. Bé vẫn học và chơi được; lựa chọn, sao và tiến độ sẽ mất khi tải lại trang.</p>}
      </div>
    </main>
    <footer className="site-footer"><div className="wrap footer-inner"><div><a className="footer-brand" href="#home">Thành Phố Học Tập<span>.</span></a><p>Mỗi ngày, thêm một điều hay.</p></div><nav aria-label="Điều hướng cuối trang"><a href="#subjects">Môn học</a><a href="#grades">Theo lớp</a><a href="#parents">Phụ huynh</a></nav><div className="footer-demo"><span>Phiên bản demo · Dữ liệu minh họa</span><p>Học vui cùng Minh, An, Go & Cún Sao.</p></div></div></footer>
    <nav className="bottom-nav" aria-label="Điều hướng nhanh trên điện thoại">{navigation.filter((item) => item.target !== "grades").map((item) => <a href={`#${item.target}`} key={item.target} onClick={() => focusSection(item.target)}><Icon name={item.icon}/><span>{item.target === "my-corner" ? "Của bé" : item.label}</span></a>)}</nav>
    <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
  </>;
}
