# React Learning Notes - testReact
## ภาพรวมโปรเจกต์

โปรเจกต์นี้แบ่งหน้าออกเป็นหลายส่วน:

- `App.jsx` → หน้าเริ่มต้น
- `todolist.jsx` → หน้าแสดงรายการ ToDo
- `router.jsx` → หน้าทดลองใช้ routing และการดึงข้อมูล
- `edit.jsx` → หน้าแก้ไข ToDo ตาม `id` ใน URL
- `main.jsx` → จุดเริ่มต้นของ routing ทั้งโปรเจกต์

---

## 1) `main.jsx` — Routing หลักของโปรเจกต์

### ทฤษฎีที่ใช้
- `createBrowserRouter`
- `RouterProvider`
- `NavLink`
- `Outlet`
- `StrictMode`

### หน้าที่
ไฟล์นี้เป็นไฟล์เริ่มต้นของแอป และกำหนดเส้นทางของแต่ละหน้า

### แนวคิดสำคัญ
- `NavLink` ใช้ทำเมนูที่รู้ว่า active อยู่หน้าไหน
- `Outlet` ใช้แสดง component ลูกตาม route
- `children` ใช้กำหนดหน้าที่อยู่ใต้ layout หลัก

### Route ที่มีในโปรเจกต์นี้
- `/` → `App`
- `/todolist` → `TodoListPage`
- `/todo` → `RouterPage`
- `/todo/:id` → `Edit`

---

## 2) `router.jsx` — หน้าแสดงรายการ ToDo

### ทฤษฎีที่ใช้
- `useState`
- `useEffect`
- `axios`
- `Link`

### หน้าที่
- ดึงข้อมูล ToDo จาก API
- แสดงรายการทั้งหมด
- ลบรายการได้
- กดไปหน้าแก้ไขได้

### ตัวแปร state
```jsx
const [todos, setTodos] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

### ความหมาย
- `todos` = ข้อมูลรายการทั้งหมด
- `isLoading` = สถานะตอนกำลังโหลดข้อมูล

### การทำงาน
- `useEffect()` เรียก `fetchTodos()` ตอนหน้าโหลด
- `fetchTodos()` ใช้ `axios.get()` ดึงข้อมูลจาก API
- `deleteTodo(id)` ใช้ `axios.delete()` ลบข้อมูล

### ตัวอย่างแนวคิด
```jsx
useEffect(() => {
  fetchTodos();
}, []);
```

---

## 3) `edit.jsx` — หน้าแก้ไขข้อมูล ToDo

### ทฤษฎีที่ใช้
- `useParams`
- `useState`
- `useEffect`
- `axios`
- Event handling

### หน้าที่
- อ่าน `id` จาก URL
- ดึงข้อมูล ToDo รายการนั้น
- แก้ไขชื่อแล้วส่งกลับไปที่ API

### ตัวอย่าง `useParams`
```jsx
const { id } = useParams();
```

### ความหมาย
ถ้า URL เป็น `/todo/3`  
`id` จะมีค่าเป็น `3`

### แนวคิดที่ใช้
- `useEffect()` ดึงข้อมูลตอนเปิดหน้า
- `handleNameChange()` ใช้รับค่าจาก input
- `updateName()` ใช้ `axios.put()` เพื่ออัปเดตข้อมูล

---

## 4) Hooks ที่ใช้ในโปรเจกต์นี้

### `useState`
ใช้เก็บค่าที่เปลี่ยนได้ เช่น
- รายการ ToDo
- ค่า input
- สถานะ loading

### `useEffect`
ใช้ทำงานหลังจาก component render เช่น
- ดึงข้อมูลจาก API
- โหลดข้อมูลครั้งแรก

### `useParams`
ใช้ดึงค่าจาก URL เช่น `id`

### `useNavigate`
ถ้าใช้ในอนาคต จะช่วยเปลี่ยนหน้าแบบ programmatic ได้

### `useContext`
ยังไม่ได้ใช้ในโปรเจกต์นี้ แต่ใช้สำหรับแชร์ข้อมูลระหว่าง component

---

## 5) การใช้ API ในโปรเจกต์นี้

ใช้ `axios` ติดต่อกับ Mock API

### GET
```jsx
axios.get(`${baseUrl}/todos`);
```

### DELETE
```jsx
axios.delete(`${baseUrl}/todos/${id}`);
```

### PUT
```jsx
axios.put(`${baseUrl}/todos/${id}`, {
  name: todos.name,
});
```
---
## 6) Flow การทำงานของโปรเจกต์

1. เปิดแอปที่ `main.jsx`
2. Router เลือกหน้าตาม URL
3. หน้า `router.jsx` ดึงรายการ ToDo มาแสดง
4. กด Edit → ไปหน้า `edit.jsx`
5. หน้า `edit.jsx` ดึงข้อมูลตาม `id`
6. แก้ไขแล้วกดบันทึก → ส่งข้อมูลกลับ API