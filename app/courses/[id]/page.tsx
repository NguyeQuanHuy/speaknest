"use client"
import { useParams, useRouter } from "next/navigation"
import { COURSES } from "@/lib/data"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const LESSONS = [
  {
    id: 1,
    title: "Chào hỏi cơ bản",
    desc: "Hello, Hi, Good morning...",
    duration: "10 phút",
    free: true,
    icon: "👋",
  },
  {
    id: 2,
    title: "Giới thiệu bản thân",
    desc: "My name is, I'm from...",
    duration: "12 phút",
    free: true,
    icon: "🙋",
  },
  {
    id: 3,
    title: "Hỏi thăm sức khỏe",
    desc: "How are you? I'm fine...",
    duration: "8 phút",
    free: true,
    icon: "❤️",
  },
  {
    id: 4,
    title: "Mua sắm tiếng Anh",
    desc: "How much, I'd like to buy...",
    duration: "15 phút",
    free: false,
    icon: "🛍️",
  },
  {
    id: 5,
    title: "Đặt đồ ăn",
    desc: "I'd like to order, Can I have...",
    duration: "12 phút",
    free: false,
    icon: "🍜",
  },
  {
    id: 6,
    title: "Hỏi đường",
    desc: "Where is, Turn left, Go straight...",
    duration: "10 phút",
    free: false,
    icon: "🗺️",
  },
  {
    id: 7,
    title: "Tại sân bay",
    desc: "Check in, Boarding pass, Gate...",
    duration: "14 phút",
    free: false,
    icon: "✈️",
  },
  {
    id: 8,
    title: "Đặt phòng khách sạn",
    desc: "Reservation, Check out, Room...",
    duration: "13 phút",
    free: false,
    icon: "🏨",
  },
]

