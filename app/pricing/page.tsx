"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { PRICING_PLANS } from "@/lib/data"
import { Footer } from "@/components/ui/Footer"

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const faqs = [
    { q: "SpeakNest có phù hợp với người mới bắt đầu không?", a: "Hoàn toàn phù hợp! SpeakNest có lộ trình từ A-Z. Mọi bài học đều giải thích bằng tiếng Việt, bắt đầu từ những khái niệm đơn giản nhất." },
    { q: "Tôi có thể hủy đăng ký bất kỳ lúc nào không?", a: "Có, bạn có thể hủy bất kỳ lúc nào mà không bị tính phí thêm. Tài khoản Pro vẫn có hiệu lực đến hết kỳ đã thanh toán." },
    { q: "Có hỗ trợ hoàn tiền không?", a: "Có! Nếu không hài lòng trong 7 ngày đầu, chúng tôi hoàn tiền 100% không hỏi lý do. Chúng tôi tự tin vào chất lượng sản phẩm!" },
    { q: "Có thể học trên điện thoại không?", a: "Hoàn toàn! SpeakNest được thiết kế mobile-first. Học mọi lúc, mọi nơi – lúc ngồi xe buýt, giờ nghỉ trưa!" },
  ]

  return (
    <>
      {/* Hero */}
      <div className="text-center py-16 px-8" style={{background:"linear-gradient(160deg,#EBF4FF 0%,#F0FFF4 100%)"}}>
        <div className="inline-flex items-center gap-1.5 bg-white border border-[#B8D9F8] text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold mb-5">
          💰 Học xịn không cần tốn nhiều tiền
        </div>
        <h1 className="font-head text-4xl font-extrabold mb-3">Bảng giá siêu sinh viên</h1>
        <p className="text-gray-600 max-w-md mx-auto">Đầu tư vào tiếng Anh – kỹ năng mang lại thu nhập suốt đời. Bắt đầu từ chỉ 3,300đ/ngày!</p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-8 py-12">
        {PRICING_PLANS.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-3xl p-8 relative transition-all hover:-translate-y-1 ${plan.is_popular ? "border-2 border-[#4A90E2] shadow-xl" : "border border-gray-200 hover:shadow-lg"}`}>
            {plan.badge && plan.is_popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-extrabold px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
                {plan.badge}
              </div>
            )}
            <div className="text-4xl mb-3">{plan.icon}</div>
            <div className="font-head text-xl font-extrabold mb-1">{plan.name}</div>
            <div className="text-sm text-gray-400 mb-5">{plan.description}</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-head text-4xl font-extrabold" style={{color: plan.id === "pro-quarterly" ? "#FF7043" : "#2563EB"}}>
                {plan.price_vnd === 0 ? "0đ" : `${(plan.price_vnd/1000).toFixed(0)}k`}
              </span>
              <span className="text-sm text-gray-400 font-semibold">
                {plan.duration_months === 0 ? "/mãi mãi" : plan.duration_months === 1 ? "/tháng" : `/3 tháng`}
              </span>
            </div>
            {plan.original_price_vnd && (
              <div className="text-xs text-gray-400 line-through mb-1">Thay vì {plan.original_price_vnd/1000}k</div>
            )}
            {plan.badge && !plan.is_popular && (
              <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">{plan.badge}</div>
            )}
            <div className={`${plan.original_price_vnd ? "" : "h-7"}`} />
            <ul className="list-none mb-7 space-y-2">
              {plan.features.map(f => (
                <li key={f} className="text-sm text-gray-600 flex items-center gap-2 py-1.5 border-b border-gray-50">
                  <span className="text-green-500 font-extrabold text-sm flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3.5 rounded-2xl text-base font-extrabold cursor-pointer border-none transition-all hover:-translate-y-0.5 ${plan.is_popular ? "text-white" : plan.id === "pro-quarterly" ? "text-white" : "text-[#2563EB] border border-[#B8D9F8] bg-white hover:bg-[#EBF4FF]"}`}
              style={plan.is_popular ? {background:"linear-gradient(135deg,#4A90E2,#2563EB)",boxShadow:"0 4px 16px rgba(74,144,226,0.35)"} : plan.id === "pro-quarterly" ? {background:"linear-gradient(135deg,#FF7043,#FF8C42)"} : {}}>
              {plan.price_vnd === 0 ? "Bắt đầu miễn phí" : `Đăng ký ngay – ${plan.price_vnd === 99000 ? "99,000đ" : "199,000đ"} 🚀`}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-xs px-8 mb-12">🔒 Thanh toán an toàn · 💯 Hoàn tiền trong 7 ngày · Hủy bất kỳ lúc nào</p>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-8 pb-16">
        <h2 className="font-head text-2xl font-extrabold text-center mb-6">Câu hỏi thường gặp</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className={`w-full px-5 py-4 text-left font-bold text-sm flex justify-between items-center cursor-pointer border-none transition-colors ${openFaq === i ? "bg-[#EBF4FF] text-[#2563EB]" : "bg-white text-gray-800 hover:bg-[#EBF4FF]"}`}>
              {faq.q} <span>{openFaq === i ? "▼" : "▶"}</span>
            </button>
            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>}
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
