"use client";
// components/home/Testimonials.tsx
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-16 px-8" style={{ background: "#EBF4FF" }}>
      <h2 className="font-head text-3xl font-extrabold text-center text-gray-800 mb-2">
        Học viên nói gì về SpeakNest?
      </h2>
      <p className="text-center text-gray-400 text-sm mb-10">
        Hơn 15,000 học viên đã thay đổi tiếng Anh của mình
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-sky-mid"
          >
            <div className="text-yellow-400 text-sm mb-3">{"★".repeat(t.rating)}</div>
            {t.achievement && (
              <div className="inline-block bg-sky-light text-sky-dark text-xs font-bold px-3 py-1 rounded-full mb-3">
                🏆 {t.achievement}
              </div>
            )}
            <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                   style={{ background: t.avatar_gradient }}>
                {t.avatar_initial}
              </div>
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
