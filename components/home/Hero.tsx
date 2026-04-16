"use client"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const STATS = [
  { num: 15000, label: "Học viên", suffix: "+" },
  { num: 200, label: "Bài học", suffix: "+" },
  { num: 4.9, label: "Đánh giá", suffix: "★" },
  { num: 99, label: "Chỉ từ/tháng", suffix: "k" },
]

const AVATARS = [
  { name: "Minh", color: "#4A90E2" },
  { name: "Linh", color: "#FF7043" },
  { name: "Huy", color: "#22C55E" },
  { name: "Tú", color: "#8B5CF6" },
  { name: "An", color: "#F59E0B" },
]

// Animated counter
function Counter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(target * eased)
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  const display = target < 10
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString()

  return <span ref={ref}>{display}{suffix}</span>
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-8 py-24 text-center"
      style={{
        background: "linear-gradient(160deg, #0A1628 0%, #0F1F3D 40%, #1A0A2E 100%)",
      }}>

      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{ width: 500, height: 500, top: -100, right: -100, background: "radial-gradient(circle, rgba(74,144,226,0.3) 0%, transparent 70%)" }} />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute rounded-full"
          style={{ width: 400, height: 400, bottom: -50, left: -50, background: "radial-gradient(circle, rgba(123,97,255,0.25) 0%, transparent 70%)" }} />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute rounded-full"
          style={{ width: 300, height: 300, top: "30%", left: "30%", background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="relative z-10">

        {/* Social proof avatars + badge */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <div key={a.name}
                className="w-9 h-9 rounded-full border-2 border-[#0F1F3D] flex items-center justify-center text-white text-xs font-bold"
                style={{ background: a.color }}>
                {a.name[0]}
              </div>
            ))}
          </div>
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(74,144,226,0)", "0 0 0 6px rgba(74,144,226,0.15)", "0 0 0 0 rgba(74,144,226,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="px-4 py-2 rounded-full text-sm font-bold border"
            style={{ background: "rgba(74,144,226,0.15)", color: "#93C5FD", borderColor: "rgba(74,144,226,0.3)" }}>
            🔥 <span style={{ color: "#FCD34D" }}>15,000+</span> học viên đang học mỗi ngày
          </motion.div>
        </div>

        {/* Headline */}
        <h1 className="font-head font-extrabold leading-tight mb-5"
          style={{ fontSize: "clamp(36px,6vw,64px)", color: "white" }}>
          Nói tiếng Anh<br />
          tự tin như{" "}
          <span style={{
            background: "linear-gradient(135deg, #00D4FF, #7B61FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>người bản xứ</span>
        </h1>

        {/* Tagline */}
        <p style={{ color: "#94A3B8", fontSize: 17, maxWidth: 560, margin: "0 auto 12px", lineHeight: 1.7 }}>
          AI luyện nói 1:1 – Nghe & Nói như người bản xứ chỉ sau 30 ngày
        </p>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 36 }}>
          Từ giao tiếp hàng ngày đến IELTS, TOEIC – SpeakNest lo hết!
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-6">
          <motion.div
            animate={{ boxShadow: ["0 4px 18px rgba(74,144,226,0.4)", "0 4px 28px rgba(74,144,226,0.7)", "0 4px 18px rgba(74,144,226,0.4)"] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <Link href="/courses"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl no-underline text-base transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,#4A90E2,#7B61FF)" }}>
              🚀 Bắt đầu học ngay
            </Link>
          </motion.div>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl no-underline text-base transition-all hover:-translate-y-1 border"
            style={{ background: "rgba(255,255,255,0.05)", color: "#F1F5F9", borderColor: "rgba(255,255,255,0.15)" }}>
            Xem bảng giá →
          </Link>
        </div>

        {/* Trust badge */}
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 40 }}>
          ✅ Học thử 7 ngày miễn phí – Không cần thẻ tín dụng
        </p>

        {/* Mini testimonials */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-14">
          {[
            { avatar: "M", color: "#4A90E2", name: "Minh Anh", text: "IELTS 7.0 sau 4 tháng! 🎉" },
            { avatar: "T", color: "#FF7043", name: "Thanh Tú", text: "Streak 120 ngày rồi 🔥" },
            { avatar: "H", color: "#22C55E", name: "Hoàng Nam", text: "Giao tiếp tự tin hơn hẳn ✨" },
          ].map((t) => (
            <motion.div key={t.name}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all"
              style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-xs" style={{ color: "#F1F5F9" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{t.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated stats */}
        <div className="flex justify-center gap-10 flex-wrap">
          {STATS.map((s) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center">
              <div className="font-head text-3xl font-extrabold mb-1"
                style={{ background: "linear-gradient(135deg,#00D4FF,#7B61FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <div className="text-xs font-semibold" style={{ color: "#64748B" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}