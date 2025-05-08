# 🎬 Netflix Web Application - Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Architecture**: Clean Architecture (Use Cases, Repositories, DTOs)
- **HTTP Client**: Axios (เชื่อมต่อกับ TMDB API)
- **API Spec**: Swagger (พร้อมใช้งานที่ `/api`)
- **อื่น ๆ**: class-transformer, class-validator

---

## 📁 Folder Structure

```bash
backend/
├── application/        # Use Cases
├── domain/             # Entities และ Interfaces
├── infrastructure/     # External API (TMDB)
├── interfaces/         # Controllers, DTOs, Http Layer
└── main.ts             # Entry point
```

---

## 🚀 Features Implemented

- ✅ GET /movies/popular → รายชื่อภาพยนตร์ยอดนิยม
- ✅ GET /movies/top-rated → ภาพยนตร์คะแนนสูงสุด
- ✅ GET /movies/now-playing → ภาพยนตร์ที่กำลังฉาย
- ✅ GET /movies/trending → ภาพยนตร์ที่เป็นกระแส
- ✅ GET /movies/:id → รายละเอียดของภาพยนตร์ (รวม trailer)

---

## ▶️ Running Locally

```bash
pnpm install
pnpm run start:dev
```

API จะถูกเปิดที่ `http://localhost:3001/api`
