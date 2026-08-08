# 📚 สรุปงานโปรเจกต์ ReRead — เว็บไซต์แลกเปลี่ยนหนังสือมือสอง

**ประเภท:** Frontend Only (React + TypeScript + Tailwind CSS + Vite)  
**ที่เก็บไฟล์:** `d:\ReRead\`  
**วิธีรัน:** เปิด Terminal → พิมพ์ `npm run dev` → เปิดเบราว์เซอร์ที่ `http://localhost:5173`

---

## 🎨 แนวคิดการออกแบบ (Design Philosophy)

- **ธีม:** "ร้านหนังสืออิสระยุคใหม่" (Modern Independent Bookshop) — อบอุ่น มินิมอล ไม่เย็นชา
- **ไม่ใช้:** Gradient button, Shadow หนัก, Layout กลางจอทุก Section, Emoji แทนไอคอน
- **ฟอนต์ภาษาไทย:** Mitr (หัวข้อ) + Prompt (เนื้อหา) โหลดจาก Google Fonts
- **ชุดสีหลัก:**
  - พื้นหลัง: `#FAF6F0` (ครีมกระดาษ)
  - Section คั่น: `#EFE7DA` (น้ำตาลอ่อน)
  - ตัวอักษร: `#2B2420` (น้ำตาลเข้ม)
  - Accent: `#7A8B6F` (เขียวมอสหม่น)
  - Warning: `#C97B4A` (ส้มดินเผา)
  - Border: `#DDD3C3` (เส้นบาง 1px)

---

## 📂 โครงสร้างโฟลเดอร์

```
d:\ReRead\
├── public/
│   ├── avatar-mint.png     ← Avatar การ์ตูน "มินต์" (ผู้ใช้ปัจจุบัน)
│   ├── avatar-wanna.png    ← Avatar การ์ตูน "วรรณา ก."
│   ├── avatar-poom.png     ← Avatar การ์ตูน "ภูมิ ส."
│   └── avatar-dao.png      ← Avatar การ์ตูน "ดาว ร."
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← แถบเมนูด้านบน
│   │   │   ├── Footer.tsx      ← ส่วนท้ายของเว็บ
│   │   │   └── RootLayout.tsx  ← โครงสร้างหลัก (ครอบ Navbar + Footer)
│   │   └── BookCard.tsx        ← การ์ดหนังสือพร้อม Signature Tag
│   ├── data/
│   │   ├── mockBooks.ts        ← ข้อมูลหนังสือตัวอย่าง
│   │   └── mockBooksTh.ts      ← ข้อมูลหนังสือเวอร์ชันชื่อไทย
│   ├── pages/
│   │   ├── LandingPage.tsx     ← หน้าแรก
│   │   ├── LoginPage.tsx       ← หน้าเข้าสู่ระบบ
│   │   ├── SignupPage.tsx      ← หน้าสมัครสมาชิก
│   │   ├── BrowsePage.tsx      ← หน้าค้นหาและเลือกหนังสือ
│   │   ├── BookDetailPage.tsx  ← หน้ารายละเอียดหนังสือ
│   │   ├── DashboardPage.tsx   ← แผงควบคุมการแลกเปลี่ยน
│   │   ├── ProfilePage.tsx     ← หน้าโปรไฟล์ผู้ใช้
│   │   ├── AddBookPage.tsx     ← หน้าลงรายการหนังสือ
│   │   ├── MyBooksPage.tsx     ← หน้าหนังสือของฉัน
│   │   ├── WishlistPage.tsx    ← รายการที่บันทึกไว้
│   │   ├── RequestsPage.tsx    ← บอร์ดตามหาหนังสือ
│   │   └── ChatPage.tsx        ← ระบบข้อความ/แชท
│   ├── App.tsx                 ← จุดศูนย์กลาง Routes ทั้งหมด
│   ├── main.tsx                ← Entry point
│   └── index.css               ← Global styles + Tailwind directives
├── tailwind.config.js          ← ตั้งค่าสีและฟอนต์แบบ Custom
├── .vscode/settings.json       ← ปิดคำเตือน CSS ของ VS Code
└── index.html                  ← HTML หลัก
```

---

## 🗺️ หน้าเว็บทั้งหมด (12 หน้า)

