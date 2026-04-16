import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { DarkModeProvider } from "@/components/ui/DarkModeProvider";

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
  description: "Nền tảng học tiếng Anh hiện đại, thân thiện, hiệu quả – được thiết kế đặc biệt cho người Việt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${nunito.variable} ${baloo.variable}`}>
      <body className="font-body antialiased transition-colors duration-300">
        <DarkModeProvider>
          <Navbar />
          <main>{children}</main>
        </DarkModeProvider>
      </body>
    </html>
  );
}