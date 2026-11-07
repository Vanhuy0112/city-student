export type SubjectId = "math" | "vietnamese" | "english" | "science" | "geography" | "art";
export type GradeId = "preschool" | "1" | "2" | "3" | "4" | "5";
export type IconName = SubjectId | "home" | "game" | "star" | "flag" | "arrow" | "menu" | "close" | "check" | "sound" | "mute" | "shield" | "book" | "trophy";

export const subjects: { id: SubjectId; name: string; place: string; color: string; tint: string; description: string }[] = [
  { id: "math", name: "Toán học", place: "Lâu đài con số", color: "#ed7953", tint: "#fff0e8", description: "Những con số biết kể chuyện" },
  { id: "vietnamese", name: "Tiếng Việt", place: "Thư viện lời hay", color: "#e77e99", tint: "#fff0f4", description: "Mở trang sách, mở thế giới" },
  { id: "english", name: "Tiếng Anh", place: "Khu vườn tiếng Anh", color: "#4DA8FF", tint: "#eaf5ff", description: "Hello! Chào những người bạn mới" },
  { id: "science", name: "Khoa học", place: "Trạm khám phá", color: "#7ED957", tint: "#f0fae9", description: "Mỗi câu hỏi, một điều kỳ diệu" },
  { id: "geography", name: "Lịch sử & Địa lý", place: "Bảo tàng tí hon", color: "#FFD54F", tint: "#fff8df", description: "Cùng đi khắp đất nước mình" },
  { id: "art", name: "Nghệ thuật", place: "Xưởng sắc màu", color: "#A78BFA", tint: "#f3edff", description: "Đánh thức trí tưởng tượng" },
];

export const grades: { id: GradeId; name: string; age: string; description: string; shape: string; color: string }[] = [
  { id: "preschool", name: "Mẫu giáo", age: "3–5 tuổi", description: "Làm quen màu sắc, chữ cái và đếm số qua hình ảnh. Bé có thể bật giọng đọc hướng dẫn.", shape: "sprout", color: "#7ED957" },
  { id: "1", name: "Lớp 1", age: "6–7 tuổi", description: "Tập đọc tiếng Việt, nhận biết từ quen thuộc và cộng trừ trong phạm vi 10.", shape: "balloon", color: "#FFD54F" },
  { id: "2", name: "Lớp 2", age: "7–8 tuổi", description: "Đọc hiểu câu ngắn, học từ mới và luyện cộng trừ trong phạm vi 100.", shape: "kite", color: "#FF8FA3" },
  { id: "3", name: "Lớp 3", age: "8–9 tuổi", description: "Luyện phép nhân, mở rộng vốn từ và tìm hiểu thế giới tự nhiên.", shape: "rocket", color: "#4DA8FF" },
  { id: "4", name: "Lớp 4", age: "9–10 tuổi", description: "Khám phá phân số, cách dùng từ, tiếng Anh và những điều thú vị về Việt Nam.", shape: "planet", color: "#A78BFA" },
  { id: "5", name: "Lớp 5", age: "10–11 tuổi", description: "Luyện số thập phân, đọc hiểu, kiến thức khoa học và khám phá lịch sử, địa lý.", shape: "trophy", color: "#ffb477" },
];

export interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  count?: number;
}

export interface Lesson {
  id: string;
  title: string;
  introduction: string;
  subject: SubjectId;
  grade: GradeId;
  question: Question;
}

