// app/page.tsx – Trang chủ
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Testimonials } from "@/components/home/Testimonials";
import { StreakBanner } from "@/components/home/StreakBanner";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedCourses />
      <Testimonials />
      <StreakBanner />
      <Footer />
    </>
  );
}
