"use client"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { COURSES } from "@/lib/data"
import type { CourseCategory } from "@/types"

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
  const filtered = active === "all" ? COURSES : COURSES.filter(c => c.category === active)
  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setActive(f.value)}
            className={`px-5 py-2 rounded-full text-sm font-bold border-[1.5px] transition-all cursor-pointer ${active === f.value ? "bg-[#4A90E2] text-white border-[#4A90E2]" : "bg-white text-gray-600 border-gray-200 hover:text-[#2563EB]"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div key={c.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="h-28 flex items-center justify-center text-4xl" style={{ background: c.banner_gradient }}>{c.thumbnail_emoji}</div>
            <div className="p-5">
              <div className="flex gap-2 mb-2.5 flex-wrap">
                {c.tags.map(tag => <span key={tag} className="bg-[#EBF4FF] text-[#2563EB] text-xs font-bold px-2.5 py-0.5 rounded-full">{tag}</span>)}
              </div>
              <h3 className="font-head text-base font-bold mb-1.5">{c.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-[#2563EB] text-sm">{c.is_free ? "Miễn phí" : "Pro"}</div>
                  <div className="text-xs text-gray-400">{c.total_lessons} bài học</div>
                </div>
                <Link href={`/courses/${c.id}`} className="bg-[#EBF4FF] text-[#2563EB] text-xs font-bold px-4 py-2 rounded-xl no-underline hover:bg-[#4A90E2] hover:text-white transition-colors">
                  Học ngay →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