const mathQuestions: Record<GradeId, [Question, Question]> = {
  preschool: [
    { prompt: "Bé đếm được mấy ngôi sao?", options: ["2", "3", "4"], answer: 1, count: 3, explanation: "Cùng đếm nhé: một, hai, ba. Có 3 ngôi sao!" },
    { prompt: "Bé đếm được mấy ngôi sao?", options: ["3", "4", "5"], answer: 2, count: 5, explanation: "Một, hai, ba, bốn, năm. Có 5 ngôi sao!" },
  ],
  "1": [
    { prompt: "3 + 2 bằng bao nhiêu?", options: ["4", "5", "6"], answer: 1, explanation: "Có 3 ngôi sao, thêm 2 ngôi sao nữa là 5 ngôi sao." },
    { prompt: "7 − 3 bằng bao nhiêu?", options: ["3", "5", "4"], answer: 2, explanation: "Bắt đầu từ 7, bớt đi 3, còn lại 4." },
  ],
  "2": [
    { prompt: "24 + 15 bằng bao nhiêu?", options: ["39", "38", "49"], answer: 0, explanation: "20 + 10 = 30; 4 + 5 = 9. Vậy 24 + 15 = 39." },
    { prompt: "50 − 20 bằng bao nhiêu?", options: ["20", "30", "40"], answer: 1, explanation: "5 chục bớt 2 chục còn 3 chục, tức là 30." },
  ],
  "3": [
    { prompt: "6 × 4 bằng bao nhiêu?", options: ["20", "24", "28"], answer: 1, explanation: "6 + 6 + 6 + 6 = 24." },
    { prompt: "35 : 5 bằng bao nhiêu?", options: ["5", "6", "7"], answer: 2, explanation: "Vì 5 × 7 = 35 nên 35 : 5 = 7." },
  ],
  "4": [
    { prompt: "Một nửa viết dưới dạng phân số là gì?", options: ["1/3", "1/2", "2/3"], answer: 1, explanation: "Chia đều thành 2 phần, lấy 1 phần, ta được 1/2." },
    { prompt: "1/4 + 2/4 bằng bao nhiêu?", options: ["3/8", "2/4", "3/4"], answer: 2, explanation: "Cộng hai phân số cùng mẫu: cộng tử số, giữ nguyên mẫu số." },
  ],
  "5": [
    { prompt: "1,5 + 2,3 bằng bao nhiêu?", options: ["3,8", "3,5", "4,8"], answer: 0, explanation: "Cộng phần nguyên và phần thập phân theo đúng hàng: 1,5 + 2,3 = 3,8." },
    { prompt: "2,5 × 2 bằng bao nhiêu?", options: ["4,5", "5", "5,5"], answer: 1, explanation: "2,5 + 2,5 = 5, nên 2,5 × 2 = 5." },
  ],
};