export default function CourseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const course = COURSES.find((c) => c.id === id)
  const [done, setDone] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem(`done_${id}`)
    return saved ? JSON.parse(saved) : []
  })

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="font-head text-xl font-bold mb-2">Không tìm thấy khóa học</h2>
          <Link href="/courses" className="text-[#2563EB] font-bold no-underline">
            ← Quay lại
          </Link>
        </div>
      </div>
    )

  const handleLesson = (lessonId: number, isFree: boolean) => {
    if (!isFree) {
      router.push("/pricing")
      return
    }
    router.push(`/courses/${id}/${lessonId}`)
  }

  const pct = Math.round((done.length / LESSONS.length) * 100)

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg,#F8FAFF 0%,#F0F4FF 100%)" }}
    >
      {/* Banner – font đậm hơn, title to hơn */}
      <div
        className="py-16 px-8 text-center relative overflow-hidden"
        style={{ background: course.banner_gradient }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-4 right-8 w-20 h-20 rounded-full opacity-20"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-4 left-8 w-12 h-12 rounded-full opacity-15"
          style={{ background: "white" }}
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl mb-5"
        >
          {course.thumbnail_emoji}
        </motion.div>

        {/* Font to hơn, đậm hơn */}
        <h1
          className="font-head font-extrabold mb-3"
          style={{
            fontSize: "clamp(24px,4vw,36px)",
            color: "#1E293B",
            textShadow: "0 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          {course.title}
        </h1>
        <p className="max-w-lg mx-auto mb-5 text-sm font-medium" style={{ color: "#334155" }}>
          {course.description}
        </p>

        {/* Tags to hơn, rõ hơn */}
        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {course.tags.map((t) => (
            <span
              key={t}
              className="font-bold px-4 py-1.5 rounded-full text-sm border-2"
              style={{ background: "white", color: "#2563EB", borderColor: "#BFDBFE" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Course meta */}
        <div
          className="flex items-center justify-center gap-6 text-sm font-semibold"
          style={{ color: "#475569" }}
        >
          <span>📚 {course.total_lessons} bài học</span>
          <span>⏱️ ~{course.total_lessons * 11} phút</span>
          <span>{course.is_free ? "🆓 Miễn phí" : "⭐ Pro"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-head text-xl font-extrabold">Danh sách bài học</h2>
          <Link
            href="/courses"
            className="text-sm font-semibold no-underline hover:underline"
            style={{ color: "#94A3B8" }}
          >
            ← Quay lại
          </Link>
        </div>

        {/* Progress – nổi bật hơn */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-6 border"
          style={{
            background: "white",
            borderColor: "#E2E8F0",
            boxShadow: "0 4px 24px rgba(74,144,226,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-sm mb-0.5" style={{ color: "#1E293B" }}>
                Tiến độ của bạn
              </div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>
                {done.length}/{LESSONS.length} bài hoàn thành
              </div>
            </div>
            <div
              className="font-head text-3xl font-extrabold"
              style={{ color: pct === 100 ? "#22C55E" : "#4A90E2" }}
            >
              {pct}%
            </div>
          </div>
          {/* Thicker progress bar với gradient */}
          <div className="h-4 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                background:
                  pct === 100
                    ? "linear-gradient(90deg,#22C55E,#16A34A)"
                    : pct > 50
                      ? "linear-gradient(90deg,#4A90E2,#7B61FF)"
                      : "linear-gradient(90deg,#F59E0B,#4A90E2)",
              }}
            />
          </div>
        </motion.div>

        {/* Lessons với icon cho từng bài */}
        <div className="flex flex-col gap-3">
          {LESSONS.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              className="rounded-2xl p-5 border flex items-center gap-4 transition-all cursor-pointer"
              style={{
                background: done.includes(lesson.id) ? "#F0FFF4" : "white",
                borderColor: done.includes(lesson.id) ? "#BBF7D0" : "#E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Icon + number */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{
                  background: done.includes(lesson.id)
                    ? "linear-gradient(135deg,#22C55E,#16A34A)"
                    : lesson.free
                      ? "linear-gradient(135deg,#EBF4FF,#DBEAFE)"
                      : "#FEF3C7",
                }}
              >
                {done.includes(lesson.id) ? "✓" : lesson.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm mb-0.5" style={{ color: "#1E293B" }}>
                  {i + 1}. {lesson.title}
                </div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>
                  {lesson.desc} · ⏱️ {lesson.duration}
                </div>
              </div>

              {/* Pro badge – rõ hơn, chỉ 1 cái */}
              {!lesson.free && !done.includes(lesson.id) && (
                <div
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#FEF3C7,#FDE68A)",
                    color: "#92400E",
                    border: "1px solid #FDE68A",
                  }}
                >
                  ⭐ Pro
                </div>
              )}

              {/* Button */}
              <button
                onClick={() => handleLesson(lesson.id, lesson.free)}
                className="text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer border-none transition-all flex-shrink-0 hover:-translate-y-0.5"
                style={{
                  background: done.includes(lesson.id)
                    ? "#DCFCE7"
                    : lesson.free
                      ? "linear-gradient(135deg,#4A90E2,#2563EB)"
                      : "linear-gradient(135deg,#F59E0B,#D97706)",
                  color: done.includes(lesson.id) ? "#166534" : "white",
                  boxShadow: done.includes(lesson.id) ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {done.includes(lesson.id) ? "✅ Xong" : lesson.free ? "Học ngay" : "🔒 Mở khóa"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {done.length < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-3xl p-6 text-center border"
            style={{
              background: "linear-gradient(135deg,#EBF4FF,#F5F0FF)",
              borderColor: "#BFDBFE",
            }}
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-head text-lg font-extrabold mb-1" style={{ color: "#1E293B" }}>
              Bắt đầu bài học đầu tiên!
            </div>
            <p className="text-sm mb-4" style={{ color: "#475569" }}>
              Chỉ 10 phút mỗi ngày – tiến bộ rõ rệt sau 30 ngày học
            </p>
            <button
              onClick={() => handleLesson(1, true)}
              className="text-white font-bold px-8 py-3 rounded-2xl cursor-pointer border-none hover:-translate-y-0.5 transition-all"
              style={{
                background: "linear-gradient(135deg,#4A90E2,#7B61FF)",
                boxShadow: "0 4px 14px rgba(74,144,226,0.4)",
              }}
            >
              Bắt đầu ngay → Bài 1: Chào hỏi 👋
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
