# 🎬 Netflix Web Application - Frontend

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query v5
- **Localization (i18n)**: next-intl
- **Architecture**: Clean Architecture (แบ่ง `domain`, `application`, `infrastructure`, `presentation`, `ui`)
- **Video Player**: video.js (YouTube embed)

## 📁 Project Structure

```
src/
├── app/                  # Entry point, routing, layout, locale
│   └── [locale]/         # Localization-aware routing
│   └── layout.tsx        # NextIntlProvider, Topbar, Providers
│   └── middleware.ts     # Next-Intl middleware
│
├── domain/               # Entity และ Repository interface
│   ├── entities/
│   ├── repositories/
│
├── application/          # UseCases สำหรับ mapping ข้อมูล
│   └── useCases/
│
├── infrastructure/       # data fetching, query functions
│   ├── http/
│   ├── query/
│   ├── services/
│
├── presentation/         # UI logic: hooks, providers, utils
│   ├── hooks/
│   ├── providers/
│
├── ui/                   # Pure UI Components + Layout
│   ├── components/
│   └── layouts/
│
├── screens/              # Per-page composition (e.g. homepage)
│   └── home/
│
├── messages/             # JSON translation messages
│   ├── en-US.json
│   └── th-TH.json
```

## ✨ Features Implemented

- ✅ Home page

  - Top Trailer section (autoplay video, one video at a time)
  - Recommended Movies
  - Now Playing
  - Top 10 in Thailand

- ✅ Hover Preview

  - MovieHoverCard ปรากฏเมื่อ mouseover
  - รองรับ interaction แบบ Netflix จริง

- ✅ Localization Support

  - `/en`, `/th` switch ได้สมบูรณ์
  - ค่า language ถูกแนบใน API call

- ✅ Global Video Context

  - เปิดได้ทีละ video เดียว
  - ระบบ mute/unmute ที่ track ต่อ videoId

- ✅ Clean Architecture
  - useCases ↔ repository ↔ query layer
  - มี separation ที่ชัดเจนระหว่าง layer

## 📦 Installation & Run

```bash
# Install dependencies
npm install

# Dev mode
npm run dev

# Build production
npm run build && npm start
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🗣 Languages Supported

- 🇺🇸 English (en-US)
- 🇹🇭 Thai (th-TH)
