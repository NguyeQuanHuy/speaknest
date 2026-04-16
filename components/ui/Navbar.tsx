"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { useDarkMode } from "./DarkModeProvider"

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/courses", label: "Khóa học" },
  { href: "/vocabulary", label: "Từ vựng" },
  { href: "/pricing", label: "Bảng giá" },
  { href: "/blog", label: "Blog" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useDarkMode()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    // Scroll detection cho shadow effect
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => { subscription.unsubscribe(); window.removeEventListener("scroll", onScroll) }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: dark ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${dark ? "#1E293B" : "#E2E8F0"}`,
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s"
      }}>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-head text-xl font-extrabold no-underline flex-shrink-0"
        style={{ color: dark ? "#60A5FA" : "#2563EB" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#4A90E2,#FF7043)" }}>
          🪺
        </div>
        SpeakNest
      </Link>

      {/* Nav links – tăng tương phản + khoảng cách chặt hơn */}
      <div className="hidden md:flex gap-1 mx-4">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}
            className={cn(
              "px-3 py-2 rounded-xl text-sm font-semibold transition-all no-underline",
              pathname === link.href
                ? dark
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-[#EBF4FF] text-[#2563EB]"
                : dark
                  ? "text-slate-200 hover:bg-[#1E293B] hover:text-white"
                  : "text-slate-600 hover:bg-[#EBF4FF] hover:text-[#2563EB]"
            )}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Dark mode toggle */}
        <button onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all text-base"
          style={{
            background: dark ? "#1E293B" : "#F8FAFF",
            borderColor: dark ? "#334155" : "#E2E8F0"
          }}>
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <Link href="/account"
              className="hidden md:flex items-center gap-2 text-sm font-semibold no-underline transition-colors px-2 py-1 rounded-xl hover:bg-[#EBF4FF]"
              style={{ color: dark ? "#F1F5F9" : "#374151" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#4A90E2,#FF7043)" }}>
                {user.user_metadata?.full_name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase()}
              </div>
              <span>{user.user_metadata?.full_name?.split(" ").pop() ?? "Tôi"}</span>
            </Link>
            <button onClick={handleLogout}
              className="hidden md:block text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer border-none transition-all"
              style={{
                background: dark ? "#1E293B" : "#FEF2F2",
                color: dark ? "#94A3B8" : "#EF4444"
              }}>
              Đăng xuất
            </button>
          </>
        ) : (
          <Link href="/login"
            className="hidden md:block text-sm font-semibold no-underline px-3 py-2 rounded-xl transition-all"
            style={{ color: dark ? "#94A3B8" : "#475569" }}>
            Đăng nhập
          </Link>
        )}

        {/* CTA */}
        <Link href="/pricing"
          className="text-sm font-bold text-white px-4 py-2.5 rounded-xl no-underline transition-all hover:-translate-y-0.5 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg,#4A90E2,#2563EB)",
            boxShadow: "0 4px 14px rgba(74,144,226,0.35)"
          }}>
          Học miễn phí 7 ngày 🎯
        </Link>
      </div>
    </motion.nav>
  )
}