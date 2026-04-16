"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { getUserStats } from "@/lib/streak"

const MENU = [
  { id: "overview", label: "Tổng quan", icon: "📊" },
  { id: "courses", label: "Khóa học của tôi", icon: "📚" },
  { id: "vocab", label: "Từ vựng đã lưu", icon: "📖" },
  { id: "stats", label: "Thống kê", icon: "📈" },
  { id: "achievements", label: "Thành tích", icon: "🏆" },
  { id: "settings", label: "Cài đặt", icon: "⚙️" },
]

const DAYS = [
  { name: "T2", num: "20", done: true },
  { name: "T3", num: "21", done: true },
  { name: "T4", num: "22", done: true },
  { name: "T5", num: "23", done: true },
  { name: "T6", num: "24", today: true },
  { name: "T7", num: "25" },
  { name: "CN", num: "26" },
]

const MY_COURSES = [
  {
    icon: "💬",
    bg: "#EBF4FF",
    name: "Giao tiếp tiếng Anh hàng ngày",
    meta: "Bài 24/48 · Hôm nay",
    pct: 50,
    color: "#4A90E2",
    timeLeft: "Còn ~12 ngày",
  },
  {
    icon: "🏆",
    bg: "#FEF3C7",
    name: "Luyện thi IELTS 7.0+",
    meta: "Bài 18/120 · 3 ngày trước",
    pct: 15,
    color: "#F59E0B",
    timeLeft: "Còn ~60 ngày",
  },
  {
    icon: "🌱",
    bg: "#F0FFF4",
    name: "Từ vựng A–Z người mới",
    meta: "Bài 35/35 · Hoàn thành ✅",
    pct: 100,
    color: "#22C55E",
    timeLeft: "Hoàn thành!",
  },
]

const TODAY_GOALS = [
  {
    icon: "💬",
    label: "Luyện nói",
    target: 15,
    done: 15,
    unit: "phút",
    color: "#4A90E2",
    bg: "#EBF4FF",
  },
  {
    icon: "📖",
    label: "Từ vựng mới",
    target: 20,
    done: 10,
    unit: "từ",
    color: "#8B5CF6",
    bg: "#F5F0FF",
  },
  {
    icon: "🎧",
    label: "Bài nghe",
    target: 2,
    done: 1,
    unit: "bài",
    color: "#FF7043",
    bg: "#FFF3F0",
  },
]

