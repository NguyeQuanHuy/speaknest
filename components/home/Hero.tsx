"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { num: "15K+", label: "Học viên" },
  { num: "200+", label: "Bài học" },
  { num: "4.9★", label: "Đánh giá" },
  { num: "99k", label: "Chỉ từ/tháng" },
];

const AVATARS = [
  { name: "Minh", color: "#4A90E2" },
  { name: "Linh", color: "#FF7043" },
  { name: "Huy", color: "#22C55E" },
  { name: "Tú", color: "#8B5CF6" },
  { name: "An", color: "#F59E0B" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-8 py-20 text-center"
      style={{ background: "linear-gradient(160deg, #EBF4FF 0%, #FFF3F0 50%, #F0FFF4 100%)" }}
    >
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full"
           style={{ background: "radial-gradient(circle, rgba(74,144,226,0.08) 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

        {/* Social proof avatars */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <div key={a.name}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ background: a.color }}>
                {a.name[0]}
              </div>
            ))}
          </div>
          <div className="bg-white border border-sky-mid px-3 py-1.5 rounded-full text-xs font-bold text-sky-dark">
            🔥 <span className="text-coral">15,000+</span> học viên đang học mỗi ngày
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-head text-5xl font-extrabold text-gray-800 leading-tight mb-4">
          Nói tiếng Anh<br />
          tự tin như{" "}
          <span style={{
            background: "linear-gradient(135deg, #4A90E2, #FF7043)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>người bản xứ</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Học thông minh, vui vẻ, hiệu quả với lộ trình cá nhân hóa.
          Từ giao tiếp hàng ngày đến IELTS, TOEIC – SpeakNest lo hết!
        </p>

        {/* CTA */}
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          <Link href="/courses"
            className="text-white font-bold px-7 py-3.5 rounded-2xl no-underline text-base transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)", boxShadow: "0 4px 18px rgba(74,144,226,0.4)" }}>
            🚀 Bắt đầu học ngay
          </Link>
          <Link href="/pricing"
            className="bg-white text-gray-800 font-bold px-7 py-3.5 rounded-2xl no-underline text-base border border-gray-200 transition-all hover:border-[#4A90E2] hover:text-[#2563EB]">
            Xem bảng giá →
          </Link>
        </div>

        {/* Student testimonial strip */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
          {[
            { avatar:"M", color:"#4A90E2", name:"Minh Anh", text:"IELTS 7.0 sau 4 tháng! 🎉" },
            { avatar:"T", color:"#FF7043", name:"Thanh Tú", text:"Streak 120 ngày rồi 🔥" },
            { avatar:"H", color:"#22C55E", name:"Hoàng Nam", text:"Giao tiếp tự tin hơn hẳn ✨" },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl px-4 py-3 border border-gray-200 flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-xs">{t.name}</div>
                <div className="text-xs text-gray-500">{t.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 flex-wrap">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-head text-2xl font-extrabold text-[#2563EB]">{s.num}</div>
              <div className="text-xs text-gray-400 font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}