# ReRead Backend API

REST API สำหรับเว็บแลกเปลี่ยนหนังสือมือสอง **ReRead** — สร้างด้วย FastAPI + PostgreSQL

## Tech Stack

- **FastAPI** — Web framework
- **SQLAlchemy 2.0** (async) — ORM
- **Alembic** — Database migrations
- **PostgreSQL 16** — Database (Docker container)
- **JWT** (`python-jose`) — Authentication
- **Pydantic v2** — Validation & serialization

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

## Stopping

```bash
docker compose down          # หยุด containers
docker compose down -v       # หยุด + ลบ volume (ลบ DB data)
```