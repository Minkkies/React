# React Hook สำหรับจัดการ state

React มี Hooks เพื่อจัดการ lifecycle และ state ใน Function Components — ตัวที่ใช้บ่อยที่สุดสำหรับ state คือ `useState`.

## useState (พื้นฐาน)

- นิยาม: `useState` ให้คุณเพิ่ม local state ใน Function Component
- รูปแบบ: `const [state(ชื่อตัวแปร), setState(ชื่อฟังก์ชัน)] = useState(initialValue=ค่าเริ่มต้น)`

ตัวอย่าง (Counter) — แสดงการใช้ `useState` ร่วมกับปุ่ม `onClick`:

```jsx
import { useState } from "react";

export default function Counter() {  
  const [count, setCount] = useState(0); // กำหนด initial state เป็น 0

  // ฟังก์ชัน handler แบบแยกออกมา (อ่านง่ายและทดสอบง่าย)
  const increment = () => setCount((prev) => prev + 1); 
  const reset = () => setCount(0);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

คำอธิบายสั้น ๆ:

- `useState(0)` คืนค่าเป็นคู่ `[state, setState]` — `state` คือค่าปัจจุบัน, `setState` เป็นฟังก์ชันที่ใช้เปลี่ยนค่า
- ใน `onClick` เราเรียก `setCount` เพื่ออัปเดต state เมื่อผู้ใช้คลิกปุ่ม
- ใช้รูปแบบ functional update (`setCount(prev => prev + 1)`) เพื่อป้องกันปัญหา stale state เมื่ออาจมีการเรียกซ้อนกันหลายครั้ง

## การจัดการ state ที่เป็น object หรือหลายค่า

เมื่อ state เป็น object อย่าลบค่าที่มีอยู่โดยไม่ได้ตั้งใจ — ให้ใช้ spread เพื่อรักษาค่าที่เหลือ:

```jsx
function Profile() {
  const [user, setUser] = useState({ name: "Guest", age: 0 });

  const updateName = (newName) => {
    setUser((prev) => ({ ...prev, name: newName }));
  };

  return (
    <div>
      <div>
        {user.name} ({user.age})
      </div>
      <button onClick={() => updateName("John")}>Set name John</button>
    </div>
  );
}
```

## ข้อควรรู้และ best practices

- `setState` ไม่ได้เปลี่ยนค่าแบบ synchronous เสมอไป — React อาจ batch การอัปเดตและ re-render ภายหลัง
- ถ้าอัปเดตใหม่ขึ้นอยู่กับค่าก่อนหน้า ให้ใช้ functional update (`setState(prev => ...)`)
- หลีกเลี่ยงการเก็บข้อมูลที่ใหญ่หรือซับซ้อนเกินไปใน state เดียว — แบ่งเป็นหลาย state หรือใช้ reducer (`useReducer`) เมื่อ logic ซับซ้อน
- อย่าใส่ side-effects ในตัว setter หรือใน render — ใช้ `useEffect` สำหรับ side-effects

ตัวอย่างรวม: counter แบบหนึ่งบรรทัด (ternary) และป้องกันการลดค่าติดลบ

```jsx
function SafeCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
    </div>
  );
}
```

---

# useEffect Hook (จัดการ Side Effects)

## useEffect คืออะไร

- ใช้สำหรับ side effects เช่น การดึงข้อมูล, การอัปเดต DOM, subscription
- ทำงานหลังจากที่ component render เสร็จแล้ว
- รูปแบบ: `useEffect(() => { /* side effect code */ }, [dependencies])`

## ตัวอย่างพื้นฐาน

### การใช้ useEffect กับ video component

```jsx
// Video.jsx ใน components folder in src
import { useRef } from "react";

export default function Video({ src,isPlaying }) {
    // สร้าง ref เพื่อเข้าถึง DOM element ของ video
    // แต่ค่า ref จะยังไม่ถูกกำหนดจนกว่า component จะ render เสร็จ
    const ref = useRef(null) 

    if (isPlaying) {
        ref.current?.play()
    } else {
        ref.current?.pause()
    }

    return <Video ref={ref} src={src} loop playsInline/>
}