const discoveries: Record<Exclude<SubjectId, "math">, [string, Question, Question, Question]> = {
  vietnamese: ["Thế giới lời hay",
    { prompt: "Chữ nào là chữ A?", options: ["O", "A", "E"], answer: 1, explanation: "Đây là chữ A. Bé có thể đọc cùng người lớn: a!" },
    { prompt: "Từ nào chỉ một con vật?", options: ["Cái bàn", "Con mèo", "Quyển vở"], answer: 1, explanation: "Con mèo là một con vật. Cái bàn và quyển vở là đồ vật." },
    { prompt: "Từ nào gần nghĩa với “chăm chỉ”?", options: ["Siêng năng", "Lười biếng", "Vội vàng"], answer: 0, explanation: "Chăm chỉ và siêng năng đều nói về việc cố gắng, chịu khó làm việc hoặc học tập." }],
  english: ["Hello, bạn mới!",
    { prompt: "“Hello” có nghĩa là gì?", options: ["Xin chào", "Tạm biệt", "Cảm ơn"], answer: 0, explanation: "Hello có nghĩa là xin chào. Hello, bé yêu!" },
    { prompt: "Từ nào có nghĩa là “con mèo”?", options: ["Dog", "Cat", "Bird"], answer: 1, explanation: "Cat là con mèo. Dog là con chó, bird là con chim." },
    { prompt: "Điền từ: She ___ a book every day.", options: ["read", "reading", "reads"], answer: 2, explanation: "Ở thì hiện tại đơn, với chủ ngữ she, động từ read thêm s: reads." }],
  science: ["Nhà khoa học tí hon",
    { prompt: "Cây cần gì để lớn lên?", options: ["Nước", "Kẹo", "Đồ chơi"], answer: 0, explanation: "Cây cần nước, ánh sáng và chất dinh dưỡng để lớn lên." },
    { prompt: "Bộ phận nào giúp chúng ta nhìn?", options: ["Tai", "Mắt", "Mũi"], answer: 1, explanation: "Mắt giúp chúng ta nhìn thấy màu sắc, hình dạng và thế giới xung quanh." },
    { prompt: "Nước lỏng biến thành hơi nước gọi là gì?", options: ["Đông đặc", "Ngưng tụ", "Bay hơi"], answer: 2, explanation: "Bay hơi là quá trình nước chuyển từ thể lỏng sang thể hơi." }],
  geography: ["Việt Nam trong tim bé",
    { prompt: "Lá cờ Việt Nam có ngôi sao màu gì?", options: ["Xanh", "Vàng", "Tím"], answer: 1, explanation: "Quốc kỳ Việt Nam có ngôi sao vàng năm cánh trên nền đỏ." },
    { prompt: "Thủ đô của Việt Nam là thành phố nào?", options: ["Hà Nội", "Đà Nẵng", "Huế"], answer: 0, explanation: "Hà Nội là thủ đô của nước Việt Nam." },
    { prompt: "Vịnh Hạ Long thuộc tỉnh nào?", options: ["Lào Cai", "Quảng Ninh", "Nghệ An"], answer: 1, explanation: "Vịnh Hạ Long nằm ở tỉnh Quảng Ninh, nổi tiếng với các đảo đá vôi." }],
  art: ["Chạm vào sắc màu",
    { prompt: "Mặt trời trong bức tranh thường có màu nào?", options: ["Vàng", "Tím", "Xanh lá"], answer: 0, explanation: "Bé có thể tô mặt trời màu vàng. Khi sáng tạo, bé cũng có thể thử các màu mình yêu thích!" },
    { prompt: "Trộn màu vàng và xanh dương thường được màu gì?", options: ["Đỏ", "Xanh lá", "Tím"], answer: 1, explanation: "Với màu vẽ thông thường, vàng và xanh dương pha với nhau tạo ra màu xanh lá." },
    { prompt: "Nhóm màu nào thường tạo cảm giác ấm áp?", options: ["Xanh dương, xanh lá", "Đỏ, cam, vàng", "Trắng, xám, đen"], answer: 1, explanation: "Đỏ, cam, vàng là những màu nóng, thường gợi cảm giác ấm áp và rực rỡ." }],
};

export function getLesson(subject: SubjectId, grade: GradeId, variant = 0): Lesson {
  const group = grade === "preschool" ? 0 : Number(grade) <= 2 ? 1 : 2;
  const lessonVariant = subject === "math" ? Math.abs(variant) % 2 : 0;
  const question = subject === "math" ? mathQuestions[grade][lessonVariant] : discoveries[subject][group + 1] as Question;
  return {
    id: `${grade}:${subject}:${lessonVariant}`,
    title: subject === "math" ? (grade === "preschool" ? "Đếm sao cùng Cún Sao" : "Phiêu lưu cùng con số") : discoveries[subject][0],
    introduction: subject === "math" ? (grade === "preschool" ? "Chạm vào từng ngôi sao và cùng đếm từ 1 đến 5 nhé!" : "Cùng Rô-bốt Go đọc câu hỏi, suy nghĩ và chọn một đáp án nhé.") : `Cùng khám phá ${subjects.find((subjectItem) => subjectItem.id === subject)?.name.toLowerCase()} qua một câu hỏi nhỏ. Mỗi lần thử là một lần học thêm!`,
    subject, grade, question,
  };
}

export function getGame(grade: GradeId): Lesson {
  const lesson = getLesson("math", grade);
  return { ...lesson, id: `${grade}:game:0`, title: "Săn sao tri thức", introduction: "Một câu đố nhỏ, một ngôi sao vui. Bé cứ thong thả suy nghĩ nhé!" };
}

export function activityIds(): string[] {
  return grades.flatMap((grade) => [...subjects.map((subject) => getLesson(subject.id, grade.id).id), getLesson("math", grade.id, 1).id, getGame(grade.id).id]);
}
