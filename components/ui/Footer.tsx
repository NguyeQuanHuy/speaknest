// components/ui/Footer.tsx
import Link from "next/link";

const FOOTER_LINKS = {
  "Khóa học": [
    { label: "Giao tiếp hàng ngày", href: "/courses/daily-conversation" },
    { label: "Luyện thi IELTS", href: "/courses/ielts-mastery" },
    { label: "Luyện thi TOEIC", href: "/courses/toeic-900" },
    { label: "Business English", href: "/courses/business-english" },
  ],
  "Hỗ trợ": [
    { label: "Câu hỏi thường gặp", href: "/faq" },
    { label: "Chính sách hoàn tiền", href: "/refund" },
    { label: "Liên hệ", href: "/contact" },
    { label: "Blog học tiếng Anh", href: "/blog" },
  ],
  "Theo dõi": [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Zalo OA", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-8 pt-12 pb-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-head text-xl font-extrabold mb-2">🪺 SpeakNest</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Nền tảng học tiếng Anh hiện đại, thân thiện, hiệu quả – được thiết kế đặc biệt cho người Việt.
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 no-underline hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-5 text-center text-xs text-gray-400">
        © 2025 SpeakNest. Made with ❤️ for Vietnamese learners
      </div>
    </footer>
  );
}
