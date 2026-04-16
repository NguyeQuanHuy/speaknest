"use client"
import { motion } from "framer-motion"

const PARTNERS = [
  { name: "British Council", emoji: "🇬🇧" },
  { name: "Cambridge", emoji: "🎓" },
  { name: "IELTS Official", emoji: "📝" },
  { name: "TOEIC ETS", emoji: "🏆" },
  { name: "Coursera", emoji: "💻" },
  { name: "Google for Education", emoji: "🔍" },
]

const STATS = [
  { num: "15,000+", label: "Học viên đang học" },
  { num: "4.9/5", label: "Điểm đánh giá trung bình" },
  { num: "200+", label: "Bài học chất lượng cao" },
  { num: "85%", label: "Học viên đạt mục tiêu" },
]

export function Partners() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-5 rounded-2xl border border-gray-100"
              style={{ background: "linear-gradient(135deg,#EBF4FF,#F0FFF4)" }}>
              <div className="font-head text-2xl font-extrabold mb-1" style={{ color: "#2563EB" }}>{s.num}</div>
              <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center mb-8">
          <h2 className="font-head text-2xl font-extrabold text-gray-800 mb-2">🤝 Đối tác & Chứng nhận</h2>
          <p className="text-gray-400 text-sm">Nội dung được kiểm duyệt bởi các tổ chức uy tín quốc tế</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {PARTNERS.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:border-[#B8D9F8] hover:shadow-md transition-all cursor-pointer">
              <div className="text-3xl mb-2">{p.emoji}</div>
              <div className="text-xs font-bold text-gray-600 text-center">{p.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}