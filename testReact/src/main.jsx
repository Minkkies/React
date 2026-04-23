import { StrictMode } from "react"; // เอาไว้ใช้สำหรับการตรวจสอบข้อผิดพลาดในโค้ด React
import { createRoot } from "react-dom/client"; // เอาไว้ใช้สำหรับการเรนเดอร์แอปลงใน DOM
import App from "./App.jsx";
import Edit from "./edit.jsx";
import TodoListPage from "./todolist.jsx";
import RouterPage from "./router.jsx";

// เอาไวใช้สำหรับการสร้างเส้นทาง (routing)
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";

// หน้าแสดงเมื่อ route ไม่ตรงกับที่กำหนดไว้
function NotFoundPage() {
  return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page Not Found</h2>;
}

// หน้าแสดงเมื่อเกิดข้อผิดพลาดใน route
function RouteErrorPage() {
  return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Something went wrong.</h2>;
}


/*
  RootLayout คือ "หน้าแม่" หรือ layout หลักของ route "/"
  หน้าที่:
  1) แสดงเมนูนำทาง (NavLink) ที่อยู่ด้านบน
  2) มี <Outlet /> เป็นช่องสำหรับแสดงหน้า route ลูก
*/

function RootLayout() {
  const baseBtnStyle = {
    textDecoration: "none",
    padding: "0.5rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    color: "#333",
    background: "#fff",
    fontWeight: 500,
    display: "inline-block",
    marginRight: "0.75rem",
  };

  const activeBtnStyle = {
    color: "#fff",
    background: "#0d6efd",
    border: "1px solid #0d6efd",
  };

  return (
    <>
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          background: "white",
          borderBottom: "1px solid #ddd",
        }}
      >
        <NavLink
          to="/"
          end
          // end สำคัญ: ทำให้ "/" active เฉพาะหน้าแรก
          // ถ้าไม่ใส่ end หน้า "/" อาจ active ตอนอยู่ "/todo", "/todolist" ด้วย
          style={({ isActive }) => ({
            ...baseBtnStyle,
            ...(isActive ? activeBtnStyle : null),
          })}
        >
          Open Learn React
        </NavLink>

        <NavLink
          to="/todolist"
          style={({ isActive }) => ({
            ...baseBtnStyle,
            ...(isActive ? activeBtnStyle : null),
          })}
        >
          Open ToDoList React
        </NavLink>

        <NavLink
          to="/todo"
          style={({ isActive }) => ({
            ...baseBtnStyle,
            ...(isActive ? activeBtnStyle : null),
          })}
        >
          Open Router React
        </NavLink>

      </div>

      {/* Outlet = จุดที่ใช้แสดงผล component ของ route ลูก (children) */}
      <Outlet />
    </>
  );
}

/*
  โครงสร้าง route:
  - path "/" ใช้ RootLayout เป็นหน้าแม่
  - children จะถูก render ภายใน <Outlet /> ของ RootLayout
    - index: true        -> "/": App
    - "todo/:id"         -> "/todo/1": Edit
    - "todolist"         -> "/todolist": TodoListPage
    - "todo"             -> "/todo": RouterPage
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "todo/:id",
        element: <Edit />,
      },
      {
        path: "todolist",
        element: <TodoListPage />,
      },
      {
        path: "todo",
        element: <RouterPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

// เรนเดอร์ RouterProvider ลงใน DOM ที่มี id 'root'
// StrictMode ใน dev จะ render บางส่วนซ้ำ 2 ครั้งเพื่อช่วยหา side effects (เป็นพฤติกรรมปกติ)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
