# 📚 ReRead — เว็บไซต์แลกเปลี่ยนหนังสือมือสอง

> โปรเจกต์นี้เป็น Frontend-Only Web Application สำหรับแพลตฟอร์มแลกเปลี่ยนหนังสือมือสอง  
> พัฒนาด้วย React + TypeScript + Tailwind CSS ออกแบบในธีม "ร้านหนังสืออิสระยุคใหม่"

---

## 🖼️ ภาพรวมโปรเจกต์

ReRead เป็นแพลตฟอร์ม Frontend สำหรับนักอ่านที่ต้องการส่งต่อหนังสือที่อ่านจบแล้ว และค้นหาหนังสือใหม่จากชุมชนนักอ่านด้วยกัน ระบบรองรับฟีเจอร์ทั้งหมดในรูปแบบ Mock Data (ไม่ต้องต่อ Backend จริง)

### ฟีเจอร์หลัก
- 🔍 ค้นหาและกรองหนังสือ (Browse & Filter)
- 📖 ดูรายละเอียดหนังสือแบบ Editorial Layout
- 💬 ระบบแชทสำหรับเจรจาก่อนแลกเปลี่ยน
- 📦 ติดตามสถานะพัสดุในแผงควบคุม (Dashboard)
- 🏷️ ลงรายการหนังสือพร้อมระบุสภาพ
- 🌟 ระบบแต้มสะสมและโปรไฟล์ผู้ใช้
- 📋 บอร์ดตามหาหนังสือที่ต้องการ

---

