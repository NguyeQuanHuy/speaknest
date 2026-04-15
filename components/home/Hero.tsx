"use client";
// components/home/Hero.tsx
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { num: "15K+", label: "Học viên" },
  { num: "200+", label: "Bài học" },
  { num: "4.9★", label: "Đánh giá" },
  { num: "99k", label: "Chỉ từ/tháng" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-8 py-20 text-center"
      style={{ background: "linear-gradient(160deg, #EBF4FF 0%, #FFF3F0 50%, #F0FFF4 100%)" }}
    >
      {/* Decorative blob */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full"
           style={{ background: "radial-gradient(circle, rgba(74,144,226,0.08) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white border border-sky-mid text-sky-dark px-4 py-1.5 rounded-full text-xs font-bold mb-5">
          🔥 <span className="text-coral">15,000+</span> học viên đang học mỗi ngày
        </div>

        {/* Headline */}
        <h1 className="font-head text-5xl font-extrabold text-gray-800 leading-tight mb-4">
          Nói tiếng Anh<br />
          tự tin như{" "}
          <span className="gradient-text">người bản xứ</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Học thông minh, vui vẻ, hiệu quả với lộ trình cá nhân hóa.
          Từ giao tiếp hàng ngày đến IELTS, TOEIC – SpeakNest lo hết!
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          <Link
            href="/courses"
            className="text-white font-bold px-7 py-3.5 rounded-2xl no-underline text-base transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)", boxShadow: "0 4px 18px rgba(74,144,226,0.4)" }}
          >
            🚀 Bắt đầu học ngay
          </Link>
          <Link
            href="/pricing"
            className="bg-white text-gray-800 font-bold px-7 py-3.5 rounded-2xl no-underline text-base border border-gray-200 transition-all hover:border-sky hover:text-sky-dark"
          >
            Xem bảng giá →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 flex-wrap">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-head text-2xl font-extrabold text-sky-dark">{s.num}</div>
              <div className="text-xs text-gray-400 font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
