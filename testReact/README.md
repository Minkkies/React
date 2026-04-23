# testReact

โปรเจกต์นี้เป็นตัวอย่าง React สำหรับฝึกพื้นฐานการทำงานร่วมกับ
- Component
- Props
- Hooks
- Routing
- API Request
- CRUD เบื้องต้น

---

## ฟีเจอร์หลัก

- หน้าเริ่มต้นของแอป
- หน้าแสดงรายการ ToDo
- หน้าแก้ไข ToDo ตาม `id`
- ลบรายการ ToDo ได้
- ใช้ React Router DOM สำหรับเปลี่ยนหน้า
- ใช้ axios เรียกข้อมูลจาก Mock API

---

## เทคโนโลยีที่ใช้

- React
- Vite
- React Router DOM
- Axios

---

## โครงสร้างไฟล์หลัก

```bash
src/
  App.jsx
  main.jsx
  router.jsx
  edit.jsx
  todolist.jsx
  assets/
  components/
```

---

## หน้าที่ของแต่ละไฟล์

### `main.jsx`
ไฟล์เริ่มต้นของโปรเจกต์ ใช้สร้าง router หลักและกำหนดเส้นทางของหน้าเว็บ

### `router.jsx`
หน้าแสดงรายการ ToDo พร้อมปุ่มแก้ไขและลบ

### `edit.jsx`
หน้าแก้ไขข้อมูล ToDo ตาม `id` ที่รับมาจาก URL

### `todolist.jsx`
หน้ารายการ ToDo อีกหน้าหนึ่งของโปรเจกต์

### `App.jsx`
หน้าเริ่มต้นของแอป

---

## การติดตั้งและรันโปรเจกต์

### ติดตั้ง dependencies
```bash
npm install
```

### รันโปรเจกต์
```bash
npm run dev
```

### เปิดดูในเบราว์เซอร์
```bash
http://localhost:5173
```