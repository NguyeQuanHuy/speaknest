import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { FeaturedCourses } from "@/components/home/FeaturedCourses"
import { Testimonials } from "@/components/home/Testimonials"
import { Teachers } from "@/components/home/Teachers"
import { Partners } from "@/components/home/Partners"
import { StreakBanner } from "@/components/home/StreakBanner"
import { Footer } from "@/components/ui/Footer"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedCourses />
      <Testimonials />
      <Teachers />
      <Partners />
      <StreakBanner />
      <Footer />
    </>
  )
}