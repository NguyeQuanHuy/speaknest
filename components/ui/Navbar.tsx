"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
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
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
      <Link href="/" className="flex items-center gap-2 font-head text-xl font-extrabold text-sky-dark no-underline">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
             style={{ background: "linear-gradient(135deg, #4A90E2, #FF7043)" }}>
          🪺
        </div>
        SpeakNest
      </Link>

      <div className="hidden md:flex gap-1">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}
            className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all no-underline",
              pathname === link.href ? "bg-[#EBF4FF] text-[#2563EB]" : "text-gray-600 hover:bg-[#EBF4FF] hover:text-[#2563EB]")}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/account"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#2563EB] transition-colors no-underline">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #4A90E2, #FF7043)" }}>
                {user.user_metadata?.full_name?.[0] ?? user.email?.[0].toUpperCase()}
              </div>
              {user.user_metadata?.full_name?.split(" ").pop() ?? "Tài khoản"}
            </Link>
            <button onClick={handleLogout}
              className="hidden md:block text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer">
              Đăng xuất
            </button>
          </>
        ) : (
          <Link href="/login" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-[#2563EB] transition-colors no-underline">
            Đăng nhập
          </Link>
        )}
        <Link href="/pricing"
          className="text-sm font-bold text-white px-5 py-2.5 rounded-xl no-underline transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #4A90E2, #2563EB)", boxShadow: "0 4px 14px rgba(74,144,226,0.35)" }}>
          Học miễn phí 7 ngày 🎯
        </Link>
      </div>
    </motion.nav>
  )
}