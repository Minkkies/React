# เนื้อหาทั้งหมดเป็นการทำตาม youtube
สามารถดูเพิ่มเติมได้ที่ [mikelopster](https://www.youtube.com/watch?v=4tzmynf93p8&t=250s) 🧑‍💻

## เป้าหมายของ Repository นี้

Repository นี้ทำขึ้นเพื่อฝึกพื้นฐาน React แบบเป็นขั้นตอน ตั้งแต่แนวคิดหลักไปจนถึงการทำโปรเจกต์ย่อยด้วย Vite + React

เหมาะสำหรับ:
- ผู้เริ่มต้นที่อยากเข้าใจ React แบบค่อยเป็นค่อยไป
- คนที่ต้องการตัวอย่างโค้ดสั้น ๆ สำหรับทบทวน
- คนที่อยากมีโน้ตสรุป React เป็นภาษาไทย

## โครงสร้างโปรเจกต์

```text
React/
├─ ReactTutorial/        # เอกสารบทเรียน React แยกหัวข้อ
│  ├─ 01-react-overview.md
│  ├─ 02-components-props.md
│  ├─ 03-styling.md
│  ├─ 04-conditional-rendering-loop.md
│  ├─ 05-usestate-useeffect.md
│  ├─ 06-usereducer-context.md
│  ├─ 07-forms.md
│  ├─ 08-error-boundary.md
│  ├─ 09-react-router.md
│  └─ README.md
└─ testReact/            # โปรเจกต์ทดลองรันจริงด้วย Vite
    ├─ src/
    │  ├─ App.jsx
    │  ├─ main.jsx
    │  ├─ router.jsx
    │  └─ components/
    └─ package.json
```

## แนะนำลำดับการเรียน

1. อ่าน `ReactTutorial/01-react-overview.md`
2. ไล่ต่อหัวข้อ 02 ถึง 09 ตามลำดับ
3. เปิดโค้ดใน `testReact/src` แล้วลองแก้ไขตามแต่ละบท
4. รันโปรเจกต์และทดสอบผลลัพธ์จริงบนเบราว์เซอร์

# React คืออะไร?
React คือ JavaScript library สำหรับสร้าง user interface ของเว็บและ native app

## แนวคิดหลัก

- Component-Based: แบ่ง UI เป็นชิ้นเล็กที่นำกลับมาใช้ซ้ำได้
- Virtual DOM: อัปเดตเฉพาะส่วนที่เปลี่ยนเพื่อลดงานของ DOM จริง
- One-Way Data Flow: ข้อมูลไหลจาก parent ไป child
- JSX: เขียนโค้ด UI ด้วย syntax คล้าย HTML ใน JavaScript

## จุดเด่น

- โครงสร้างโปรเจกต์ชัดเจน
- ดูแลง่ายเมื่อระบบโต
- มี ecosystem ใหญ่ เช่น React Router, Redux, Next.js

# การติดตั้งและเริ่มต้นใช้งาน React

## เริ่มใช้งานโปรเจกต์นี้แบบเร็ว (Quick Start)

ถ้าต้องการรันตัวอย่างใน repository นี้ทันที:

```bash
cd C:\Working-Intern\React\testReact
npm install
npm run dev
```

จากนั้นเปิด URL ที่แสดงใน Terminal (ปกติจะเป็น http://localhost:5173/)

## ความต้องการของระบบ (Prerequisites)

- Node.js เวอร์ชัน LTS (แนะนำ 18 ขึ้นไป)
- npm (ติดมากับ Node.js)
- VS Code (แนะนำสำหรับการเรียนและแก้โค้ด)

ตรวจสอบเวอร์ชัน:

```bash
node -v
npm -v
```

## กรณีมี Project อยู่แล้ว แต่เครื่องยังไม่มีตัวรัน

กรณีนี้หมายถึง: มี source code React อยู่แล้ว (เช่น clone มาจาก Git) แต่เครื่องยังไม่พร้อมรันเพราะยังไม่มี Node.js / package manager

### 1) ติดตั้ง Node.js ก่อน
- ดาวน์โหลดจาก https://nodejs.org (แนะนำเวอร์ชัน LTS)
- เมื่อติดตั้งเสร็จ เปิด Terminal แล้วตรวจสอบ:

```bash
node -v
npm -v
```

ถ้าขึ้นเลขเวอร์ชัน แปลว่าใช้งานได้แล้ว

### 2) เข้าโฟลเดอร์โปรเจค

```bash
cd path/to/your-react-project
```

ตัวอย่างบน Windows:

```bash
cd C:\Working-Intern\React\testReact
```

### 3) ติดตั้ง dependencies ของโปรเจค

```bash
npm install
```

หมายเหตุ:
- ถ้าโปรเจคใช้ lock file ของ yarn (`yarn.lock`) ให้ใช้ `yarn install`
- ถ้าโปรเจคใช้ lock file ของ pnpm (`pnpm-lock.yaml`) ให้ใช้ `pnpm install`

### 4) รันโปรเจค

```bash
npm run dev
```

จากนั้นเปิด URL ตามที่ Terminal แจ้ง (เช่น http://localhost:5173/)

### 5) คำสั่งที่ใช้บ่อยเมื่อรับโปรเจคคนอื่นมา

```bash
npm run dev      # รันโหมดพัฒนา
npm run build    # build production
npm run preview  # ดูผล build
npm run lint     # ตรวจโค้ด
```

### ปัญหาที่พบบ่อยและวิธีแก้เร็ว
- `npm` ไม่เจอคำสั่ง: ปิด-เปิด Terminal ใหม่ หรือเช็ค PATH หลังติดตั้ง Node.js
- `npm.ps1 cannot be loaded because running scripts is disabled` (PowerShell):
    - วิธีชั่วคราว (เฉพาะหน้าต่างปัจจุบัน):
        ```powershell
        Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
        npm -v
        ```
    - วิธีถาวรสำหรับผู้ใช้ปัจจุบัน:
        ```powershell
        Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
        ```
    - ถ้ายังไม่อยากเปลี่ยน policy ให้ใช้คำสั่ง `npm.cmd` แทน `npm`:
        ```powershell
        npm.cmd install
        npm.cmd run dev
        ```
- ติดตั้ง package ไม่ผ่าน: ลบ `node_modules` และ `package-lock.json` แล้วติดตั้งใหม่ด้วย `npm install`
- เวอร์ชัน Node ไม่ตรงกับโปรเจค: เช็คใน `package.json` ช่อง `engines` (ถ้ามี)
- เปิดเว็บไม่ได้เพราะพอร์ตชน: ลองรันใหม่หรือเปลี่ยนพอร์ตตามที่เครื่องมือแจ้ง

## การสร้าง Project React
1. ไปที่ [Vite](https://vite.dev/guide/) - Vite เป็น package manager ที่ใช้สำหรับสร้างโปรเจค (ต้องติดตั้ง Node.js ก่อน)
2. ใช้คำสั่งใน Terminal: 
```bash
npm create vite@latest ชื่อโปรเจค -- --template react
```

### ขั้นตอนการติดตั้ง:
1. ระบบจะถามชื่อโปรเจค (Project name)
2. เลือก Framework เป็น React
3. เลือก Variant (JavaScript หรือ TypeScript)
4. ติดตั้ง dependencies: `npm install`
5. รันโปรเจค: `npm run dev`
6. เข้าเว็บที่ Local: http://localhost:5173/

## แนวปฏิบัติระหว่างฝึก React

- แยก component ให้เล็กและรับผิดชอบหน้าที่เดียว
- ตั้งชื่อไฟล์และตัวแปรให้สื่อความหมาย
- เก็บ state เท่าที่จำเป็น และยก state ขึ้นเมื่อหลาย component ต้องใช้ร่วมกัน
- เขียนโค้ดให้ทดสอบง่ายก่อนเพิ่มลูกเล่น
- commit เป็นช่วงสั้น ๆ (เช่น หลังจบบท) เพื่อย้อนดูพัฒนาการได้ง่าย

## ปัญหาเพิ่มเติมที่พบบ่อย

- รันแล้วหน้าเว็บว่าง:
    - เช็ค `main.jsx` ว่า mount ไปที่ element id ถูกต้อง
    - เช็ค `App.jsx` ว่ามีการ export default ถูกต้อง
- แก้โค้ดแล้วหน้าไม่รีเฟรช:
    - ปิดแล้วรัน `npm run dev` ใหม่
    - เช็คว่าไฟล์อยู่ในโฟลเดอร์ `src` และไม่มี syntax error
- import ไฟล์ไม่เจอ:
    - เช็คตัวพิมพ์เล็ก-ใหญ่ของชื่อไฟล์ให้ตรง
    - เช็ค path ว่าอ้างแบบ relative ถูกต้อง (`./` หรือ `../`)

## แหล่งอ้างอิงเพิ่มเติม

- [React Docs](https://react.dev/learn)
- [Vite Docs](https://vite.dev/guide/)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)