// App.jsx
import Video from "./components/video.jsx";
function App() {
  return (
    <div>
      <Video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" isPlaying={true} />
    </div>
  );
}
```
คำอธิบายสั้น ๆ:
- ใน `Video` component เราใช้ `useRef` เพื่อสร้าง ref ที่จะเชื่อมโยงกับ element `<video>`.
- เมื่อ `isPlaying` เปลี่ยนแปลง เราเช็คค่า `ref.current` ว่ามีอยู่หรือไม่ (ใช้ optional chaining `?.`) และเรียก `play()` หรือ `pause()` ตามค่า `isPlaying`.
- ในกรณีนี้ เกิดข้อผิดพลาดเพราะ ref เก็บเป็น `null` เนื่องจากยังไม่มีการ render element `<video>` ทำให้ `ref.current` เป็น `null` และไม่สามารถเรียก `play()` หรือ `pause()` ได้ — นี่คือปัญหาที่เกิดจากการพยายามเข้าถึง DOM ก่อนที่มันจะพร้อม — การแก้ไขคือการใช้ `useEffect` เพื่อรันโค้ดที่ต้องการเข้าถึง DOM หลังจากที่ component render เสร็จแล้ว

**กรณีที่ใช้ useEffect**
```jsx
import { useEffect, useRef } from "react";

export default function Video({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying]); // รัน effect นี้ทุกครั้งที่ isPlaying เปลี่ยนแปลง

  return <video ref={ref} src={src} loop playsInline />;
}

// App.jsx
import Video from "./components/video.jsx";
function App() {
  return (
    <div>
      <Video 
      isPlaying={isPlaying}
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"/>

      // ปุ่มที่ใช้สำหรับ toggle การเล่นวิดีโอ
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```
คำอธิบายสั้น ๆ:
- ในตัวอย่างนี้ เราใช้ `useEffect` เพื่อรันโค้ดที่ต้องการเข้าถึง DOM หลังจากที่ component render เสร็จแล้ว ดังนั้น `ref.current` จะไม่เป็น `null` และเราสามารถเรียก `play()` หรือ `pause()` ได้อย่างปลอดภัยตามค่า `isPlaying`.

### 1. useEffect ที่ทำงานทุกครั้ง (ไม่มี dependency)

```jsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    console.log("Component rendered!");
  });

  return <div>Hello</div>;
}
```

### 2. useEffect ที่ทำงานครั้งเดียวตอน mount (dependency array ว่าง)

```jsx
useEffect(() => {
  console.log("Component mounted!");
  // โหลดข้อมูลเมื่อ component เปิดครั้งแรก
}, []);
```

### 3. useEffect ที่ทำงานเมื่อค่าสเปซิฟิค เปลี่ยนแปลง

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("User ID changed:", userId);
    // ดึงข้อมูล user เมื่อ userId เปลี่ยน
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

### 4. useEffect with Cleanup (ลบ subscription)

```jsx
useEffect(() => {
  console.log("Subscribed to events");

  // cleanup function - ทำงานก่อน component unmount
  return () => {
    console.log("Unsubscribed from events");
  };
}, []);
```

## ตัวอย่างจริงจัง: ดึงข้อมูล API

```jsx
import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // สร้าง async function เพราะ useEffect บอดี้ต้องไม่เป็น async
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.example.com/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ทำงานครั้งเดียว

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## ข้อควรระวัง

- ห้ามใส่ dependency array ไม่ถูก (อาจเกิด infinite loop)
- ถ้า dependency หลายตัว ต้องครบถ้วนในอาร์เรย์
- cleanup function จะทำงานก่อน component unmount หรือก่อน effect ใหม่ทำงาน
- อย่าใส่ side-effect ที่ไม่จำเป็นใน render — ใช้ useEffect แทน

---

## Custom Hook เบื้องต้น (หัวข้อเพิ่ม)

```jsx
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(initialValue);

  return { count, increase, decrease, reset };
}

function CounterPanel() {
  const { count, increase, decrease, reset } = useCounter(5);

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```