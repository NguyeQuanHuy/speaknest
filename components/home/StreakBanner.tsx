"use client";
// components/home/StreakBanner.tsx
import Link from "next/link";

export function StreakBanner() {
  return (
    <section className="text-white text-center py-12 px-8"
             style={{ background: "linear-gradient(135deg, #2563EB, #FF7043)" }}>
      <h2 className="font-head text-3xl font-extrabold mb-2">🔥 Bắt đầu streak của bạn hôm nay!</h2>
      <p className="text-base opacity-90 mb-6">Chỉ 20 phút mỗi ngày – duy trì streak – thành công trong tầm tay</p>
      <Link href="/pricing"
            className="inline-block bg-white text-gray-800 font-bold px-8 py-3.5 rounded-2xl no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
        Đăng ký học ngay – Chỉ từ 99,000đ/tháng
      </Link>
    </section>
  );
}
