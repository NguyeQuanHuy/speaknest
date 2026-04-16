"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { addXP } from "@/lib/streak"
import Link from "next/link"

const LESSON_CONTENT: Record<string, {
  title: string
  dialogue: { speaker: string; text: string; trans: string }[]
  vocab: { word: string; meaning: string; example: string }[]
  quiz: { q: string; options: string[]; answer: number }[]
}> = {
  "1": {
    title: "Chào hỏi cơ bản",
    dialogue: [
      { speaker: "A", text: "Hello! How are you?", trans: "Xin chào! Bạn có khỏe không?" },
      { speaker: "B", text: "I'm fine, thank you! And you?", trans: "Tôi khỏe, cảm ơn! Còn bạn?" },
      { speaker: "A", text: "I'm great! Nice to meet you.", trans: "Tôi rất tốt! Rất vui được gặp bạn." },
      { speaker: "B", text: "Nice to meet you too!", trans: "Tôi cũng rất vui được gặp bạn!" },
    ],
    vocab: [
      { word: "Hello", meaning: "Xin chào", example: "Hello! My name is Huy." },
      { word: "How are you?", meaning: "Bạn có khỏe không?", example: "Hello John, how are you?" },
      { word: "Fine", meaning: "Khỏe, tốt", example: "I'm fine, thank you." },
      { word: "Nice to meet you", meaning: "Rất vui được gặp bạn", example: "Nice to meet you, Lisa!" },
    ],
    quiz: [
      { q: "\"Xin chào\" trong tiếng Anh là gì?", options: ["Goodbye", "Hello", "Thank you", "Sorry"], answer: 1 },
      { q: "\"I'm fine\" có nghĩa là gì?", options: ["Tôi đói", "Tôi mệt", "Tôi khỏe", "Tôi buồn"], answer: 2 },
      { q: "Câu nào dùng để hỏi thăm sức khỏe?", options: ["What's your name?", "How old are you?", "How are you?", "Where are you from?"], answer: 2 },
    ]
  },
  "2": {
    title: "Giới thiệu bản thân",
    dialogue: [
      { speaker: "A", text: "Hi! My name is Huy. What's your name?", trans: "Xin chào! Tên tôi là Huy. Bạn tên gì?" },
      { speaker: "B", text: "My name is Anna. I'm from Germany.", trans: "Tên tôi là Anna. Tôi đến từ Đức." },
      { speaker: "A", text: "Nice! I'm from Vietnam. I'm a student.", trans: "Tuyệt! Tôi đến từ Việt Nam. Tôi là sinh viên." },
      { speaker: "B", text: "Me too! I'm studying English.", trans: "Tôi cũng vậy! Tôi đang học tiếng Anh." },
    ],
    vocab: [
      { word: "My name is...", meaning: "Tên tôi là...", example: "My name is Nguyen Van Huy." },
      { word: "I'm from...", meaning: "Tôi đến từ...", example: "I'm from Vietnam." },
      { word: "I'm a student", meaning: "Tôi là sinh viên", example: "I'm a student at university." },
      { word: "Nice to meet you", meaning: "Rất vui được gặp", example: "Nice to meet you, Anna!" },
    ],
    quiz: [
      { q: "\"My name is\" dùng để làm gì?", options: ["Hỏi tên", "Giới thiệu tên", "Chào hỏi", "Tạm biệt"], answer: 1 },
      { q: "\"I'm from Vietnam\" nghĩa là gì?", options: ["Tôi học ở VN", "Tôi thích VN", "Tôi đến từ VN", "Tôi sống ở VN"], answer: 2 },
      { q: "Điền vào chỗ trống: \"___ name is Anna\"", options: ["Your", "His", "My", "Her"], answer: 2 },
    ]
  },
  "3": {
    title: "Hỏi thăm sức khỏe",
    dialogue: [
      { speaker: "A", text: "Good morning! How are you today?", trans: "Chào buổi sáng! Hôm nay bạn thế nào?" },
      { speaker: "B", text: "Not so good. I have a headache.", trans: "Không được tốt lắm. Tôi bị đau đầu." },
      { speaker: "A", text: "Oh no! I hope you feel better soon.", trans: "Ôi không! Tôi hy vọng bạn sớm khỏe lại." },
      { speaker: "B", text: "Thank you! That's very kind of you.", trans: "Cảm ơn! Bạn thật tốt bụng." },
    ],
    vocab: [
      { word: "Good morning", meaning: "Chào buổi sáng", example: "Good morning, everyone!" },
      { word: "Headache", meaning: "Đau đầu", example: "I have a headache today." },
      { word: "Feel better", meaning: "Cảm thấy tốt hơn", example: "I hope you feel better soon." },
      { word: "Kind", meaning: "Tốt bụng, thân thiện", example: "That's very kind of you." },
    ],
    quiz: [
      { q: "\"Good morning\" dùng vào lúc nào?", options: ["Buổi tối", "Buổi trưa", "Buổi sáng", "Buổi chiều"], answer: 2 },
      { q: "\"I have a headache\" nghĩa là gì?", options: ["Tôi đói bụng", "Tôi đau đầu", "Tôi mệt mỏi", "Tôi buồn ngủ"], answer: 1 },
      { q: "\"Feel better\" có nghĩa là gì?", options: ["Cảm thấy tệ hơn", "Cảm thấy tốt hơn", "Cảm thấy bình thường", "Không thay đổi"], answer: 1 },
    ]
  }
}

