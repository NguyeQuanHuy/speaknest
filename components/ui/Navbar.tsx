"use client";
// components/ui/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/courses", label: "Khóa học" },
  { href: "/vocabulary", label: "Từ vựng" },
  { href: "/pricing", label: "Bảng giá" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-head text-xl font-extrabold text-sky-dark no-underline">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
             style={{ background: "linear-gradient(135deg, #4A90E2, #FF7043)" }}>
          🪺
        </div>
        SpeakNest
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold transition-all no-underline",
              pathname === link.href
                ? "bg-sky-light text-sky-dark"
                : "text-gray-600 hover:bg-sky-light hover:text-sky-dark"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link href="/account" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-sky-dark transition-colors no-underline">
          Đăng nhập
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-bold text-white px-5 py-2.5 rounded-xl no-underline transition-all hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #4A90E2, #2563EB)",
            boxShadow: "0 4px 14px rgba(74,144,226,0.35)",
          }}
        >
          Học miễn phí 7 ngày 🎯
        </Link>
      </div>
    </motion.nav>
  );
}