### 1. หน้าแรก — `LandingPage.tsx` → `/`
- **Hero Section:** Layout ไม่สมมาตร (Asymmetric) ข้อความฝั่งซ้าย 5 คอลัมน์ / รูปภาพซ้อนกันแบบ Editorial ฝั่งขวา 7 คอลัมน์
- **Trust Signal:** ตัวเลขสถิติผสมลงในประโยคธรรมชาติ (ไม่ใช้ Stat Card ลอย) เช่น "นักอ่านกว่า 12,000 คน" และ "ส่งต่อหนังสือไปแล้วกว่า 45,000 เล่ม"
- **หนังสือแนะนำ:** Grid 4 คอลัมน์ (ใช้ component BookCard)
- **Section วิธีการแลกเปลี่ยน:** 3 ขั้นตอน พร้อมไอคอน Lucide React (ลงรายการ → หาคู่ → แลกและอ่าน)

### 2. เข้าสู่ระบบ — `LoginPage.tsx` → `/login`
- Layout Split ครึ่งจอ: ฟอร์มฝั่งซ้าย / ภาพบรรยากาศร้านหนังสือฝั่งขวา
- ปุ่ม Social Login (Google + GitHub) แบบ Outline ไม่ใช้สีเต็ม
- Inline Error ด้วยสีส้มดินเผา (`warning`)
- ไม่มี Navbar/Footer (Full-screen)

### 3. สมัครสมาชิก — `SignupPage.tsx` → `/signup`
- Layout Split ครึ่งจอ: ฝั่งซ้ายเป็นฟอร์ม / ฝั่งขวาเป็นภาพชั้นหนังสือ (สลับกับ Login)
- ช่อง: ชื่อ-นามสกุล/นามปากกา, อีเมล, รหัสผ่าน
- Inline Validation Error สีส้มดินเผา
- ไม่มี Navbar/Footer (Full-screen)

### 4. ค้นหาหนังสือ — `BrowsePage.tsx` → `/browse`
- Filter Sidebar ฝั่งซ้าย: Checkbox กรองตามหมวดหมู่, สภาพหนังสือ, สถานะ
- Grid หนังสือ: 2 คอลัมน์บนมือถือ, 3-4 คอลัมน์บน Desktop
- Sorting dropdown (เรียงตามมาใหม่ล่าสุด)
- Pagination (Mock)

### 5. รายละเอียดหนังสือ — `BookDetailPage.tsx` → `/book/:id`
- Layout 2 คอลัมน์: Gallery ภาพ + Thumbnail แนวตั้งฝั่งซ้าย / รายละเอียดฝั่งขวา
- **Signature Element:** ป้ายสภาพหนังสือสไตล์ตั๋ว/ป้ายราคา (บอกสภาพ เช่น "สภาพดี") ติดมุมขวาบนของภาพ
- โปรไฟล์เจ้าของหนังสือแบบย่อฝังอยู่ในหน้า (ไม่แยกการ์ดลอย) พร้อมไอคอนที่ตั้งและปุ่มส่งข้อความ
- Tags หมวดหมู่ + สถานะ "หายาก/เลิกพิมพ์" สีส้มดินเผา
- ปุ่ม Sticky ล่างจอบนมือถือ (สำหรับเสนอแลกเปลี่ยน)
- ปุ่มสถานะ: ถ้า "Pending" → แสดงปุ่ม disabled สีส้มพร้อมแจ้งว่า "มีผู้เสนอแลกแล้ว"

### 6. แผงควบคุม — `DashboardPage.tsx` → `/dashboard`
- รายการ Swap ที่กำลังดำเนินอยู่ (คลิก Expand เพื่อดูรายละเอียด)
- **Stepper แนวนอนบางๆ:** แสดง 4 ขั้นตอน (ส่งคำขอ → ตอบรับ → กำลังจัดส่ง → ได้รับหนังสือ) พร้อม Progress Line สีเขียว
- **ข้อมูลบริษัทขนส่ง:** Flash Express ⚡, Kerry 🔴, J&T 🟠, ไปรษณีย์ไทย 📮 พร้อมโลโก้
- **เลขพัสดุ + ปุ่มติดตาม:** กดแล้วเปิดหน้าเว็บบริษัทขนส่งจริงๆ ใน Tab ใหม่
- **รูปหลักฐานการจัดส่ง:** แสดงภาพที่ผู้ส่งถ่ายพร้อมข้อความบันทึก (คล้าย Shopee)
- ปุ่มตามสถานะ: "ยืนยันว่าได้รับหนังสือ" / "อัปโหลดรูปหลักฐาน" / "เขียนรีวิว"