export default function LessonPage() {
  const { id, lessonId } = useParams()
  const router = useRouter()
  const lesson = LESSON_CONTENT[lessonId as string]
  const [step, setStep] = useState<"dialogue" | "vocab" | "quiz" | "done">("dialogue")
  const [selected, setSelected] = useState<number | null>(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [score, setScore] = useState(0)

  if (!lesson) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="font-head text-xl font-bold mb-2">Bài học đang được cập nhật</h2>
        <Link href={`/courses/${id}`} className="text-[#2563EB] font-bold no-underline">← Quay lại</Link>
      </div>
    </div>
  )

  const handleQuiz = async () => {
    if (selected === null) return
    const correct = selected === lesson.quiz[quizIdx].answer
    if (correct) setScore(s => s + 1)
    setSelected(null)

    if (quizIdx + 1 < lesson.quiz.length) {
      setQuizIdx(q => q + 1)
    } else {
      await addXP(10 + score * 5, 0, 1)
      setStep("done")
    }
  }

  return (
    <div className="min-h-screen" style={{background:"linear-gradient(160deg,#EBF4FF,#F8FAFF)"}}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link href={`/courses/${id}`} className="text-sm text-gray-400 hover:text-[#2563EB] no-underline font-semibold">
          ← Quay lại
        </Link>
        <div className="font-head font-bold text-base">{lesson.title}</div>
        <div className="flex gap-2">
          {["dialogue","vocab","quiz"].map((s,i) => (
            <div key={s} className={`w-8 h-1.5 rounded-full ${step === s || (step === "done") || (i < ["dialogue","vocab","quiz"].indexOf(step)) ? "bg-[#4A90E2]" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-8">

        {/* STEP 1: Dialogue */}
        {step === "dialogue" && (
          <div>
            <h2 className="font-head text-xl font-extrabold mb-2">💬 Hội thoại mẫu</h2>
            <p className="text-sm text-gray-400 mb-6">Đọc và hiểu hội thoại bên dưới</p>
            <div className="flex flex-col gap-4 mb-8">
              {lesson.dialogue.map((d, i) => (
                <div key={i} className={`flex gap-3 ${d.speaker === "A" ? "" : "flex-row-reverse"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 ${d.speaker === "A" ? "bg-[#4A90E2]" : "bg-[#FF7043]"}`}>
                    {d.speaker}
                  </div>
                  <div className={`bg-white rounded-2xl px-4 py-3 border border-gray-200 max-w-xs ${d.speaker === "B" ? "text-right" : ""}`}>
                    <div className="font-semibold text-sm mb-1">{d.text}</div>
                    <div className="text-xs text-gray-400 italic">{d.trans}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep("vocab")}
              className="w-full py-4 rounded-2xl text-white font-bold cursor-pointer border-none text-base"
              style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
              Tiếp theo: Từ vựng →
            </button>
          </div>
        )}

        {/* STEP 2: Vocabulary */}
        {step === "vocab" && (
          <div>
            <h2 className="font-head text-xl font-extrabold mb-2">📖 Từ vựng trong bài</h2>
            <p className="text-sm text-gray-400 mb-6">Học các từ quan trọng</p>
            <div className="flex flex-col gap-3 mb-8">
              {lesson.vocab.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-head text-lg font-extrabold text-[#2563EB]">{v.word}</span>
                    <span className="text-sm text-gray-500">→ {v.meaning}</span>
                  </div>
                  <div className="text-xs text-gray-400 italic">💬 {v.example}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep("quiz")}
              className="w-full py-4 rounded-2xl text-white font-bold cursor-pointer border-none text-base"
              style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
              Tiếp theo: Quiz →
            </button>
          </div>
        )}

        {/* STEP 3: Quiz */}
        {step === "quiz" && (
          <div>
            <h2 className="font-head text-xl font-extrabold mb-2">🎯 Kiểm tra hiểu bài</h2>
            <p className="text-sm text-gray-400 mb-6">Câu {quizIdx + 1}/{lesson.quiz.length}</p>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-4">
              <div className="font-bold text-base mb-5">{lesson.quiz[quizIdx].q}</div>
              <div className="flex flex-col gap-3">
                {lesson.quiz[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => setSelected(i)}
                    className={`px-5 py-3.5 rounded-xl text-sm font-semibold text-left cursor-pointer border-2 transition-all
                      ${selected === i ? "border-[#4A90E2] bg-[#EBF4FF] text-[#2563EB]" : "border-gray-200 bg-white hover:border-[#B8D9F8]"}`}>
                    {String.fromCharCode(65+i)}. {opt}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleQuiz} disabled={selected === null}
              className={`w-full py-4 rounded-2xl text-white font-bold text-base border-none transition-all
                ${selected !== null ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
              style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
              {quizIdx + 1 < lesson.quiz.length ? "Câu tiếp theo →" : "Hoàn thành! 🎉"}
            </button>
          </div>
        )}

        {/* STEP 4: Done */}
        {step === "done" && (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-head text-2xl font-extrabold mb-2">Hoàn thành bài học!</h2>
            <p className="text-gray-600 mb-2">Điểm của bạn: {score}/{lesson.quiz.length}</p>
            <div className="inline-block bg-[#EBF4FF] text-[#2563EB] font-extrabold text-lg px-6 py-2 rounded-full mb-8">
              +{10 + score * 5} XP 🔥
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push(`/courses/${id}`)}
                className="px-6 py-3 rounded-xl font-bold text-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                ← Về khóa học
              </button>
              <button onClick={() => { setStep("dialogue"); setQuizIdx(0); setScore(0); setSelected(null) }}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer border-none"
                style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
                Học lại 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}