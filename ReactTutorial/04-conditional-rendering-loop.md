# Conditional Rendering และ Loop
## ตัวอย่างการใช้ Condition (if/else) ใน React Component

### Checkbox Component

```jsx
// Checkbox.jsx
export default function Checkbox({ text, isChecked }) {
  let ResultCheckbox = "";
  if (isChecked) {
    ResultCheckbox = <div>{text} is done</div>;
  } else {
    ResultCheckbox = <div>{text} is in progress</div>;
  }
  return <>{ResultCheckbox}</>;
}
```

**อธิบาย:**

- ตัวอย่างนี้ใช้ if/else เพื่อเลือกผลลัพธ์ที่จะแสดงในตัวแปร `ResultCheckbox` ตามค่า prop `isChecked`
- ถ้า `isChecked` เป็น true จะแสดงข้อความ "is done" ถ้าไม่ใช่จะแสดง "is in progress"
- การใช้ตัวแปรช่วยเก็บ JSX ก่อน return ทำให้โค้ดอ่านง่ายขึ้น

**แนวทางอื่นที่นิยม:**

- สามารถใช้ ternary operator ใน JSX ได้ เช่น

```jsx
return (
  <div>
    {text} {isChecked ? " is done" : " is in progress"}
  </div>
);
```

ผลลัพธ์จะเหมือนกัน แต่โค้ดจะกระชับขึ้น เช่น

```jsx
import Checkbox from "./components/checkbox.jsx";

function App() {
  return (
    <div>
      <Checkbox text="coding react" isChecked={false} />
      <Checkbox text="doing document react" isChecked={true} />
      <Checkbox text="test react" isChecked={false} />
    </div>
  );
}
```

![check box condition](<testReact/img/Screenshot 2026-04-22 134313.png>)

## ตัวอย่างการใช้ Loop (map) ใน React

```jsx
function TodoList({ items }) { //items เป็นอาร์เรย์
  return (
    <div>
      {
        todoList.map((todo, idx) => (
           <Checkbox
              key = {idx}
              text={todo.text}
              isChecked={todo.isChecked}
            />
        ))
      }
    </div>
  )
}
```

- ใช้ `.map()` เพื่อวนลูปแสดงรายการใน array
- ควรใส่ prop `key` ที่ unique ให้กับแต่ละ element ใน list