export default function AccountPage() {
  const [tab, setTab] = useState("overview")
  const [stats, setStats] = useState<any>(null)
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    getUserStats().then((s) => s && setStats(s))
  }, [])

  const totalGoalPct = Math.round(
    (TODAY_GOALS.reduce((acc, g) => acc + g.done / g.target, 0) / TODAY_GOALS.length) * 100
  )

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg,#F8FAFF 0%,#F0F4FF 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* ===== SIDEBAR ===== */}
        <aside
          className="rounded-3xl p-6 border h-fit"
          style={{
            background: "white",
            borderColor: "#E2E8F0",
            boxShadow: "0 4px 24px rgba(74,144,226,0.08)",
          }}
        >
          {/* Profile */}
          <div className="text-center pb-6 mb-6 border-b" style={{ borderColor: "#F1F5F9" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-18 h-18 rounded-full flex items-center justify-center text-white text-3xl font-extrabold mx-auto mb-3"
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg,#4A90E2,#7B61FF)",
                boxShadow: "0 4px 18px rgba(74,144,226,0.4)",
              }}
            >
              H
            </motion.div>
            <div className="font-head text-lg font-bold mb-1">Nguyễn Văn Huy</div>
            <div
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#EBF4FF,#F5F0FF)", color: "#4A90E2" }}
            >
              ⚡ Intermediate B1
            </div>
          </div>

          {/* Streak – glassmorphism style */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(245,158,11,0)",
                "0 0 0 8px rgba(245,158,11,0.15)",
                "0 0 0 0 rgba(245,158,11,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="rounded-2xl p-4 text-center mb-5 border"
            style={{
              background: "linear-gradient(135deg,#FFF7ED,#FEF3C7)",
              borderColor: "#FDE68A",
            }}
          >
            <div className="font-head text-4xl font-extrabold" style={{ color: "#F59E0B" }}>
              🔥 {stats?.streak ?? 1}
            </div>
            <div className="text-xs font-bold mt-1" style={{ color: "#92400E" }}>
              Ngày streak liên tiếp!
            </div>
            <div className="text-xs mt-1" style={{ color: "#B45309" }}>
              🏆 XP: {stats?.total_xp ?? 0}
            </div>
          </motion.div>

          {/* Menu */}
          <nav className="flex flex-col gap-1">
            {MENU.map((m) => (
              <button
                key={m.id}
                onClick={() => setTab(m.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none text-left transition-all"
                style={
                  tab === m.id
                    ? {
                        background: "linear-gradient(135deg,#EBF4FF,#F5F0FF)",
                        color: "#2563EB",
                        boxShadow: "0 2px 8px rgba(74,144,226,0.15)",
                      }
                    : { background: "transparent", color: "#64748B" }
                }
              >
                <span className="text-lg">{m.icon}</span>
                {m.label}
                {tab === m.id && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "#4A90E2" }}
                  />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ===== MAIN ===== */}
        <div className="flex flex-col gap-5">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "📖", num: "342", label: "Từ vựng đã học", color: "#4A90E2", bg: "#EBF4FF" },
              { icon: "⏱️", num: "24h", label: "Tổng giờ học", color: "#8B5CF6", bg: "#F5F0FF" },
              {
                icon: "✅",
                num: "67",
                label: "Bài đã hoàn thành",
                color: "#22C55E",
                bg: "#F0FFF4",
              },
              { icon: "🎯", num: "82%", label: "Điểm trung bình", color: "#FF7043", bg: "#FFF3F0" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(74,144,226,0.12)" }}
                className="rounded-2xl p-5 border transition-all"
                style={{ background: "white", borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: s.bg }}
                >
                  {s.icon}
                </div>
                <div
                  className="font-head text-2xl font-extrabold mb-0.5"
                  style={{ color: s.color }}
                >
                  {s.num}
                </div>
                <div className="text-xs font-semibold" style={{ color: "#94A3B8" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mục tiêu hôm nay – đưa lên cao */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-6 border"
            style={{
              background: "white",
              borderColor: "#E2E8F0",
              boxShadow: "0 4px 24px rgba(74,144,226,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="font-head text-lg font-bold">🎯 Mục tiêu hôm nay</div>
              <div
                className="font-head text-2xl font-extrabold"
                style={{ color: totalGoalPct === 100 ? "#22C55E" : "#4A90E2" }}
              >
                {totalGoalPct}%
              </div>
            </div>
            {/* Overall progress */}
            <div
              className="h-3 rounded-full mb-5 overflow-hidden"
              style={{ background: "#F1F5F9" }}
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${totalGoalPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ background: "linear-gradient(90deg,#4A90E2,#7B61FF)" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {TODAY_GOALS.map((g) => (
                <div
                  key={g.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: g.bg }}
                >
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="font-head text-lg font-extrabold" style={{ color: g.color }}>
                    {g.done}/{g.target}
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#64748B" }}>
                    {g.label} ({g.unit})
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(g.done / g.target) * 100}%`, background: g.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lịch học tuần */}
          <div
            className="rounded-3xl p-6 border"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <div className="font-head text-lg font-bold mb-5">📅 Lịch học tuần này</div>
            <div className="flex gap-2 mb-4">
              {DAYS.map((d) => (
                <div
                  key={d.name}
                  className="flex-1 text-center py-3 rounded-2xl relative"
                  style={
                    d.done
                      ? { background: "linear-gradient(135deg,#4A90E2,#7B61FF)" }
                      : d.today
                        ? { background: "linear-gradient(135deg,#FF7043,#FF8C42)" }
                        : { background: "#F8FAFF", border: "1px dashed #E2E8F0" }
                  }
                >
                  {d.today && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ background: "#FF7043" }}
                    />
                  )}
                  <div
                    className="text-xs font-bold mb-1"
                    style={{ color: d.done || d.today ? "rgba(255,255,255,0.7)" : "#94A3B8" }}
                  >
                    {d.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: d.done || d.today ? "white" : "#CBD5E1" }}
                  >
                    {d.done ? "✓" : d.today ? "▶" : "○"}
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: d.done || d.today ? "white" : "#94A3B8" }}
                  >
                    {d.num}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold" style={{ color: "#22C55E" }}>
              🎉 Tuyệt vời! Bạn đã học 4 ngày liên tiếp tuần này
            </p>
          </div>

          {/* Khóa học đang học */}
          <div
            className="rounded-3xl p-6 border"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <div className="font-head text-lg font-bold mb-5">📚 Khóa học đang học</div>
            <div className="flex flex-col gap-4">
              {MY_COURSES.map((c) => (
                <motion.div
                  key={c.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
                  style={{ borderColor: "#F1F5F9", background: "#FAFBFF" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: c.bg }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm mb-0.5 truncate">{c.name}</div>
                    <div className="text-xs mb-2" style={{ color: "#94A3B8" }}>
                      {c.meta}
                    </div>
                    {/* Thicker gradient progress bar */}
                    <div
                      className="h-2.5 rounded-full overflow-hidden"
                      style={{ background: "#F1F5F9" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${c.pct}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                          background:
                            c.pct === 100
                              ? "linear-gradient(90deg,#22C55E,#16A34A)"
                              : c.pct > 50
                                ? "linear-gradient(90deg,#4A90E2,#7B61FF)"
                                : "linear-gradient(90deg,#F59E0B,#FF7043)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="font-extrabold text-sm" style={{ color: c.color }}>
                      {c.pct}%
                    </div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>
                      {c.timeLeft}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href="/courses/daily-conversation"
                className="inline-block text-white font-bold px-6 py-3 rounded-xl no-underline text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#4A90E2,#2563EB)",
                  boxShadow: "0 4px 14px rgba(74,144,226,0.35)",
                }}
              >
                Tiếp tục học ngay →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
