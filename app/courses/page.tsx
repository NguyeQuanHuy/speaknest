import { CourseGrid } from "@/components/courses/CourseGrid"
import { Footer } from "@/components/ui/Footer"
export const metadata = { title: "Khóa học – SpeakNest" }
export default function CoursesPage() {
  return (
    <>
      <div className="text-center py-12 px-8" style={{background:"linear-gradient(160deg,#EBF4FF 0%,#FFF3F0 100%)"}}>
        <h1 className="font-head text-4xl font-extrabold mb-2">📚 Khóa học của SpeakNest</h1>
        <p className="text-gray-600">Từ người mới bắt đầu đến IELTS 8.0 – mọi lộ trình đều có tại đây</p>
      </div>
      <CourseGrid />
      <Footer />
    </>
  )
}
