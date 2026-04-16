"use client"
import { motion } from "framer-motion"

const TEACHERS = [
  { name: "Sarah Johnson", role: "IELTS Expert", flag: "🇬🇧", exp: "8 năm kinh nghiệm", students: "2,400+", avatar: "S", color: "#4A90E2", desc: "Cựu giám khảo IELTS Cambridge, chuyên gia luyện thi Band 7.0+" },
  { name: "Michael Chen", role: "Business English", flag: "🇺🇸", exp: "10 năm kinh nghiệm", students: "3,100+", avatar: "M", color: "#FF7043", desc: "MBA Harvard, chuyên gia tiếng Anh thương mại và thuyết trình" },
  { name: "Emma Wilson", role: "Pronunciation Coach", flag: "🇦🇺", exp: "6 năm kinh nghiệm", students: "1,800+", avatar: "E", color: "#22C55E", desc: "Chuyên gia phát âm chuẩn giọng Anh-Mỹ-Úc, giảng viên đại học" },
]

export function Teachers() {
  return (
    <section className="py-16 px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-head text-3xl font-extrabold text-gray-800 mb-2">👨‍🏫 Đội ngũ giáo viên</h2>
          <p className="text-gray-400 text-sm">Giáo viên bản xứ giàu kinh nghiệm, tận tâm với từng học viên</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEACHERS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 relative"
                style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)` }}>
                {t.avatar}
                <div className="absolute -bottom-1 -right-1 text-lg">{t.flag}</div>
              </div>
              <div className="font-head text-lg font-extrabold mb-1">{t.name}</div>
              <div className="text-xs font-bold mb-3 px-3 py-1 rounded-full inline-block"
                style={{ background: "#EBF4FF", color: "#2563EB" }}>{t.role}</div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.desc}</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="font-bold text-sm text-gray-800">{t.exp}</div>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <div className="font-bold text-sm text-gray-800">{t.students}</div>
                  <div className="text-xs text-gray-400">học viên</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}