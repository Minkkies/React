# React คืออะไร?
React คือ library สำหรับ web และ native user interfaces ที่ใช้สำหรับการพัฒนา web application ฝั่ง Frontend

- มอง web app ทั้งหมดเป็น component based
- ใช้ภาษา JSX เป็น based ในการจัดการ style และ component (เพิ่มความสามารถของ javascript ให้จัดการฝั่ง html ไปร่วมกันได้) = จริงๆแล้วมันคือ based javascript
- แถม support ทุก platform ด้วย
- ใครที่รู้จัก Vue มา มีสถานะที่คล้ายๆกัน คือเป็น library Frontend เหมือนกัน แต่ไอเดียการพัฒนาจะเป็นไปในคนละแบบกัน

#### 1. Component-Based:
- React ใช้แนวคิดการแบ่งส่วนประกอบของ UI เป็น Components
- แต่ละ Component สามารถนำกลับมาใช้ซ้ำได้
- ทำให้การจัดการและบำรุงรักษาโค้ดทำได้ง่ายขึ้น

#### 2. Virtual DOM:
- React ใช้ Virtual DOM เพื่อเพิ่มประสิทธิภาพในการ render
- เมื่อข้อมูลเปลี่ยน React จะเปรียบเทียบ Virtual DOM กับ Real DOM
- อัพเดทเฉพาะส่วนที่มีการเปลี่ยนแปลงจริงๆ ทำให้เว็บไซต์ทำงานได้เร็วขึ้น

#### 3. One-Way Data Flow:
- ข้อมูลไหลในทิศทางเดียวจาก Parent ไปยัง Child Components
- ทำให้การติดตามการเปลี่ยนแปลงของข้อมูลและการแก้บัคทำได้ง่าย

#### 4. JSX:
- ใช้ JSX ซึ่งเป็นส่วนขยายของ JavaScript
- ช่วยให้เขียน UI components ได้ง่ายขึ้นโดยใช้ syntax คล้าย HTML
- สามารถแทรก JavaScript expressions ลงใน JSX ได้

---

## React เหมาะกับงานแบบไหน?

เหมาะมากกับงานที่ UI เปลี่ยนบ่อยและมี interaction เยอะ เช่น:
- Dashboard หรือระบบหลังบ้าน
- Single Page Application (SPA)
- ระบบที่มีฟอร์ม, ตาราง, filter, modal หลายส่วน

อาจไม่จำเป็นต้องใช้ React ถ้า:
- เป็นหน้าเว็บเนื้อหานิ่งๆ (เช่น landing page ง่ายๆ)
- ไม่มี logic ฝั่ง UI มาก

---

## React vs Vue (แบบสั้น)

- React: ยืดหยุ่นสูง, ecosystem ใหญ่, ต้องเลือกเครื่องมือประกอบเองบ่อย
- Vue: เริ่มง่ายกว่า, โครงสร้างค่อนข้างชัดเจน, syntax อ่านง่ายสำหรับมือใหม่
- ทั้งสองตัวทำงานได้ดีมากในงานจริง เลือกตามทีมและความถนัดได้เลย

แนวคิดง่ายๆ ในการเลือก:
- ถ้าทีม/โปรเจกต์ใช้ React อยู่แล้ว -> เลือก React
- ถ้าเริ่มใหม่และอยากได้ความเรียบง่ายเร็วๆ -> Vue ก็เป็นตัวเลือกที่ดี

---

## คำศัพท์พื้นฐานที่ต้องรู้

- Component: ส่วนประกอบของ UI ที่แยกเป็นชิ้นๆ
- Props: ข้อมูลที่ส่งจาก Parent ไป Child
- State: ข้อมูลภายใน component ที่เปลี่ยนแปลงได้
- Event: เหตุการณ์จากผู้ใช้ เช่น click, input
- Hook: ฟังก์ชันพิเศษของ React เช่น useState, useEffect
- Render: กระบวนการแสดงผล UI จากข้อมูลปัจจุบัน

---

## ภาพรวมการทำงานของ React

ลำดับการทำงานหลัก:
1. ผู้ใช้ทำ action เช่น กดปุ่ม
2. State เปลี่ยน
3. React สร้าง UI ใหม่ใน Virtual DOM
4. React เทียบความต่างกับรอบก่อน
5. อัปเดตเฉพาะจุดที่จำเป็นบน Real DOM

สรุปสั้นๆ:
State เปลี่ยน -> Re-render -> DOM อัปเดตเฉพาะส่วนที่เปลี่ยน

---

## ตัวอย่าง JSX พื้นฐาน

```jsx
function WelcomeCard({ name }) {
	return (
		<div className="card">
			<h2>Hello, {name}</h2>
			<p>ยินดีต้อนรับสู่ React</p>
		</div>
	);
}

export default function App() {
	return <WelcomeCard name="Intern" />;
}
```

ข้อควรรู้เกี่ยวกับ JSX:
- ใช้ `className` แทน `class`
- tag ต้องปิดให้ครบ
- ใช้ `{}` เมื่อต้องการแทรก JavaScript expression

---

## ข้อผิดพลาดยอดฮิตของมือใหม่

- แก้ค่า state ตรงๆ เช่น `state.name = "x"` (ควรใช้ setState)
- ลืมใส่ `key` เวลาทำ list rendering
- เข้าใจผิดว่า Child ส่งข้อมูลย้อนขึ้น Parent ได้เอง (จริงๆ ต้องส่งผ่าน callback)
- คิดว่า React อัปเดต DOM ทั้งหน้าเสมอ (จริงๆ อัปเดตเฉพาะส่วนที่เปลี่ยน)