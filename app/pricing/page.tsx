"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { PRICING_PLANS } from "@/lib/data"
import { Footer } from "@/components/ui/Footer"

const FAQS = [
  { q: "Thanh toán bằng hình thức nào?", a: "Hỗ trợ chuyển khoản ngân hàng, Momo, ZaloPay và thẻ tín dụng/ghi nợ nội địa." },
  { q: "Có được hoàn tiền không?", a: "Có! Hoàn tiền 100% trong 7 ngày đầu nếu không hài lòng, không hỏi lý do." },
  { q: "Tôi có thể hủy bất kỳ lúc nào không?", a: "Có, hủy bất kỳ lúc nào. Tài khoản Pro vẫn có hiệu lực đến hết kỳ đã thanh toán." },
  { q: "Học trên điện thoại được không?", a: "Hoàn toàn! SpeakNest tối ưu cho mobile. Học mọi lúc mọi nơi!" },
  { q: "Gói Pro có gì khác gói Miễn phí?", a: "Gói Pro mở khóa toàn bộ 200+ bài học, 5000+ flashcard, luyện phát âm AI và chứng chỉ hoàn thành." },
  { q: "Sau khi hết hạn Pro thì sao?", a: "Tài khoản tự động về gói Miễn phí. Dữ liệu học tập và tiến độ của bạn vẫn được lưu đầy đủ." },
]

const ICONS = ["🆓", "⭐", "💎"]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      {/* Hero – fix chữ bị chìm */}
      <div className="text-center py-16 px-8" style={{ background: "linear-gradient(160deg,#EBF4FF 0%,#F0FFF4 100%)" }}>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border"
          style={{ background: "white", color: "#2563EB", borderColor: "#BFDBFE" }}>
          💰 Học xịn không cần tốn nhiều tiền
        </div>
        {/* Fix: màu chữ đậm để đọc được trên nền sáng */}
        <h1 className="font-head text-4xl font-extrabold mb-3" style={{ color: "#1E293B" }}>
          Bảng giá siêu sinh viên
        </h1>
        <p className="max-w-md mx-auto text-base" style={{ color: "#475569" }}>
          Đầu tư vào tiếng Anh – kỹ năng mang lại thu nhập suốt đời.<br />
          Bắt đầu từ chỉ <strong style={{ color: "#2563EB" }}>3,300đ/ngày!</strong>
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-8 py-12">
        {PRICING_PLANS.map((plan, i) => (
          <motion.div key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 relative transition-all duration-300"
            style={{
              border: plan.is_popular ? "2px solid #4A90E2" : "1.5px solid #E2E8F0",
              boxShadow: plan.is_popular ? "0 0 0 4px rgba(74,144,226,0.1), 0 8px 32px rgba(74,144,226,0.15)" : "none"
            }}>

            {plan.badge && plan.is_popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-extrabold px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{ background: "linear-gradient(135deg,#4A90E2,#2563EB)" }}>
                {plan.badge}
              </div>
            )}

            {/* Fix: icon đồng nhất dùng emoji */}
            <div className="text-4xl mb-3">{ICONS[i]}</div>
            <div className="font-head text-xl font-extrabold mb-1" style={{ color: "#1E293B" }}>{plan.name}</div>
            <div className="text-sm mb-5" style={{ color: "#94A3B8" }}>{plan.description}</div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-head text-4xl font-extrabold"
                style={{ color: plan.id === "pro-quarterly" ? "#F97316" : "#2563EB" }}>
                {plan.price_vnd === 0 ? "0đ" : `${(plan.price_vnd / 1000).toFixed(0)}k`}
              </span>
              <span className="text-sm font-semibold" style={{ color: "#94A3B8" }}>
                {plan.duration_months === 0 ? "/mãi mãi" : plan.duration_months === 1 ? "/tháng" : "/3 tháng"}
              </span>
            </div>

            {plan.original_price_vnd && (
              <div className="text-xs line-through mb-1" style={{ color: "#94A3B8" }}>
                Thay vì {plan.original_price_vnd / 1000}k
              </div>
            )}

            {plan.badge && !plan.is_popular && (
              <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: "#DCFCE7", color: "#166534" }}>{plan.badge}</div>
            )}

            <div className={plan.original_price_vnd ? "" : "h-9"} />

            {/* Features */}
            <ul className="list-none mb-7 space-y-2">
              {plan.features.map(f => (
                <li key={f} className="text-sm flex items-center gap-2 py-1.5 border-b"
                  style={{ borderColor: "#F1F5F9", color: "#475569" }}>
                  <span style={{ color: "#22C55E", fontWeight: 800 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className="w-full py-3.5 rounded-2xl text-base font-extrabold cursor-pointer border-none transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={
                plan.is_popular
                  ? { background: "linear-gradient(135deg,#4A90E2,#2563EB)", color: "white", boxShadow: "0 4px 16px rgba(74,144,226,0.35)" }
                  : plan.id === "pro-quarterly"
                  ? { background: "linear-gradient(135deg,#F97316,#EA580C)", color: "white" }
                  : { background: "white", color: "#2563EB", border: "1.5px solid #BFDBFE" }
              }>
              {plan.price_vnd === 0 ? "Bắt đầu miễn phí" : `Đăng ký ngay – ${plan.price_vnd === 99000 ? "99,000đ" : "199,000đ"} 🚀`}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs px-8 mb-12" style={{ color: "#94A3B8" }}>
        🔒 Thanh toán an toàn · 💯 Hoàn tiền 7 ngày · Hủy bất kỳ lúc nào
      </p>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="font-head text-2xl font-extrabold mb-2" style={{ color: "#1E293B" }}>
            🙋 Câu hỏi thường gặp
          </h2>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Giải đáp mọi thắc mắc trước khi đăng ký</p>
        </div>
        {FAQS.map((faq, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl mb-3 overflow-hidden border"
            style={{ borderColor: "#E2E8F0" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-5 py-4 text-left font-bold text-sm flex justify-between items-center cursor-pointer border-none transition-colors"
              style={{
                background: openFaq === i ? "#EBF4FF" : "white",
                color: openFaq === i ? "#2563EB" : "#1E293B"
              }}>
              {faq.q}
              <span style={{ color: openFaq === i ? "#2563EB" : "#94A3B8" }}>
                {openFaq === i ? "▼" : "▶"}
              </span>
            </button>
            {openFaq === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ background: "#EBF4FF", color: "#475569" }}>
                {faq.a}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <Footer />
    </>
  )
}