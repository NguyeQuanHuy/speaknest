"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const QUESTIONS = [
  { level: "beginner", q: "Chọn câu đúng:", options: ["I am a student.", "I is a student.", "I are a student.", "I be a student."], answer: 0 },
  { level: "beginner", q: "\"Xin chào\" trong tiếng Anh là gì?", options: ["Goodbye", "Thank you", "Hello", "Sorry"], answer: 2 },
  { level: "elementary", q: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
  { level: "elementary", q: "Chọn từ đúng: \"I have lived here ___ 5 years.\"", options: ["since", "for", "ago", "before"], answer: 1 },
  { level: "intermediate", q: "If I ___ you, I would study harder.", options: ["am", "was", "were", "be"], answer: 2 },
  { level: "intermediate", q: "The meeting ___ by the time we arrived.", options: ["already finished", "has already finished", "had already finished", "already finish"], answer: 2 },
  { level: "upper-intermediate", q: "He speaks English ___ a native speaker.", options: ["as good as", "as well as", "better than", "more good than"], answer: 1 },
  { level: "upper-intermediate", q: "Chọn câu bị động đúng: \"Someone broke the window.\"", options: ["The window was broken.", "The window is broken.", "The window had broken.", "The window broke."], answer: 0 },
  { level: "advanced", q: "\"Notwithstanding\" có nghĩa gần nhất với từ nào?", options: ["Therefore", "However", "Despite", "Although"], answer: 2 },
  { level: "advanced", q: "Chọn câu đúng nhất: \"Tôi ước tôi đã không nói điều đó.\"", options: ["I wish I didn't say that.", "I wish I hadn't said that.", "I hope I haven't said that.", "I wish I wouldn't say that."], answer: 1 },
]

const LEVEL_RESULT = [
  { min: 0, max: 2, level: "Beginner (A1)", desc: "Bạn đang ở giai đoạn khởi đầu. Hãy bắt đầu với khóa học Tiếng Anh từ A-Z!", course: "absolute-beginner", emoji: "🌱", color: "#22C55E" },
  { min: 3, max: 4, level: "Elementary (A2)", desc: "Bạn đã biết những cơ bản! Khóa Giao tiếp hàng ngày sẽ giúp bạn tiến xa hơn.", course: "daily-conversation", emoji: "📗", color: "#4A90E2" },
  { min: 5, max: 6, level: "Intermediate (B1)", desc: "Trình độ tốt! Bạn sẵn sàng chinh phục TOEIC hoặc bắt đầu luyện IELTS.", course: "toeic-900", emoji: "📘", color: "#8B5CF6" },
  { min: 7, max: 8, level: "Upper-Intermediate (B2)", desc: "Rất ấn tượng! IELTS 6.5-7.0 trong tầm tay của bạn.", course: "ielts-mastery", emoji: "🏆", color: "#F59E0B" },
  { min: 9, max: 10, level: "Advanced (C1+)", desc: "Xuất sắc! Bạn có thể thử Business English hoặc luyện IELTS 7.5+.", course: "business-english", emoji: "🌟", color: "#FF7043" },
]