## 🛠️ Tech Stack

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| [React](https://react.dev/) | 18+ | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Type Safety |
| [Vite](https://vitejs.dev/) | 8.x | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Styling (Custom Theme) |
| [React Router](https://reactrouter.com/) | 6.x | Client-side Routing |
| [Lucide React](https://lucide.dev/) | Latest | Icon Library |

---

## ✅ สิ่งที่ต้องติดตั้งก่อน (Prerequisites)

ก่อนรันโปรเจกต์ ให้ตรวจสอบว่าเครื่องมีสิ่งต่อไปนี้ติดตั้งแล้ว:

1. **Node.js** เวอร์ชัน 18 ขึ้นไป  
   ตรวจสอบด้วยคำสั่ง: `node -v`  
   ดาวน์โหลดได้ที่: https://nodejs.org/

2. **npm** (มาพร้อมกับ Node.js)  
   ตรวจสอบด้วยคำสั่ง: `npm -v`

> **หมายเหตุ:** ไม่ต้องติดตั้ง Database หรือ Backend ใดๆ เพิ่มเติม

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์

### ขั้นตอนที่ 1: Clone Repository จาก GitHub

```bash
git clone https://github.com/<ชื่อ-github-ของคุณ>/reread.git
```

หรือดาวน์โหลดเป็น ZIP แล้วแตกไฟล์

### ขั้นตอนที่ 2: เข้าไปในโฟลเดอร์โปรเจกต์

```bash
cd reread
```

### ขั้นตอนที่ 3: ติดตั้ง Dependencies

```bash
npm install
```

> รอสักครู่ จนกว่าจะขึ้นว่า `added X packages`

### ขั้นตอนที่ 4: รัน Development Server

```bash
npm run dev
```

จะเห็นข้อความประมาณนี้:

```
  VITE v8.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
```

### ขั้นตอนที่ 5: เปิดเบราว์เซอร์

เปิด **http://localhost:5173** เว็บจะแสดงขึ้นมาทันที ✅

> **หยุดเซิร์ฟเวอร์:** กด `Ctrl + C` ใน Terminal

---

## 📄 หน้าเว็บทั้งหมด

| URL | ชื่อหน้า | คำอธิบาย |
|---|---|---|
| `/` | หน้าแรก (Landing) | Hero Section + หนังสือแนะนำ + วิธีการแลกเปลี่ยน |
| `/browse` | ค้นหาหนังสือ | Grid หนังสือ + Filter Sidebar (หมวดหมู่, สภาพ, สถานะ) |
| `/book/:id` | รายละเอียดหนังสือ | Gallery + ข้อมูลครบ + ปุ่มเสนอแลกเปลี่ยน |
| `/login` | เข้าสู่ระบบ | ฟอร์ม Login แบบ Split Layout |
| `/signup` | สมัครสมาชิก | ฟอร์ม Register พร้อม Validation |
| `/dashboard` | แผงควบคุม | ติดตาม Swap + ข้อมูลขนส่ง + รูปหลักฐาน |
| `/profile` | โปรไฟล์ผู้ใช้ | ข้อมูลส่วนตัว + สถิติ + ประวัติการแลกเปลี่ยน |
| `/add-book` | ลงรายการหนังสือ | ฟอร์มเพิ่มหนังสือ + อัปโหลดรูปปก |
| `/my-books` | หนังสือของฉัน | จัดการหนังสือที่ลงไว้ |
| `/wishlist` | รายการที่บันทึก | หนังสือที่กดใจไว้ |
| `/requests` | บอร์ดตามหาหนังสือ | ตั้งกระทู้ตามหาหนังสือที่ต้องการ |
| `/chat` | ระบบข้อความ | แชทกับเจ้าของหนังสือก่อนแลกเปลี่ยน |

---

## 📁 โครงสร้างโฟลเดอร์

```
reread/
├── public/
│   ├── avatar-mint.png      ← Avatar การ์ตูน "มินต์"
│   ├── avatar-wanna.png     ← Avatar การ์ตูน "วรรณา ก."
│   ├── avatar-poom.png      ← Avatar การ์ตูน "ภูมิ ส."
│   └── avatar-dao.png       ← Avatar การ์ตูน "ดาว ร."
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       ← Navbar + Dropdown เมนูสมาชิก
│   │   │   ├── Footer.tsx       ← Footer
│   │   │   └── RootLayout.tsx   ← Layout ครอบทุกหน้า
│   │   └── BookCard.tsx         ← การ์ดหนังสือ (Reusable)
│   ├── data/
│   │   └── mockBooks.ts         ← ข้อมูลหนังสือตัวอย่าง (Mock Data)
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── BrowsePage.tsx
│   │   ├── BookDetailPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── AddBookPage.tsx
│   │   ├── MyBooksPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── RequestsPage.tsx
│   │   └── ChatPage.tsx
│   ├── App.tsx                  ← กำหนด Routes ทั้งหมด
│   ├── main.tsx                 ← Entry point
│   └── index.css                ← Global styles + Tailwind
├── tailwind.config.js           ← Custom Theme (สี + ฟอนต์)
├── .vscode/settings.json        ← ปิดคำเตือน CSS ของ VS Code
└── package.json
```

---

## 🎨 Design System

### ชุดสี (Color Palette)
| ชื่อ | Hex | การใช้งาน |
|---|---|---|
| `bg-main` | `#FAF6F0` | พื้นหลังหลัก |
| `bg-secondary` | `#EFE7DA` | Section คั่น / พื้นหลังรอง |
| `text-main` | `#2B2420` | ตัวอักษรทั่วไป |
| `accent` | `#7A8B6F` | ปุ่มหลัก / ลิงก์ / สถานะสำเร็จ |
| `warning` | `#C97B4A` | Badge สถานะรอ / Error / แท็กหายาก |
| `border-main` | `#DDD3C3` | เส้นขอบทุกอย่าง (1px) |

### ฟอนต์
- **หัวข้อ:** [Mitr](https://fonts.google.com/specimen/Mitr) — น้ำหนัก 400, 500, 600
- **เนื้อหา:** [Prompt](https://fonts.google.com/specimen/Prompt) — น้ำหนัก 300, 400, 500

---

## 📝 หมายเหตุสำหรับผู้ใช้งาน

- **ข้อมูลทั้งหมดเป็น Mock Data** — ไม่มีการบันทึกข้อมูลจริง รีเฟรชหน้าแล้วข้อมูลจะกลับไปเป็นค่าเริ่มต้น
- **ผู้ใช้จำลอง:** ระบบแสดงผลในฐานะสมาชิกชื่อ "มินต์" เสมอ
- **การแชท:** สามารถพิมพ์ข้อความได้จริงในหน้า `/chat` แต่ไม่มีการส่งข้อความจริง
- **การอัปโหลดรูป:** ในหน้า `/add-book` สามารถเลือกรูปได้ แต่ไม่มีการบันทึกไฟล์จริง
- **คำเตือนใน VS Code:** หากเห็นเส้นเหลืองใต้ `@tailwind` หรือ `@apply` ในไฟล์ CSS ไม่ต้องกังวล — เป็นแค่ VS Code ไม่รู้จัก Tailwind syntax แต่เว็บรันได้ปกติ

---

## 👩‍💻 ผู้พัฒนา

**ชื่อ:** [67160383 อภิสรา คล้ายบุรี, 67160244 นางสาวเอมิกา อยู่พันธ์]  
**รายวิชา:** [89033167 Web Application Development]  