"use client"
import { useParams, useRouter } from "next/navigation"
import { COURSES } from "@/lib/data"
import Link from "next/link"
import { addXP } from "@/lib/streak"
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

  const handleLesson = async (lessonId: number, isFree: boolean) => {
    if (!isFree) { router.push("/pricing"); return }
    await addXP(10, 0, 1)
    setDone(d => {
    const next = [...d, lessonId]
    localStorage.setItem(`done_${id}`, JSON.stringify(next))
    return next
  })
    alert("🎉 +10 XP! Bài học hoàn thành!")
  }

  return (
    <>
      {/* Header */}
      <div className="py-12 px-8 text-center" style={{ background: course.banner_gradient }}>
        <div className="text-6xl mb-4">{course.thumbnail_emoji}</div>
        <h1 className="font-head text-3xl font-extrabold mb-2">{course.title}</h1>
        <p className="text-gray-600 max-w-lg mx-auto mb-4">{course.description}</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {course.tags.map(t => (
            <span key={t} className="bg-white text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-head text-xl font-extrabold">Danh sách bài học</h2>
          <Link href="/courses" className="text-sm text-gray-400 hover:text-[#2563EB] no-underline">← Quay lại</Link>
        </div>

        {/* Progress */}
        <div className="bg-[#EBF4FF] rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="font-bold text-sm mb-1">Tiến độ của bạn</div>
            <div className="text-xs text-gray-500">{done.length}/{LESSONS.length} bài hoàn thành</div>
          </div>
          <div className="text-2xl font-extrabold text-[#2563EB]">{Math.round(done.length/LESSONS.length*100)}%</div>
        </div>

        <div className="flex flex-col gap-3">
          {LESSONS.map((lesson, i) => (
            <div key={lesson.id}
              className={`bg-white rounded-2xl p-5 border flex items-center gap-4 transition-all hover:shadow-md
                ${done.includes(lesson.id) ? "border-green-200 bg-green-50" : "border-gray-200"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0
                ${done.includes(lesson.id) ? "bg-green-500 text-white" : "bg-[#EBF4FF] text-[#2563EB]"}`}>
                {done.includes(lesson.id) ? "✓" : i + 1}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5">{lesson.title}</div>
                <div className="text-xs text-gray-400">{lesson.desc} · {lesson.duration}</div>
              </div>
              {!lesson.free && (
                <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded-full">Pro</span>
              )}
              <button onClick={() => handleLesson(lesson.id, lesson.free)}
                className={`text-xs font-bold px-4 py-2 rounded-xl cursor-pointer border-none transition-all
                  ${done.includes(lesson.id)
                    ? "bg-green-100 text-green-700"
                    : lesson.free
                    ? "bg-[#EBF4FF] text-[#2563EB] hover:bg-[#4A90E2] hover:text-white"
                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-500 hover:text-white"}`}>
                {done.includes(lesson.id) ? "✅ Xong" : lesson.free ? "Học ngay" : "🔒 Pro"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}