export default function TestPage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const score = answers.filter(Boolean).length
  const result = LEVEL_RESULT.find(r => score >= r.min && score <= r.max) ?? LEVEL_RESULT[0]

  const handleNext = () => {
    if (selected === null) return
    const correct = selected === QUESTIONS[idx].answer
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    setSelected(null)
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1)
    } else {
      setFinished(true)
    }
  }

  if (!started) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg,#EBF4FF,#FFF3F0)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200 shadow-xl">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="font-head text-2xl font-extrabold mb-3" style={{ color: "#1E293B" }}>
          Kiểm tra trình độ miễn phí
        </h1>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "#475569" }}>
          Chỉ <strong>10 câu hỏi</strong> – hoàn thành trong <strong>5 phút</strong>.<br />
          Nhận ngay lộ trình học cá nhân phù hợp nhất với bạn!
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: "⏱️", label: "5 phút" },
            { icon: "📝", label: "10 câu hỏi" },
            { icon: "🎁", label: "Miễn phí" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#EBF4FF" }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-xs font-bold" style={{ color: "#2563EB" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setStarted(true)}
          className="w-full py-4 rounded-2xl text-white font-extrabold text-base cursor-pointer border-none"
          style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)", boxShadow: "0 4px 18px rgba(74,144,226,0.4)" }}>
          Bắt đầu kiểm tra 🚀
        </button>
      </motion.div>
    </div>
  )

  if (finished) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg,#EBF4FF,#FFF3F0)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200 shadow-xl">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <h2 className="font-head text-2xl font-extrabold mb-2" style={{ color: "#1E293B" }}>
          Kết quả của bạn
        </h2>
        <div className="inline-block px-5 py-2 rounded-full font-extrabold text-white mb-3"
          style={{ background: result.color }}>
          {result.level}
        </div>
        <div className="font-head text-4xl font-extrabold mb-3" style={{ color: result.color }}>
          {score}/10
        </div>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "#475569" }}>{result.desc}</p>
        <div className="h-3 rounded-full mb-8 overflow-hidden" style={{ background: "#E2E8F0" }}>
          <motion.div className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score * 10}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ background: result.color }} />
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push(`/courses/${result.course}`)}
            className="flex-1 py-3.5 rounded-2xl text-white font-extrabold text-sm cursor-pointer border-none"
            style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)" }}>
            Xem khóa học phù hợp →
          </button>
          <button
            onClick={() => { setStarted(false); setIdx(0); setAnswers([]); setSelected(null); setFinished(false) }}
            className="px-5 py-3.5 rounded-2xl font-bold text-sm cursor-pointer border"
            style={{ background: "white", color: "#475569", borderColor: "#E2E8F0" }}>
            Làm lại
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg,#EBF4FF,#FFF3F0)" }}>
      <div className="rounded-3xl p-8 max-w-lg w-full border shadow-xl"
        style={{ background: "#1E293B", borderColor: "#334155" }}>

        {/* Progress header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold" style={{ color: "#60A5FA" }}>
            Câu {idx + 1}/10
          </span>
          <span className="text-xs px-2 py-1 rounded-full"
            style={{ background: "#0F172A", color: "#94A3B8" }}>
            {QUESTIONS[idx].level}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: "#0F172A" }}>
          <motion.div className="h-full rounded-full"
            animate={{ width: `${(idx / QUESTIONS.length) * 100}%` }}
            style={{ background: "linear-gradient(90deg,#4A90E2,#2563EB)" }} />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-head text-lg font-extrabold mb-5" style={{ color: "#F1F5F9" }}>
              {QUESTIONS[idx].q}
            </h2>
            <div className="flex flex-col gap-3 mb-6">
              {QUESTIONS[idx].options.map((opt, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold text-left cursor-pointer border-2 transition-all"
                  style={{
                    borderColor: selected === i ? "#4A90E2" : "#334155",
                    background: selected === i ? "#1D4ED8" : "#0F172A",
                    color: "#F1F5F9"
                  }}>
                  <span className="font-bold mr-2" style={{ color: selected === i ? "#93C5FD" : "#60A5FA" }}>
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <button onClick={handleNext} disabled={selected === null}
          className="w-full py-4 rounded-2xl font-extrabold text-base border-none transition-all"
          style={{
            background: selected !== null ? "linear-gradient(135deg,#4A90E2,#2563EB)" : "#1E3A5F",
            color: selected !== null ? "white" : "#475569",
            cursor: selected !== null ? "pointer" : "not-allowed"
          }}>
          {idx + 1 < QUESTIONS.length ? "Câu tiếp theo →" : "Xem kết quả 🎉"}
        </button>
      </div>
    </div>
  )
}