### 7. โปรไฟล์ผู้ใช้ — `ProfilePage.tsx` → `/profile`
- รูป Avatar การ์ตูน "มินต์" + ป้ายแต้มสะสม (120 แต้ม)
- ข้อมูล: ชื่อ, ที่ตั้ง (กรุงเทพ), วันที่เข้าร่วม (ธ.ค. 2568), คะแนนรีวิว 5.0 (12 รีวิว)
- ประวัติย่อจากเจ้าของโปรไฟล์
- 4 Stat: แลกสำเร็จ (12), รอดำเนินการ (2), หนังสือบนชั้น (4), แต้มสะสม (120)
- ตาราง Transaction History: วันที่, ประเภท (ส่งออก/ได้รับ), ชื่อหนังสือ, คู่แลก, สถานะ

### 8. ลงรายการหนังสือ — `AddBookPage.tsx` → `/add-book`
- อัปโหลดรูปปก: Preview ทันที + ปุ่มลบรูป
- กรอกชื่อหนังสือ, ผู้แต่ง
- เลือกสภาพหนังสือ (Radio Button สวยงาม): มือหนึ่ง, เหมือนใหม่, สภาพดี, พอใช้, เก่า/มีตำหนิ
- เลือกหมวดหมู่ (Dropdown)
- Checkbox "หายาก/เลิกพิมพ์"
- บันทึกจากเจ้าของ (Textarea)
- หลังกด Submit → แสดงหน้า Success แล้ว Redirect ไปหน้าหนังสือของฉัน

### 9. หนังสือของฉัน — `MyBooksPage.tsx` → `/my-books`
- แสดงสถิติ: หนังสือทั้งหมด / พร้อมแลก / รอแลกอยู่
- Grid การ์ดหนังสือ + ปุ่มแก้ไข/ลบใต้แต่ละการ์ด
- ปุ่ม "เพิ่มหนังสือ" เชื่อมไปหน้า Add Book

### 10. รายการที่บันทึกไว้ — `WishlistPage.tsx` → `/wishlist`
- List หนังสือที่บันทึก: ภาพปก + ชื่อ/ผู้แต่ง + เจ้าของ
- ปุ่ม "ดูรายละเอียด" เชื่อมไปหน้า Book Detail
- ปุ่มลบออกจาก Wishlist

### 11. บอร์ดตามหาหนังสือ — `RequestsPage.tsx` → `/requests`
- ปุ่ม CTA หลัก: "ตั้งกระทู้ตามหาหนังสือ" (โดดเด่นเพียงปุ่มเดียว)
- รายการกระทู้: ชื่อหนังสือ, ผู้แต่ง, ชื่อผู้ตามหา, วันที่ตั้ง, จำนวนคนเสนอ
- Badge "ยังไม่มีผู้เสนอ" สีส้ม / มีผู้เสนอแล้ว X เล่ม
- Filter sidebar: ล่าสุด / ยังไม่มีคนเสนอ / กระทู้ของฉัน
- Search bar ค้นหาชื่อหนังสือ

### 12. ระบบข้อความ/แชท — `ChatPage.tsx` → `/chat`
- Layout แบบ Messenger: รายการสนทนาฝั่งซ้าย / หน้าต่างแชทฝั่งขวา
- รายการสนทนาแสดง: รูป Avatar, ชื่อผู้ใช้, ชื่อหนังสือที่กำลังเจรจา, ข้อความล่าสุด, Badge แจ้งเตือนยังไม่อ่าน
- ฟองข้อความ: สีเขียว (ฝั่งฉัน) / สีพื้น (อีกฝ่าย)
- **พิมพ์ข้อความได้จริง:** กด Enter หรือปุ่ม Send ข้อความใหม่ขึ้นมาทันที
- Scroll อัตโนมัติลงล่างสุด **เฉพาะภายในกล่องแชท** (ไม่ทำให้หน้าจอหลักไหล)
- ข้อมูล Mock: 3 บทสนทนา กับ วรรณา ก., ภูมิ ส., ดาว ร.

---

## 🧩 Components ที่ใช้ซ้ำ

### `BookCard.tsx`
- การ์ดหนังสือที่ใช้ใน LandingPage, BrowsePage, MyBooksPage, WishlistPage
- **Signature Element:** ป้ายสภาพหนังสือสไตล์ตั๋วห้องสมุด (กรอบเส้นปะ บอก "สภาพ" เช่น "เหมือนใหม่")
- Badge สีส้ม "หายาก/เลิกพิมพ์" และ "รอแลกเปลี่ยน"
- Animation: รูปขยายเล็กน้อยเมื่อ Hover + ลูกศร "ดูรายละเอียด" ปรากฏ

