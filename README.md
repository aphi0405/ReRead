# 📚 ReRead — เว็บไซต์แลกเปลี่ยนหนังสือมือสอง

> แพลตฟอร์มแลกเปลี่ยนหนังสือมือสอง พัฒนาด้วย React (Frontend) และ FastAPI (Backend) พร้อมระบบฐานข้อมูล PostgreSQL
> ออกแบบในธีม "ร้านหนังสืออิสระยุคใหม่"

---

## 🖼️ ภาพรวมโปรเจกต์

ReRead เป็นแพลตฟอร์มสำหรับนักอ่านที่ต้องการส่งต่อหนังสือที่อ่านจบแล้ว และค้นหาหนังสือใหม่จากชุมชนนักอ่านด้วยกัน
- **ระบบสมาชิก (Auth):** ใช้งานได้จริง 100% (สมัครสมาชิก, ล็อกอิน, ดูโปรไฟล์) ผ่าน FastAPI และ PostgreSQL
- **ระบบหนังสือ:** ปัจจุบันรองรับฟีเจอร์ในรูปแบบ Mock Data สำหรับส่วนของการค้นหาและหน้าข้อมูลหนังสือ

### ฟีเจอร์หลัก
- 🔐 ระบบสมาชิกเต็มรูปแบบ (JWT Authentication)
- 🔍 ค้นหาและกรองหนังสือ (Browse & Filter)
- 📖 ดูรายละเอียดหนังสือแบบ Editorial Layout
- 💬 ระบบแชทสำหรับเจรจาก่อนแลกเปลี่ยน
- 📦 ติดตามสถานะพัสดุในแผงควบคุม (Dashboard)
- 🏷️ ลงรายการหนังสือพร้อมระบุสภาพ
- 📋 บอร์ดตามหาหนังสือที่ต้องการ

---

## 🛠️ Tech Stack

### Frontend
| เทคโนโลยี | วัตถุประสงค์ |
|---|---|
| [React 18+](https://react.dev/) | UI Framework |
| [TypeScript 5+](https://www.typescriptlang.org/) | Type Safety |
| [Vite 8.x](https://vitejs.dev/) | Build Tool & Dev Server |
| [Tailwind CSS 3.x](https://tailwindcss.com/) | Styling (Custom Theme) |
| [React Router 6.x](https://reactrouter.com/) | Client-side Routing |

### Backend & Database
| เทคโนโลยี | วัตถุประสงค์ |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | REST API Framework |
| [PostgreSQL 16](https://www.postgresql.org/) | Relational Database |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org/) | ORM & Async Database Query |
| [Alembic](https://alembic.sqlalchemy.org/) | Database Migrations |
| [Docker](https://www.docker.com/) | Containerization |

---

## ✅ สิ่งที่ต้องติดตั้งก่อน (Prerequisites)

1. **Node.js** เวอร์ชัน 18 ขึ้นไป (สำหรับการรัน Frontend)
2. **Docker Desktop** (สำหรับการรัน Backend และ Database)

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์

### ขั้นตอนที่ 1: เตรียมความพร้อม
```bash
git clone https://github.com/aphi0405/ReRead.git
cd ReRead
```

### ขั้นตอนที่ 2: ตั้งค่า Environment Variables
ก็อปปี้ไฟล์ `.env.example` เป็น `.env`
```bash
cp .env.example .env
```
*(ถ้าใช้ Windows PowerShell ให้ใช้คำสั่ง `Copy-Item .env.example .env`)*

### ขั้นตอนที่ 3: รัน Backend & Database (ผ่าน Docker)
เปิด Docker Desktop ให้พร้อม แล้วรันคำสั่ง:
```bash
docker compose up --build -d
```
จากนั้น รัน Migration เพื่อสร้างตารางในฐานข้อมูล:
```bash
docker compose exec api alembic upgrade head
```
> API จะรันอยู่ที่: **http://localhost:8000** (ดูคู่มือ API ได้ที่ http://localhost:8000/docs)

### ขั้นตอนที่ 4: รัน Frontend
เปิด Terminal หน้าต่างใหม่ แล้วติดตั้ง Dependencies ของ React:
```bash
npm install
```
รัน Development Server:
```bash
npm run dev
```
> เว็บไซต์จะรันอยู่ที่: **http://localhost:5173**

---

## 📝 หมายเหตุสำหรับผู้ใช้งาน

- **ส่วนที่เชื่อมต่อฐานข้อมูลจริง:** ระบบ Auth (ลงทะเบียน, เข้าสู่ระบบ, โปรไฟล์)
- **ส่วนที่เป็น Mock Data:** รายการหนังสือ, ประวัติการแลกเปลี่ยน, และระบบแชท

---

## 👩‍💻 ผู้พัฒนา

**ชื่อ:** 67160383 อภิสรา คล้ายบุรี, 67160244 นางสาวเอมิกา อยู่พันธ์  
**รายวิชา:** 89033167 Web Application Development