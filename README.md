# 🪺 SpeakNest – Học tiếng Anh cho người Việt

> Nền tảng học tiếng Anh hiện đại, thân thiện, hiệu quả – thiết kế đặc biệt cho người Việt.

## 🚀 Cài đặt nhanh (3 bước)

```bash
# 1. Clone / giải nén project
cd speaknest

# 2. Chạy script setup tự động
bash setup.sh

# 3. Start dev server
npm run dev
```
Mở trình duyệt: **http://localhost:3000**

---

## 🗂️ Cấu trúc project

```
speaknest/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout + fonts
│   ├── page.tsx            # Trang chủ
│   ├── courses/page.tsx    # Khóa học
│   ├── vocabulary/page.tsx # Từ vựng + Flashcard
│   ├── pricing/page.tsx    # Bảng giá
│   ├── account/page.tsx    # Dashboard
│   └── blog/page.tsx       # Blog
├── components/
│   ├── ui/                 # Navbar, Footer (dùng chung)
│   ├── home/               # Hero, Features, Testimonials...
│   ├── courses/            # CourseGrid
│   └── vocabulary/         # VocabHome, Flashcard
├── lib/
│   ├── data.ts             # Mock data (thay bằng Supabase)
│   ├── supabase.ts         # Supabase client
│   ├── store/index.ts      # Zustand stores
│   └── utils.ts            # Helper functions
├── types/index.ts          # TypeScript types
├── middleware.ts           # Auth protection
└── .env.local              # Environment variables
```

## 🛠️ Tech stack

| Tool | Dùng để |
|------|---------|
| Next.js 15 | Framework chính |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Auth + Database |
| Zustand | State management |

## ⚙️ Biến môi trường

Điền vào `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## 📦 Deploy lên Vercel

```bash
npm install -g vercel
vercel --prod
```

---
Made with ❤️ by **Huy** – SpeakNest 2025
