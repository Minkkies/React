# useReducer Hook (สำหรับ State ที่ซับซ้อน)

## useReducer คืออะไร

- ใช้เมื่อ state logic ซับซ้อน มีหลาย sub-values หรือ update logic ที่เกี่ยวข้องกัน
- ลดความซับซ้อนของการจัดการหลาย `setState` calls
- รูปแบบ: `const [state, dispatch] = useReducer(reducer, initialState)`

## ตัวอย่าง: Todo List

```jsx
import { useReducer } from "react";

// reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  const addTodo = (text) => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  return (
    <div>
      <button onClick={() => addTodo("New task")}>Add Todo</button>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_TODO",
                  payload: todo.id,
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## useState vs useReducer

| useState                    | useReducer             |
| --------------------------- | ---------------------- |
| ง่ายสำหรับ simple values    | ดีสำหรับ complex state |
| multiple setState calls     | centralized dispatch   |
| ใช้สำหรับ counters, toggles | ใช้สำหรับ forms, lists |

# Context API (State Management)

## Context คืออะไร

- ป้องกันการ pass props ลึกๆ (prop drilling)
- แชร์ข้อมูลระหว่าง components โดยไม่ต้องผ่าน props ทุกชั้น

## ตัวอย่าง: Theme Context

```jsx
import { createContext, useState } from "react";

// สร้าง context
const ThemeContext = createContext();

// สร้าง provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// export context สำหรับใช้ใน components อื่น
export default ThemeContext;
```

### การใช้ Context ใน Component

```jsx
import { useContext } from "react";
import ThemeContext from "./ThemeProvider";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === "light" ? "white" : "black" }}>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### การ setup ใน App.jsx

```jsx
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

export default App;
```