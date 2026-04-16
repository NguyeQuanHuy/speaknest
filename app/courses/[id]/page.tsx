"use client"
import { useParams, useRouter } from "next/navigation"
import { COURSES } from "@/lib/data"
import Link from "next/link"
import { useState } from "react"

const LESSONS = [
  { id:1, title:"Chào hỏi cơ bản", desc:"Hello, Hi, Good morning...", duration:"10 phút", free:true },
  { id:2, title:"Giới thiệu bản thân", desc:"My name is, I'm from...", duration:"12 phút", free:true },
  { id:3, title:"Hỏi thăm sức khỏe", desc:"How are you? I'm fine...", duration:"8 phút", free:true },
  { id:4, title:"Mua sắm tiếng Anh", desc:"How much, I'd like to buy...", duration:"15 phút", free:false },
  { id:5, title:"Đặt đồ ăn", desc:"I'd like to order, Can I have...", duration:"12 phút", free:false },
  { id:6, title:"Hỏi đường", desc:"Where is, Turn left, Go straight...", duration:"10 phút", free:false },
  { id:7, title:"Tại sân bay", desc:"Check in, Boarding pass, Gate...", duration:"14 phút", free:false },
  { id:8, title:"Đặt phòng khách sạn", desc:"Reservation, Check out, Room...", duration:"13 phút", free:false },
]

export default function CourseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const course = COURSES.find(c => c.id === id)
  const [done, setDone] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem(`done_${id}`)
    return saved ? JSON.parse(saved) : []
  })

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-head text-xl font-bold mb-2">Không tìm thấy khóa học</h2>
        <Link href="/courses" className="text-[#2563EB] font-bold no-underline">← Quay lại</Link>
      </div>
    </div>
  )

  const handleLesson = (lessonId: number, isFree: boolean) => {
    if (!isFree) { router.push("/pricing"); return }
    router.push(`/courses/${id}/${lessonId}`)
  }

  const pct = Math.round(done.length / LESSONS.length * 100)

  return (
    <>
      {/* Banner */}
      <div className="py-16 px-8 text-center" style={{ background: course.banner_gradient }}>
        <div className="text-6xl mb-4">{course.thumbnail_emoji}</div>
        <h1 className="font-head text-3xl font-extrabold mb-2" style={{ color: "#1E293B" }}>
          {course.title}
        </h1>
        <p className="max-w-lg mx-auto mb-4 text-sm" style={{ color: "#334155" }}>
          {course.description}
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          {course.tags.map(t => (
            <span key={t} className="bg-white text-xs font-bold px-3 py-1 rounded-full" style={{ color: "#2563EB" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-head text-xl font-extrabold">Danh sách bài học</h2>
          <Link href="/courses" className="text-sm text-gray-400 hover:text-[#2563EB] no-underline">← Quay lại</Link>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-6 flex items-center justify-between border" style={{ background: "#EBF4FF", borderColor: "#B8D9F8" }}>
          <div>
            <div className="font-bold text-sm mb-1" style={{ color: "#1E293B" }}>Tiến độ của bạn</div>
            <div className="text-xs mb-2" style={{ color: "#475569" }}>{done.length}/{LESSONS.length} bài hoàn thành</div>
            <div className="w-48 h-2 rounded-full overflow-hidden" style={{ background: "#DBEAFE" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg,#4A90E2,#2563EB)" }} />
            </div>
          </div>
          <div className="font-head text-3xl font-extrabold" style={{ color: "#2563EB" }}>{pct}%</div>
        </div>

        {/* Lessons */}
        <div className="flex flex-col gap-3">
          {LESSONS.map((lesson, i) => (
            <div key={lesson.id}
              className="rounded-2xl p-5 border flex items-center gap-4 transition-all hover:shadow-md"
              style={{
                background: done.includes(lesson.id) ? "#F0FFF4" : "white",
                borderColor: done.includes(lesson.id) ? "#BBF7D0" : "#E2E8F0"
              }}>
              {/* Number */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: done.includes(lesson.id) ? "#22C55E" : "#EBF4FF",
                  color: done.includes(lesson.id) ? "white" : "#2563EB"
                }}>
                {done.includes(lesson.id) ? "✓" : i + 1}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5" style={{ color: "#1E293B" }}>{lesson.title}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{lesson.desc} · {lesson.duration}</div>
              </div>

              {/* Pro badge */}
              {!lesson.free && (
                <span className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: "#FEF3C7", color: "#92400E" }}>Pro</span>
              )}

              {/* Button */}
              <button onClick={() => handleLesson(lesson.id, lesson.free)}
                className="text-xs font-bold px-4 py-2 rounded-xl cursor-pointer border-none transition-all"
                style={{
                  background: done.includes(lesson.id)
                    ? "#DCFCE7" : lesson.free
                    ? "#4A90E2" : "#FCD34D",
                  color: done.includes(lesson.id)
                    ? "#166534" : lesson.free
                    ? "white" : "#78350F"
                }}>
                {done.includes(lesson.id) ? "✅ Xong" : lesson.free ? "Học ngay" : "🔒 Pro"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}