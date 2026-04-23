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