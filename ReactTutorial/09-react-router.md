# React Router DOM (Navigation)

## ติดตั้ง React Router

```bash
npm install react-router-dom
```

## ตัวอย่างจากโปรเจกต์ `router.jsx`

ไฟล์นี้เป็นตัวอย่างของการใช้ React Router ร่วมกับ `useState`, `useEffect`, `axios` และ `Link` เพื่อแสดงรายการ ToDo จาก API และไปหน้าแก้ไขได้

```jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "https://69e8971f55d62f3479796cd3.mockapi.io";

export default function Router() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /* ใช้ async/await เพื่อจัดการกับการเรียก API
    เมื่อเรียก fetchTodos จะทำการส่งคำขอ GET ไปยัง API และอัปเดต state ด้วยข้อมูลที่ได้รับมา
    async คือการประกาศฟังก์ชันที่ทำงานแบบอะซิงโครนัส และ await ใช้เพื่อรอผลลัพธ์จากคำขอ API ก่อนที่จะดำเนินการต่อไป
    อะซิงโครนัส คือการทำงานที่ไม่ต้องรอให้คำสั่งก่อนหน้าทำงานเสร็จสมบูรณ์ก่อนที่จะเริ่มคำสั่งถัดไป */

  // ฟังก์ชันสำหรับดึงข้อมูล ToDo จาก API
  async function fetchTodos() {
    try {
      setErrorMessage("");
      const response = await axios.get(`${baseUrl}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setErrorMessage("ไม่สามารถโหลดข้อมูล ToDo ได้");
    } finally {
      setIsLoading(false);
    }
  }

  // ฟังก์ชันสำหรับลบuser โดยใช้ ID
  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${baseUrl}/todos/${id}`);
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      setErrorMessage("ลบรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTasks = todos.filter((todo) => todo.status).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "2rem" }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h1 className="text-center text-primary mb-2">Router User List</h1>
                <p className="text-center text-muted mb-4">รายการผู้ใช้จาก API พร้อมจัดการแก้ไขและลบ</p>

                <div className="row text-center mb-4">
                  <div className="list-group">
                    <div style={{ background: "rgba(13, 110, 253, 0.1)", borderRadius: "8px", padding: "1rem" }}>
                      <h3 className="text-primary mb-0">{todos.length}</h3>
                      <small className="text-muted">ผู้ใช้ทั้งหมด</small>
                    </div>
                  </div>
                </div>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {isLoading ? (
                  <div className="text-center text-muted py-5">Loading...</div>
                ) : todos.length === 0 ? (
                  <div className="text-center text-muted py-5">ยังไม่มีข้อมูลผู้ใช้จาก API</div>
                ) : (
                  <div className="list-group">
                    {todos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`list-group-item d-flex align-items-center gap-3 ${todo.status ? "bg-success bg-opacity-10" : ""}`}
                      >
                        <span className="badge text-bg-secondary">#{todo.id}</span>
                        <span className={`flex-grow-1 ${todo.status ? " text-muted" : ""}`}>
                          {todo.name}
                        </span>
                        <span className={`badge ${todo.status ? "text-bg-success" : "text-bg-warning"}`}>
                          {todo.status}
                        </span>
                        <Link to={`/todo/${todo.id}`}>
                          <button className="btn btn-outline-primary btn-sm">Edit</button>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={async () => await deleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## อธิบายโค้ด
- ใช้ `useState` เพื่อเก็บ state ของ ToDo, loading status และ error message
- ใช้ `useEffect` เพื่อเรียก `fetchTodos()` เมื่อ component โหลดครั้งแรก
- `fetchTodos()` เป็นฟังก์ชัน async ที่ดึงข้อมูลจาก API และอัปเดต state
- `deleteTodo()` เป็นฟังก์ชัน async ที่ลบ ToDo ตาม ID และรีเฟรชข้อมูลใหม่
- ใช้ `Link` จาก React Router เพื่อไปหน้าแก้ไขตาม ID ของ ToDo
- มีการจัดการ error และแสดงข้อความที่เหมาะสมเมื่อเกิดปัญหา
- ใช้ conditional rendering เพื่อแสดงสถานะการโหลด, ข้อความเมื่อไม่มีข้อมูล และรายการ ToDo เมื่อมีข้อมูล

## การเชื่อมกับ `main.jsx`

ในโปรเจกต์นี้ `router.jsx` ถูกเรียกจาก `main.jsx` ผ่าน route นี้

```jsx
{
  path: "todo",
  element: <RouterPage />,
}
```

### ความหมาย
เมื่อเข้า URL `/todo` จะเปิดหน้า `RouterPage` ซึ่งก็คือ component จาก `router.jsx` ที่แสดงรายการ ToDo และจัดการแก้ไข/ลบได้