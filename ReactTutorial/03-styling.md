# การทำ CSS ใน React Component
การจัดการสไตล์ใน React มีหลายแนวทาง ขึ้นอยู่กับขนาดโปรเจคและความต้องการเรื่อง scope / reusability:

1. ไฟล์ CSS ธรรมดา (global CSS)

```jsx
// App.jsx
import "./App.css";

function App() {
  return <div className="container">Hello</div>;
}
```

- ใช้ `className` แทน `class` ใน JSX
- เหมาะกับโปรเจคเล็กหรือสไตล์ที่ต้องแชร์ทั่วทั้งแอป

2. CSS Modules (scoped CSS)

ไฟล์ตั้งชื่อเป็น `Component.module.css` แล้ว import เป็น object:

```jsx
// Button.module.css
.btn { background: blue; color: white }

// Button.jsx
import styles from './Button.module.css'

export default function Button(){
    return <button className={styles.btn}>Click</button>
}
```

- ข้อดี: class ถูก scope ให้เฉพาะ component นั้น ๆ (ลดปัญหา naming collision)

3. Inline styles (style attribute)

```jsx
<div style={{ color: "red", fontSize: 16 }}>Hello</div>
```

- ดีสำหรับสไตล์ที่ขึ้นกับ props หรือคำนวณค่า runtime
- ข้อเสีย: ไม่รองรับ pseudo-classes (:hover) หรือ media queries โดยตรง

4. CSS-in-JS / Styled Components

ใช้ไลบรารีอย่าง `styled-components` หรือ `@emotion/styled` เพื่อสร้าง styled component:

```jsx
// ต้องติดตั้ง: npm install styled-components
import styled from "styled-components";

const Button = styled.button`
  background: palevioletred;
  color: white;
`;

export default function App() {
  return <Button>Click</Button>;
}
```

- ข้อดี: theme, dynamic props, และ scoping ดีเยี่ยม เหมาะกับโปรเจคใหญ่

5. เทคนิคและคำแนะนำปฏิบัติ

- ใส่ `alt` ให้ `<img>` เสมอ เพื่อ accessibility
- หลีกเลี่ยงการใส่ `width`/`height` แบบ fixed ถ้าอยากให้ responsive — ใช้ CSS (`max-width:100%`) แทน
- ถ้ามี class หลายตัว ใช้ template literals หรือไลบรารี `classnames` เพื่อจัดการ conditionally classes
  - ตัวอย่าง: `className={
    `${styles.active} ${isLarge ? styles.large : ''}`
}`
- สำหรับ props ที่ส่งเข้า component แล้วกระจายด้วย spread (`{...rest}`) ระวังอย่าส่ง props ที่ไม่ควรลงใน DOM (เช่น internal flags)
- สำหรับทีมใหญ่: พิจารณาใช้ CSS Modules หรือ styled-components พร้อม linting เพื่อความสอดคล้อง

---

## CSS Variables และ Theming (หัวข้อเพิ่ม)

```css
/* app.css */
:root {
  --bg: #f8f9fa;
  --text: #222;
  --primary: #0d6efd;
}

[data-theme="dark"] {
  --bg: #111;
  --text: #f5f5f5;
}

.page {
  background: var(--bg);
  color: var(--text);
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}
```

```jsx
import { useState } from "react";
import "./app.css";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className="page" data-theme={dark ? "dark" : "light"}>
      <button className="btn-primary" onClick={() => setDark((v) => !v)}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Responsive Styling พื้นฐาน

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```