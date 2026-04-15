"use client";
// components/home/Features.tsx
import { motion } from "framer-motion";

const FEATURES = [
  { icon: "🎯", bg: "#EBF4FF", title: "Lộ trình cá nhân hóa", desc: "AI phân tích trình độ và tự xây dựng lộ trình học phù hợp nhất với bạn. Không học theo kiểu 'đồng phục'!" },
  { icon: "🔥", bg: "#FFF3F0", title: "Daily Streak & Gamification", desc: "Hệ thống điểm, streak, huy hiệu giúp bạn duy trì thói quen học mỗi ngày một cách vui vẻ." },
  { icon: "🎙️", bg: "#F0FFF4", title: "Luyện phát âm chuẩn", desc: "Ghi âm và so sánh giọng bạn với giọng người bản xứ. Phát âm chuẩn ngay từ bài đầu tiên!" },
  { icon: "📚", bg: "#F5F0FF", title: "Flashcard thông minh", desc: "Ôn từ vựng theo Spaced Repetition. Nhớ lâu hơn, quên ít hơn với 5.000+ từ vựng phân theo chủ đề." },
  { icon: "🎧", bg: "#EBF4FF", title: "Luyện nghe thực chiến", desc: "Nghe hội thoại thực tế, phim, podcast ngắn kết hợp bài tập điền từ. Tai nghe tiếng Anh cực nhanh!" },
  { icon: "💬", bg: "#FFF3F0", title: "Giải thích bằng tiếng Việt", desc: "Mọi ngữ pháp, từ vựng khó đều được giải thích bằng tiếng Việt dễ hiểu. Không cần lo mờ não!" },
];

export function Features() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16">
      <h2 className="font-head text-3xl font-extrabold text-center text-gray-800 mb-2">
        Tại sao chọn SpeakNest?
      </h2>
      <p className="text-center text-gray-400 text-sm mb-10">
        Học tiếng Anh không còn nhàm chán, không còn lo lãng phí tiền
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-7 border border-gray-200 card-hover relative overflow-hidden group"
          >
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                 style={{ background: "linear-gradient(90deg,#4A90E2,#FF7043)" }} />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: f.bg }}>
              {f.icon}
            </div>
            <h3 className="font-head text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
