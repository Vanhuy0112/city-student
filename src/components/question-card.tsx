"use client";

import { useState } from "react";
import type { Lesson } from "@/data/catalog";
import Icon from "./icon";
import { Artwork } from "./artwork";

export default function QuestionCard({ lesson, completed, sound, onComplete, onNext, nextLabel }: {
  lesson: Lesson;
  completed: boolean;
  sound: boolean;
  onComplete: (id: string) => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const correct = choice === lesson.question.answer;
  const [voiceMessage, setVoiceMessage] = useState("");

  function readQuestion() {
    if (!("speechSynthesis" in window)) {
      setVoiceMessage("Thiết bị này chưa hỗ trợ giọng đọc. Bé có thể nhờ người lớn đọc cùng nhé.");
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(`${lesson.question.prompt} ${lesson.question.count ? `Có ${lesson.question.count} ngôi sao.` : ""} Các đáp án: ${lesson.question.options.join(", ")}`);
    speech.lang = "vi-VN";
    speech.rate = 0.85;
    speech.onerror = () => setVoiceMessage("Chưa đọc được câu hỏi. Bé hãy thử lại hoặc nhờ người lớn đọc cùng nhé.");
    window.speechSynthesis.speak(speech);
  }

  return <div className="question-card">
    <div className="question-top"><span className="eyebrow">CÙNG THỬ SỨC NÀO</span><span className="reward-pill"><Icon name="star" size={16}/>{completed ? "Đã nhận 5 sao" : "+5 sao"}</span></div>
    <h3>{lesson.title}</h3>
    <p>{lesson.introduction}</p>
    <div className="question-content">
      <div className="question-guide"><Artwork name={lesson.subject === "math" ? "go" : "an"}/></div>
      <div className="question-main">
        <h4>{lesson.question.prompt}</h4>
        {lesson.question.count && <div className="counting-stars" role="img" aria-label={`${lesson.question.count} ngôi sao`}>{Array.from({ length: lesson.question.count }, (_, index) => <Icon key={index} name="star" size={38}/>)}</div>}
        {sound && <button type="button" className="text-button read-button" onClick={readQuestion}><Icon name="sound" size={18}/>Nghe câu hỏi</button>}
        <fieldset disabled={correct}>
          <legend className="sr-only">Chọn một đáp án</legend>
          <div className="answer-options">{lesson.question.options.map((option, index) => <button key={option} type="button" aria-pressed={choice === index} className={`answer ${choice === index ? (correct ? "is-correct" : "is-incorrect") : ""}`} onClick={() => {
            setChoice(index);
            if (index === lesson.question.answer) onComplete(lesson.id);
          }}><span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}{choice === index && correct && <Icon name="check" size={18}/>}</button>)}</div>
        </fieldset>
      </div>
    </div>
    <div aria-live="polite" aria-atomic="true" className={`answer-feedback ${choice === null ? "" : correct ? "feedback-correct" : "feedback-retry"}`}>
      {choice === null ? "Bé cứ từ từ suy nghĩ. Mình luôn có thể thử lại!" : correct ? `Đúng rồi, bé làm tốt lắm! ${lesson.question.explanation}` : "Gần đúng rồi! Bé thử đếm hoặc suy nghĩ lại nhé. Rô-bốt Go tin bé làm được!"}
    </div>
    {voiceMessage && <p role="status" className="small-note">{voiceMessage}</p>}
    <div className="question-actions"><button type="button" className="text-button" onClick={() => { setChoice(null); setVoiceMessage(""); }}>Làm lại câu hỏi</button>{onNext && <button type="button" className="button button-small" onClick={onNext}>{nextLabel ?? "Bài tiếp theo"}<Icon name="arrow" size={17}/></button>}</div>
    {completed && <p className="small-note">Bài này đã nhận sao. Bé vẫn có thể luyện lại, sao không cộng thêm.</p>}
  </div>;
}
