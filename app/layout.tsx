// app/layout.tsx
import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nunito",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin", "vietnamese"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpeakNest – Học tiếng Anh cho người Việt",
  description:
    "Nền tảng học tiếng Anh hiện đại, thân thiện, hiệu quả – được thiết kế đặc biệt cho người Việt. Giao tiếp, IELTS, TOEIC, Business English.",
  keywords: ["học tiếng Anh", "IELTS", "TOEIC", "giao tiếp tiếng Anh", "SpeakNest"],
  openGraph: {
    title: "SpeakNest – Học tiếng Anh cho người Việt",
    description: "Học thông minh, vui vẻ, hiệu quả với lộ trình cá nhân hóa.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${nunito.variable} ${baloo.variable}`}>
      <body className="font-body bg-[#F8FAFF] text-gray-800 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
