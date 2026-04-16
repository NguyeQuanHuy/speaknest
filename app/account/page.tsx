"use client"
import { useState } from "react"
import { getUserStats, getWeeklyProgress } from "@/lib/streak"
import { motion } from "framer-motion"
import { Footer } from "@/components/ui/Footer"

const MENU = [
  { id: "overview", label: "Tổng quan", icon: "📊" },
  { id: "courses", label: "Khóa học của tôi", icon: "📚" },
  { id: "vocab", label: "Từ vựng đã lưu", icon: "📖" },
  { id: "stats", label: "Thống kê", icon: "📈" },
  { id: "achievements", label: "Thành tích", icon: "🏆" },
  { id: "settings", label: "Cài đặt", icon: "⚙️" },
]

const DAYS = [
  { name:"T2", num:"20", done:true }, { name:"T3", num:"21", done:true },
  { name:"T4", num:"22", done:true }, { name:"T5", num:"23", done:true },
  { name:"T6", num:"24", today:true }, { name:"T7", num:"25" }, { name:"CN", num:"26" },
]

const MY_COURSES = [
  { icon:"💬", bg:"#EBF4FF", name:"Giao tiếp tiếng Anh hàng ngày", meta:"Bài 24/48 · Hôm nay", pct:50, color:"#4A90E2" },
  { icon:"🏆", bg:"#FEF3C7", name:"Luyện thi IELTS 7.0+", meta:"Bài 18/120 · 3 ngày trước", pct:15, color:"#F59E0B" },
  { icon:"🌱", bg:"#F0FFF4", name:"Từ vựng A–Z người mới", meta:"Bài 35/35 · Hoàn thành ✅", pct:100, color:"#22C55E" },
]

export default function AccountPage() {
  const [tab, setTab] = useState("overview")
  const [stats, setStats] = useState<any>(null)
    const [weekData, setWeekData] = useState<any[]>([])

    useEffect(() => {
      getUserStats().then(s => s && setStats(s))
      getWeeklyProgress().then(w => setWeekData(w))
    }, [])
  return (
    <>
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
          {/* Profile */}
          <div className="text-center pb-6 mb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-3"
              style={{background:"linear-gradient(135deg,#4A90E2,#FF7043)"}}>H</div>
            <div className="font-head text-lg font-bold mb-1">Nguyễn Văn Huy</div>
            <span className="bg-[#EBF4FF] text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full">Intermediate B1</span>
          </div>
          {/* Streak */}
          <div className="rounded-xl p-4 text-center mb-5 border border-yellow-200"
            style={{background:"linear-gradient(135deg,#FFF7ED,#FEF3C7)"}}>
            <div className="font-head text-3xl font-extrabold text-yellow-400">🔥 {stats?.streak ?? 0}</div>
            <div className="text-xs text-amber-800 font-semibold mt-1">Ngày streak liên tiếp!</div>
          </div>
          {/* Menu */}
          <nav className="flex flex-col gap-1">
            {MENU.map(m => (
              <button key={m.id} onClick={() => setTab(m.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none text-left transition-all
                  ${tab === m.id ? "bg-[#EBF4FF] text-[#2563EB]" : "bg-transparent text-gray-600 hover:bg-[#EBF4FF] hover:text-[#2563EB]"}`}>
                <span className="text-base">{m.icon}</span> {m.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon:"📖", num:"342", label:"Từ vựng đã học" },
              { icon:"⏱️", num:"24h", label:"Tổng giờ học" },
              { icon:"✅", num:"67", label:"Bài đã hoàn thành" },
              { icon:"🎯", num:"82%", label:"Điểm trung bình" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.07 }}
                className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-head text-2xl font-extrabold mb-0.5">{s.num}</div>
                <div className="text-xs text-gray-400 font-semibold">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Week calendar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="font-head text-lg font-bold mb-4">📅 Lịch học tuần này</div>
            <div className="flex gap-2 mb-4">
              {DAYS.map(d => (
                <div key={d.name} className={`flex-1 text-center py-2.5 rounded-xl ${d.done ? "" : d.today ? "" : "bg-gray-100"}`}
                  style={d.done ? {background:"linear-gradient(135deg,#4A90E2,#2563EB)"} : d.today ? {background:"linear-gradient(135deg,#FF7043,#FF8C42)"} : {}}>
                  <div className={`text-xs font-bold uppercase mb-1 ${d.done||d.today ? "text-white/70" : "text-gray-400"}`}>{d.name}</div>
                  <div className={`text-sm ${d.done||d.today ? "text-white" : "text-gray-400"}`}>{d.done ? "✓" : d.today ? "▶" : "○"}</div>
                  <div className={`text-xs font-bold ${d.done||d.today ? "text-white" : "text-gray-400"}`}>{d.num}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">🎉 Tuyệt vời! Bạn đã học 4 ngày liên tiếp tuần này</p>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="font-head text-lg font-bold mb-4">📚 Khóa học đang học</div>
            <div className="flex flex-col">
              {MY_COURSES.map(c => (
                <div key={c.name} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:c.bg}}>{c.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm mb-0.5 truncate">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.meta}</div>
                  </div>
                  <div className="w-20 flex-shrink-0">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
                      <div className="h-full rounded-full" style={{width:`${c.pct}%`, background:c.color}} />
                    </div>
                    <div className="text-xs text-gray-400 text-right">{c.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 text-white font-bold px-6 py-3 rounded-xl cursor-pointer border-none text-sm"
              style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
              Tiếp tục học ngay →
            </button>
          </div>

          {/* Today goals */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="font-head text-lg font-bold mb-4">🎯 Mục tiêu hôm nay</div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon:"📖", num:"10/10", label:"Từ vựng mới ✅", bg:"#EBF4FF", color:"#2563EB" },
                { icon:"🎧", num:"1/2", label:"Bài nghe", bg:"#FFF3F0", color:"#FF7043" },
                { icon:"✍️", num:"0/1", label:"Bài viết", bg:"#F0FFF4", color:"#166534" },
              ].map(g => (
                <div key={g.label} className="rounded-xl p-4 text-center" style={{background:g.bg}}>
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="font-head text-xl font-extrabold mb-0.5" style={{color:g.color}}>{g.num}</div>
                  <div className="text-xs text-gray-600 font-semibold">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
