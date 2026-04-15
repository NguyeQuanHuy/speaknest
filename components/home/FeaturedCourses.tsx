"use client";
// components/home/FeaturedCourses.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { COURSES } from "@/lib/data";

export function FeaturedCourses() {
  const featured = COURSES.slice(0, 3);
  return (
    <section className="max-w-6xl mx-auto px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-head text-3xl font-extrabold text-gray-800 mb-1">Khóa học nổi bật</h2>
          <p className="text-gray-400 text-sm">Được học viên đánh giá cao nhất</p>
        </div>
        <Link href="/courses" className="text-sky-dark font-semibold text-sm hover:underline no-underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featured.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 card-hover cursor-pointer"
          >
            <div className="h-28 flex items-center justify-center text-4xl" style={{ background: c.banner_gradient }}>
              {c.thumbnail_emoji}
            </div>
            <div className="p-5">
              <div className="flex gap-2 mb-2.5">
                {c.tags.map((tag) => (
                  <span key={tag} className="bg-sky-light text-sky-dark text-xs font-bold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <h3 className="font-head text-base font-bold mb-1.5">{c.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sky-dark text-sm">{c.is_free ? "Miễn phí" : "Pro"}</div>
                  <div className="text-xs text-gray-400">{c.total_lessons} bài học</div>
                </div>
                <Link href={`/courses/${c.id}`}
                      className="bg-sky-light text-sky-dark text-xs font-bold px-4 py-2 rounded-xl no-underline hover:bg-sky hover:text-white transition-colors">
                  Học ngay →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
