import { VocabHome } from "@/components/vocabulary/VocabHome"
import { Footer } from "@/components/ui/Footer"
export const metadata = { title: "Từ vựng – SpeakNest" }
export default function VocabularyPage() {
  return (
    <>
      <div className="text-white text-center py-12 px-8" style={{background:"linear-gradient(135deg,#1E293B,#2563EB)"}}>
        <h1 className="font-head text-4xl font-extrabold mb-2">📖 Kho từ vựng thông minh</h1>
        <p className="opacity-80">5,000+ từ vựng theo chủ đề · Phát âm chuẩn · Flashcard ôn tập</p>
      </div>
      <VocabHome />
      <Footer />
    </>
  )
}