### `Navbar.tsx`
- Logo "ReRead" + BookOpen icon
- เมนูบน: ค้นหาหนังสือ, บอร์ดตามหา, ลงรายการหนังสือ (พร้อม icon), ข้อความ (พร้อม Badge แจ้งเตือน 2)
- **Dropdown User Menu:** คลิกรูป Avatar → แสดงเมนู: โปรไฟล์, แผงควบคุม, หนังสือของฉัน, รายการที่บันทึก, ข้อความ, ออกจากระบบ
- ปิด Dropdown อัตโนมัติเมื่อเอาเมาส์ออก
- Sticky (ติดขอบบนเมื่อ Scroll)

### `Footer.tsx`
- Logo + คำอธิบาย
- ลิงก์แยกเป็น 2 กลุ่ม: สำรวจ / บัญชีผู้ใช้
- ลิงก์นโยบาย + ลิขสิทธิ์

### `RootLayout.tsx`
- ครอบ Navbar + `<Outlet>` (เนื้อหาหน้า) + Footer
- ใช้กับทุกหน้าที่มี Navbar/Footer (ยกเว้น Login และ Signup)

---

## 🗃️ ข้อมูล Mock (ไม่ต้อง API จริง)

### `data/mockBooks.ts`
- หนังสือ 4 เล่ม: The Secret History, Norwegian Wood, Dune, Pride and Prejudice
- แต่ละเล่มมี: id, title, author, coverUrl, condition, description, owner (ชื่อ+avatar), tags, status
- ชื่อเจ้าของเป็นภาษาไทย: วรรณา ก., ภูมิ ส., มินต์, ดาว ร.
- Avatar ของแต่ละคนเป็นรูปการ์ตูนที่ไม่ซ้ำกัน

---

## 🖼️ Avatar การ์ตูน (สร้างด้วย AI Image Generation)

| ชื่อไฟล์ | ตัวละคร | ลักษณะ |
|---|---|---|
| `/avatar-mint.png` | มินต์ (ผู้ใช้ปัจจุบัน) | ผมสั้น Bob ถือแก้วชา สวมเสื้อ Sweater โทนเขียวครีม |
| `/avatar-wanna.png` | วรรณา ก. | ผมยาวตรง ใส่แว่น ถือหนังสือเปิดอ่าน |
| `/avatar-poom.png` | ภูมิ ส. | ผมสั้นหนุ่ม หูฟังรอบคอ สบายๆ โทนส้มดินเผา |
| `/avatar-dao.png` | ดาว ร. | ผมลอนสั้น ใส่เสื้อดอกไม้ ยิ้มอ่อนโยน โทนเขียว-ครีม |

---

## ⚙️ การตั้งค่าโปรเจกต์

### `tailwind.config.js`
- ตั้งค่าสีแบบ Custom: `bg-main`, `bg-secondary`, `text-main`, `accent`, `warning`, `border-main`
- ตั้งค่าฟอนต์: `font-heading` = Mitr, `font-sans` = Prompt

### `src/index.css`
- Import Google Fonts (Mitr + Prompt)
- Tailwind directives (`@tailwind base/components/utilities`)
- Global base styles (body + heading)

### `.vscode/settings.json`
- ปิด `css.validate: false` เพื่อซ่อนคำเตือน `@tailwind` และ `@apply` ใน VS Code (ไม่ใช่ Error จริง)

### `App.tsx`
- กำหนด Routes ทั้งหมดด้วย React Router v6
- Login/Signup → Full-screen (ไม่มี Navbar)
- หน้าอื่น → ครอบด้วย `RootLayout` (มี Navbar + Footer)

---

## 🛠️ Tech Stack ที่ใช้

| เครื่องมือ | เวอร์ชัน | หน้าที่ |
|---|---|---|
| React | 18+ | UI Framework |
| TypeScript | 5+ | Type Safety |
| Vite | 8.x | Build Tool + Dev Server |
| Tailwind CSS | 3.x | Styling (Custom Theme) |
| React Router | 6.x | Client-side Routing |
| Lucide React | Latest | Icon Library (ทดแทน Emoji) |

---

## 🌐 URL ทั้งหมดที่เข้าได้

| URL | หน้า |
|---|---|
| `/` | หน้าแรก |
| `/browse` | ค้นหาหนังสือ |
| `/book/:id` | รายละเอียดหนังสือ |
| `/login` | เข้าสู่ระบบ |
| `/signup` | สมัครสมาชิก |
| `/dashboard` | แผงควบคุมการแลกเปลี่ยน |
| `/profile` | โปรไฟล์ผู้ใช้ |
| `/add-book` | ลงรายการหนังสือ |
| `/my-books` | หนังสือของฉัน |
| `/wishlist` | รายการที่บันทึกไว้ |
| `/requests` | บอร์ดตามหาหนังสือ |
| `/chat` | ระบบข้อความ/แชท |
