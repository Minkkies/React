# React Component / Props

## Component คืออะไร

Component คือส่วนประกอบย่อยของ UI ที่สามารถนำกลับมาใช้ซ้ำได้ แบ่งเป็น 2 แบบ:

1. Function Component:

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

2. Class Component:

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## Props คืออะไร

Props (Properties) คือข้อมูลที่ส่งจาก Parent Component ไปยัง Child Component:

- เป็น Read-only (ไม่สามารถแก้ไขได้ใน component ที่รับ props)
- ส่งได้หลายรูปแบบ (ข้อความ, ตัวเลข, object, function)
- ใช้เพื่อทำให้ component มีความยืดหยุ่น สามารถปรับเปลี่ยนการแสดงผลได้

ตัวอย่างการใช้ Props:

```jsx
// Parent Component
function App() {
  return <UserCard name="John" age={25} />;
}

// Child Component
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

## การส่งผ่าน Props

1. แบบปกติ:

```jsx
<UserCard name="John" age={25} />
```

2. แบบ Spread Operator(แบบใช้ , ในกรณีที่มีหลาย props):

```jsx
const userInfo = { name: "John", age: 25 };
<UserCard {...userInfo} />;
```

3. แบบ Children Props:

```jsx
<Card>
  <h1>This is children content</h1>
</Card>
```

### ข้อควรระวัง

1. Props เป็น Read-only ห้ามแก้ไขค่าโดยตรง
2. ควรกำหนด Default Props เสมอ
3. ควรตรวจสอบ Props ด้วย PropTypes
4. Props ที่เป็น Object หรือ Array ควรระวังเรื่อง Reference

## โครงสร้างพื้นฐานของ Component

### การสร้าง Component แบบพื้นฐาน

```jsx
import "./App.css";

function App() {
  return (
    <>
      {" "}
      # fragment คือการรวม element หลายๆตัวเข้าด้วยกันโดยไม่ต้องสร้าง div ใหม่
      <div>Hello World</div>
    </>
  );
}

export default App;
```

จะได้ผลลัพท์แบบนี้
![hello world](<testReact/img/Screenshot (106).png>)

---

### การใช้งาน Components

1. Single Component Export:

```jsx
// Header.jsx must be in components folder in src
export default function Header() {
  return <div>This is Header</div>;
}
```

2. Single Component Import:

```jsx
// App.jsx in src folder
import Header from "./components/header.jsx";

function App() {
  return (
    <div>
      <Header /> 
      <br />
      Hello World
    </div>
  );
}
```

จะได้ผลลัพท์แบบนี้ กรณีที่ มีComponents เดียวในไฟล์

![header](testReact/img/1762511030114.jpg)

---

1. Multiple Components Export:

```jsx
// icon.jsx ใน components folder in src
export function IconA() {
  return <div>This is iconA</div>;
}

export function IconB() {
  return <div>This is iconB</div>;
}
```

2. Multiple Components Import:

```jsx
// App.jsx
import Header from './components/header.jsx'
import { IconA(ชื่อcomponents),IconB } from './components/icon.jsx' //ต้องใส่ชื่อ component ที่ต้องการ import มาใน {} และต้องตรงกับชื่อที่ export ในไฟล์ icon.jsx และชื่อ ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่เสมอ

function App() {

  return (
      <div>
        <Header />
        <IconA />
        <br />
        Hello World
        <hr />
        <IconB />
      </div>
  )
}
```

จะได้ผลลัพท์แบบนี้

![iconA-iconB](testReact/img/1762511800586.jpg)

---

### การใช้งาน Image Component

```jsx
// Image.jsx ใน components folder in src
export default function Image({ imageUrl }) {
  return (
    <>
      <img src={imageUrl} width="100px" />
    </>
  );
}
```

คำอธิบายสั้น ๆ:

- ฟังก์ชัน `Image` เป็น Function Component ที่รับ `props` แบบ destructuring (`{ imageUrl }`).
- `imageUrl` คือ prop ที่ใช้ส่ง URL ของรูปมาจาก parent component (เช่น `App`).
- ใน component นี้ใช้ `<img src={imageUrl} width="100px" />` เพื่อแสดงรูป โดยกำหนดความกว้างเป็น 100px.
- มีการใช้ Fragment `<>...</>` รอบ `<img>` แต่ในกรณีนี้ไม่จำเป็นเพราะ `<img>` เป็น element เดียว — สามารถลบ Fragment ได้เพื่อให้โค้ดกระชับขึ้น.

การนำ `Image` มาใช้ใน `App.jsx` :

```jsx
// App.jsx
import Image from "./components/image.jsx";

function App() {
  return (
    <div>
      {/* ...components อื่นๆ ... */}
      <Image imageUrl="https://picsum.photos/200/300" />
      // Image ที่ใช้ตัวนี้เป็น component ที่รับ props ชื่อ imageUrl
      ซึ่งจะถูกส่งไปยัง component Image เพื่อแสดงรูปจาก URL ที่กำหนด
    </div>
  );
}

export default App;
```

ผลลัพท์

![img](testReact/img/1762515582580.jpg)

ข้อควรสังเกตและคำแนะนำ:

- ควรใส่ `alt` ให้ `<img>` เสมอ เพื่อที่จะช่วยให้ผู้ใช้ที่ใช้ screen reader หรือกรณีที่รูปไม่โหลด สามารถเข้าใจได้ว่ารูปนั้นคืออะไร เช่น `<img src={imageUrl} alt="description" />`จะแสดงข้อความ "description" แทนรูปถ้ารูปไม่โหลด
- ถ้าต้องการให้รูปตอบสนองขนาดหน้าจอ (responsive) แนะนำใช้ CSS (เช่น `max-width:100%` และกำหนดความกว้างผ่าน class) แทนการใส่ `width` ตรงๆ.
- การโหลดรูปจาก URL ภายนอก (เช่น `picsum.photos`) อาจมีผลกับ performance — ควรพิจารณาการปรับขนาด/เก็บแคช หรือโหลดแบบ lazy (เช่น `loading="lazy"`).
- หากต้องการรับ props เพิ่มเติม (เช่น `alt`, `className`, `style`) สามารถส่งเข้ามาและกระจายไปยัง `<img>` ด้วย spread operator: `function Image({ imageUrl, ...rest }) { return <img src={imageUrl} {...rest} /> }`.

`prop-types` เป็นแค่ไลบรารีเสริมที่ใช้ตรวจสอบชนิดของ props ตอน runtime (แสดงเป็น warning ใน console) ใช้คำสั่ง

```
npm install prop-types
```

```jsx
// Image.jsx ใน components folder in src
import PropTypes from 'prop-types'
export default function Image({ imageUrl }) {
   ...html ...
}

Image.propTypes = {
 imageUrl: PropTypes.string // กำหนดให้ imageUrl ต้องเป็นสตริง
}
```

### ข้อควรรู้:

- ไฟล์นามสกุล .jsx 1 ไฟล์ควรมี component หลักเพียงตัวเดียว
- การ export แบบ default ใช้สำหรับ component หลัก
- การ export แบบธรรมดาใช้สำหรับ multiple components
- ชื่อ Component ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่เสมอ