# Form Handling ใน React

## Controlled Components (แบบที่แนะนำวิ้วว)

```jsx
import { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // ส่งข้อมูลไปยัง server
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

## Form Validation

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Touched State และ Error Message

```jsx
import { useState } from "react";

function ProfileForm() {
  const [formData, setFormData] = useState({ name: "" });
  const [touched, setTouched] = useState({ name: false });

  const nameError = !formData.name.trim() ? "Name is required" : "";

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        onBlur={() => setTouched({ ...touched, name: true })}
      />
      {touched.name && nameError && <small style={{ color: "red" }}>{nameError}</small>}
    </form>
  );
}
```

## Async Validation ตัวอย่าง

```jsx
import { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const checkEmail = async () => {
    setError("");
    const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
    const result = await response.json();
    if (!result.available) setError("Email นี้ถูกใช้งานแล้ว");
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkEmail} />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
}
```