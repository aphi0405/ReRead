# ReRead Backend API

REST API สำหรับเว็บแลกเปลี่ยนหนังสือมือสอง **ReRead** — สร้างด้วย FastAPI + PostgreSQL

> **สถานะล่าสุด (19 ก.ย. 2569):** Auth, Users และ Books ใช้งานได้จริงบน PostgreSQL 16 ·
> Book Requests ยังมีข้อบกพร่อง (HTTP 500) · เทสต์ยังรันไม่ผ่าน · ยังไม่มี API สำหรับ Swap / Chat / Wishlist / Review
> ดูสรุปความคืบหน้าและ % ทั้งโปรเจกต์ที่ [README หลัก](../README.md)

## Tech Stack

- **FastAPI** — Web framework
- **SQLAlchemy 2.0** (async) — ORM
- **Alembic** — Database migrations
- **PostgreSQL 16** — Database (Docker container)
- **JWT** (`python-jose`) — Authentication
- **Pydantic v2** — Validation & serialization
- **Python 3.11** (Docker image) · **pytest** — Testing

## Quick Start

### 1. Copy environment file

```bash
cp .env.example .env
# แก้ JWT_SECRET เป็นค่าสุ่มจริงๆ สำหรับ production
```

### 2. Run with Docker Compose

```bash
# จาก root ของ repo (ที่มี docker-compose.yml)
docker compose up --build
```

ระบบจะ:
- สร้าง PostgreSQL container (`db`) พร้อม persistent volume
- สร้าง FastAPI container (`api`) ที่ port 8000 พร้อม hot-reload

### 3. Run database migration

```bash
# เปิด terminal ใหม่ แล้วรัน migration ใน container
docker compose exec api alembic upgrade head
```

### 4. Open Swagger UI

เปิดเบราว์เซอร์ไปที่:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health check**: [http://localhost:8000/health](http://localhost:8000/health)

## API Endpoints

### Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/register` | ❌ | สมัครสมาชิก |
| POST | `/api/login` | ❌ | เข้าสู่ระบบ → JWT token |
| POST | `/api/logout` | ✅ | ออกจากระบบ (stateless) |
| POST | `/api/change-password` | ✅ | เปลี่ยนรหัสผ่าน |

### User Management

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/me` | ✅ | ดึงข้อมูลตัวเอง |
| GET | `/api/users` | ❌ | รายชื่อ user (pagination) |
| GET | `/api/users/{id}` | ❌ | ดึง user ตาม ID |
| PUT | `/api/users/{id}` | ✅ | แก้ไขโปรไฟล์ (เฉพาะตัวเอง) |
| DELETE | `/api/users/{id}` | ✅ | ลบบัญชี (เฉพาะตัวเอง) |
| GET | `/api/check-username/{name}` | ❌ | เช็ค username ว่าง? |

### Books

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/books` | ❌ | ดูรายการหนังสือ (มี Pagination & Search) |
| GET | `/api/books/me` | ✅ | ดูรายการหนังสือของฉัน |
| GET | `/api/books/{id}` | ❌ | ดูรายละเอียดหนังสือ |
| POST | `/api/books` | ✅ | เพิ่มหนังสือใหม่ |
| PUT | `/api/books/{id}` | ✅ | แก้ไขข้อมูลหนังสือ (เฉพาะของตัวเอง) |
| DELETE | `/api/books/{id}` | ✅ | ลบหนังสือ (เฉพาะของตัวเอง) |

### Book Requests

> ⚠️ **ข้อบกพร่องที่ทราบ:** `GET /api/requests` และ `POST /api/requests` ตอบ HTTP 500 เพราะ `BookRequestOwner` (`app/schemas/book_request.py`) ไม่ได้ตั้ง `from_attributes=True` ส่วน `DELETE` ยังไม่ได้ทดสอบกรณีลบสำเร็จ

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/requests` | ❌/✅ | ดูบอร์ดตามหาหนังสือ (`mine=true` ต้อง Auth) |
| POST | `/api/requests` | ✅ | สร้างคำขอตามหาหนังสือ |
| DELETE | `/api/requests/{id}` | ✅ | ลบคำขอ (เฉพาะของตัวเอง) |

## Project Structure

```
backend/
├── alembic/              # Database migrations
│   ├── versions/
│   └── env.py
├── app/
│   ├── core/             # Config, security, dependencies
│   ├── crud/             # Database operations
│   ├── db/               # Engine & session
│   ├── models/           # SQLAlchemy models
│   ├── routers/          # API route handlers
│   ├── schemas/          # Pydantic schemas
│   ├── seed_books.py     # สคริปต์ใส่ข้อมูลตัวอย่าง (48 เล่ม)
│   └── main.py           # FastAPI app
├── tests/                # Pytest tests
├── Dockerfile
├── alembic.ini
└── requirements.txt
```

## Testing

```bash
# รันใน container
docker compose exec api pytest tests/ -v
```

> ⚠️ **สถานะปัจจุบัน:** เทสต์ทั้ง 25 ข้อ (`test_auth.py` 13, `test_users.py` 12) **error ตอน setup**
> เพราะ `Book.tags` ใช้ชนิด `ARRAY` ของ PostgreSQL แต่ `tests/conftest.py` ใช้ SQLite ในหน่วยความจำ ซึ่งไม่รองรับชนิดนี้
> จึงยังวัด coverage จริงไม่ได้ และยังไม่มีเทสต์ของ Books / Book Requests
> (แนวทางแก้: ใช้ PostgreSQL สำหรับเทสต์ หรือเปลี่ยนชนิดของ `tags` ให้ใช้ได้ทั้งสองฐานข้อมูล)

## Seed ข้อมูลตัวอย่าง

```bash
docker compose exec api python -m app.seed_books
```

## ข้อจำกัดที่ทราบ

- `condition` ของหนังสือรับค่าอะไรก็ได้ ยังไม่มี validator จำกัดค่า
- `cover_url` เป็นสตริง URL ยังไม่มีระบบอัปโหลดไฟล์
- ไม่มี logging และ rate limit
- `JWT_SECRET` ค่าเริ่มต้นใน `.env.example` ต้องเปลี่ยนก่อนใช้งานจริง
- `docker-compose.yml` เป็นแบบ dev (`--reload` + bind mount) ยังไม่มีการตั้งค่า production

## Stopping

```bash
docker compose down          # หยุด containers
docker compose down -v       # หยุด + ลบ volume (ลบ DB data)
```