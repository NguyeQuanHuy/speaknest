"use client"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { COURSES } from "@/lib/data"
import type { CourseCategory } from "@/types"

const COURSE_IMAGES: Record<string, string> = {
  "daily-conversation": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  "ielts-mastery": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  "toeic-900": "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=600&q=80",
  "business-english": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  "absolute-beginner": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  "travel-english": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
}

const FILTERS: { label: string; value: "all" | CourseCategory }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Giao tiếp", value: "conversation" },
  { label: "IELTS", value: "ielts" },
  { label: "TOEIC", value: "toeic" },
  { label: "Business", value: "business" },
  { label: "Người mới", value: "beginner" },
]

export function CourseGrid() {
  const [active, setActive] = useState<"all" | CourseCategory>("all")
  const filtered = active === "all" ? COURSES : COURSES.filter((c) => c.category === active)

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className="px-5 py-2 rounded-full text-sm font-bold border-[1.5px] transition-all cursor-pointer"
            style={
              active === f.value
                ? { background: "#4A90E2", color: "white", borderColor: "#4A90E2" }
                : { background: "white", color: "#374151", borderColor: "#94A3B8" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(74,144,226,0.2)" }}
            className="rounded-2xl overflow-hidden border transition-all duration-300"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            {/* Banner */}
            <div className="h-40 relative overflow-hidden">
              <img
                src={
                  COURSE_IMAGES[c.id] ??
                  `https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80`
                }
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: c.banner_gradient }}
              />
              <div className="absolute top-3 left-3 text-3xl">{c.thumbnail_emoji}</div>
            </div>

            <div className="p-5">
              {/* Tags – luôn đọc được dù light hay dark mode */}
              <div className="flex gap-2 mb-2.5 flex-wrap">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#1D4ED8", color: "white" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-head text-base font-bold mb-1.5" style={{ color: "#1E293B" }}>
                {c.title}
              </h3>
              <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "#64748B" }}>
                {c.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm" style={{ color: "#2563EB" }}>
                    {c.is_free ? "Miễn phí" : "Pro"}
                  </div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>
                    {c.total_lessons} bài học
                  </div>
                </div>
                <Link
                  href={`/courses/${c.id}`}
                  className="text-xs font-bold px-4 py-2 rounded-xl no-underline transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)", color: "white" }}
                >
                  Học ngay →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-10 rounded-2xl p-7 text-center border"
        style={{ background: "linear-gradient(135deg,#EBF4FF,#F0FFF4)", borderColor: "#BFDBFE" }}
      >
        <h3 className="font-head text-xl font-extrabold mb-2" style={{ color: "#1E293B" }}>
          Chưa biết bắt đầu từ đâu?
        </h3>
        <p className="text-sm mb-4" style={{ color: "#475569" }}>
          Làm bài test trình độ miễn phí – nhận lộ trình học cá nhân trong 2 phút!
        </p>
        <Link
          href="/test"
          className="inline-block text-white font-bold px-7 py-3 rounded-2xl no-underline hover:opacity-90 transition-all"
          style={{
            background: "linear-gradient(135deg,#4A90E2,#2563EB)",
            boxShadow: "0 4px 18px rgba(74,144,226,0.4)",
          }}
        >
          Làm bài test trình độ miễn phí 🎯
        </Link>
      </div>
    </div>
  )
}
