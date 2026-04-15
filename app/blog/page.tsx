import Link from "next/link"
import { Footer } from "@/components/ui/Footer"
export const metadata = { title: "Blog – SpeakNest" }

const POSTS = [
  { slug:"top-10-meo-hoc-tu-vung", title:"Top 10 mẹo học từ vựng siêu nhanh mà người học tiếng Anh nên biết", excerpt:"Bạn hay quên từ vựng sau khi học? Đây là 10 kỹ thuật ghi nhớ từ khoa học nhất...", category:"tips", emoji:"💡", time:5, date:"15/01/2025" },
  { slug:"phan-biet-present-perfect-vs-past-simple", title:"Phân biệt Present Perfect và Past Simple một lần cho mãi mãi", excerpt:"Đây là 2 thì khiến người Việt học tiếng Anh nhầm lẫn nhiều nhất. Hôm nay mình sẽ giải thích cực kỳ đơn giản...", category:"grammar", emoji:"📝", time:7, date:"10/01/2025" },
  { slug:"bi-quyet-tang-band-score-ielts-listening", title:"Bí quyết tăng band score IELTS Listening từ 6.0 lên 7.5", excerpt:"Listening là kỹ năng khó nhất trong IELTS với nhiều học viên Việt. Cùng xem chiến lược hiệu quả nhất...", category:"ielts", emoji:"🎧", time:8, date:"05/01/2025" },
  { slug:"tieng-anh-van-phong-email-chuyen-nghiep", title:"10 mẫu email tiếng Anh văn phòng chuyên nghiệp bạn cần biết", excerpt:"Viết email tiếng Anh đúng chuẩn sẽ giúp bạn gây ấn tượng tốt với đối tác và sếp nước ngoài...", category:"business", emoji:"✉️", time:6, date:"01/01/2025" },
  { slug:"van-hoa-my-qua-tieng-anh", title:"Học tiếng Anh qua văn hóa Mỹ: những điều thú vị bạn chưa biết", excerpt:"Hiểu văn hóa là chìa khóa để nói tiếng Anh tự nhiên như người bản xứ. Khám phá ngay...", category:"culture", emoji:"🗽", time:4, date:"28/12/2024" },
  { slug:"spaced-repetition-khoa-hoc-hoc-tu-vung", title:"Spaced Repetition: Khoa học đằng sau việc nhớ từ vựng mãi mãi", excerpt:"Tại sao bạn học rồi lại quên? Thuật toán Spaced Repetition của SpeakNest giải quyết vấn đề này như thế nào...", category:"tips", emoji:"🧠", time:6, date:"20/12/2024" },
]

const CATEGORY_COLORS: Record<string, string> = {
  tips: "bg-[#EBF4FF] text-[#2563EB]",
  grammar: "bg-[#F5F0FF] text-[#6D28D9]",
  ielts: "bg-[#FEF3C7] text-[#92400E]",
  business: "bg-[#F0FFF4] text-[#166534]",
  culture: "bg-[#FFF3F0] text-[#C62828]",
}

const CATEGORY_LABELS: Record<string, string> = {
  tips: "Mẹo học", grammar: "Ngữ pháp", ielts: "IELTS", business: "Business", culture: "Văn hóa"
}

export default function BlogPage() {
  return (
    <>
      <div className="text-center py-12 px-8" style={{background:"linear-gradient(160deg,#F5F0FF 0%,#EBF4FF 100%)"}}>
        <h1 className="font-head text-4xl font-extrabold mb-2">✍️ Blog SpeakNest</h1>
        <p className="text-gray-600">Tips học tiếng Anh, ngữ pháp, văn hóa – cập nhật mỗi tuần</p>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="no-underline group">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 h-full hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="h-36 flex items-center justify-center text-5xl bg-gray-50">{p.emoji}</div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[p.category]}`}>{CATEGORY_LABELS[p.category]}</span>
                  <span className="text-xs text-gray-400">{p.time} phút đọc</span>
                </div>
                <h3 className="font-head text-base font-bold mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{p.excerpt}</p>
                <div className="text-xs text-gray-400">{p.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  )
}
