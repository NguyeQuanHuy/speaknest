#!/bin/bash
# ============================================================
# SpeakNest – Script cài đặt tự động
# Chạy: bash setup.sh
# ============================================================

set -e
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🪺  SpeakNest – Đang cài đặt...${NC}\n"

# 1. Node check
if ! command -v node &> /dev/null; then
  echo "❌ Cần cài Node.js 18+ từ https://nodejs.org"
  exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# 2. Install dependencies
echo -e "\n📦 Đang cài packages...\n"
npm install

# 3. .env.local check
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local 2>/dev/null || true
  echo -e "\n⚠️  Tạo file .env.local – nhớ điền Supabase keys!"
fi

echo -e "\n${GREEN}🎉 Xong! Chạy lệnh sau để start:${NC}"
echo -e "${BLUE}  npm run dev${NC}"
echo -e "\n🌐 Mở trình duyệt: http://localhost:3000\n"
