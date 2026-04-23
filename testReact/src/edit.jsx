import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "https://69e8971f55d62f3479796cd3.mockapi.io";

function Edit() {
  const { id } = useParams(); // ดึงค่า id จาก URL โดยใช้ useParams ซึ่งเป็น hook ที่ให้เราสามารถเข้าถึงพารามิเตอร์ในเส้นทางได้
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // ต้องกำหนดค่าเริ่มต้นให้ชื่อก่อนเพื่อให้สมารถแสดงค่าและแก้ไขได้ 
  // ควรทำเป็น object เพราะข้อมูลที่ได้จาก API เป็น object ที่มีหลาย property (เช่น name, status)
  // ถ้าใช้ [] (array) จะเป็นโครงสร้างคนละแบบ ต้องเขียน todos[0]?.name แทน 
  // ดังนั้นการใช้ object จะทำให้เข้าถึงข้อมูลได้ง่ายขึ้น
  const [todos, setTodos] = useState({ name: "" , status: false });

  async function fetchTodos(todoId) {
    try {
      setErrorMessage("");
      const response = await axios.get(`${baseUrl}/todos/${todoId}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setErrorMessage("ไม่สามารถโหลดข้อมูล ToDo นี้ได้");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos(id);
  }, [id]);

  //event handler สำหรับการเปลี่ยนแปลงชื่อ ToDo ใน input field
  //โดยที่ event จะเอาข้อมูลของเหตุการณ์ที่เกิดขึ้น(หรือก็คือ DOM) ซึ่งมันมีตัวแปรทั้งหมด 3 ตัวด้วยกันที่อยู่ใน DOM นั้นๆ
  //แต่เราต้องการแก้ไขเฉพาะ name ของ ToDo เท่านั้น เราจึงใช้ event.target.value เพื่อเข้าถึงค่าที่ผู้ใช้ป้อน
  function handleNameChange(event) {
    setTodos((previousState) => ({
      ...previousState, // คัดลอกสถานะก่อนหน้าเพื่อรักษาค่าอื่นๆ ที่ไม่เปลี่ยนแปลง
      name: event.target.value, // อัปเดตเฉพาะค่า name
    }));
  }

  async function updateName() {
    try {
      setIsSaving(true);
      setErrorMessage("");
      await axios.put(`${baseUrl}/todos/${id}`, {
        name: todos.name
      })
      alert("Update name successfully");
      window.location.href = "/todo"; // เปลี่ยนเส้นทางกลับไปยังหน้าแรกหลังจากอัปเดตสำเร็จ
    } catch (error) {
      console.error("Error updating todo:", error);
      setErrorMessage("อัปเดตข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "2rem" }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h1 className="text-center text-primary mb-2">Edit Username</h1>
                <p className="text-center text-muted mb-4">แก้ไขข้อมูลชื่อบุคคลที่เลือก</p>

                <div className="row text-center mb-4">
                  <div className="col-6">
                    <div style={{ background: "rgba(13, 110, 253, 0.1)", borderRadius: "8px", padding: "1rem" }}>
                      <h3 className="text-primary mb-0">#{id}</h3>
                      <small className="text-muted">รหัส</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{ background: "rgba(25, 135, 84, 0.1)", borderRadius: "8px", padding: "1rem" }}>
                      <h3 className="mb-0">
                        <span className={`badge ${todos.status ? "text-bg-success" : "text-bg-warning"}`}>
                          {todos.status}
                        </span>
                      </h3>
                      <small className="text-muted">สถานะปัจจุบัน</small>
                    </div>
                  </div>
                </div>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {isLoading ? (
                  <div className="text-center text-muted py-5">Loading...</div>
                ) : (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={todos.name}
                      onChange={handleNameChange}
                      placeholder="แก้ไขชื่อ..."
                    />
                    <button
                      className="btn btn-primary px-4"
                      onClick={() => updateName()}
                      disabled={isSaving || !todos.name.trim()}
                    >
                      {isSaving ? "Saving..." : "บันทึก"}
                    </button>
                  </div>
                )}

                <div className="text-center text-muted mt-3 small">
                  อัปเดตเฉพาะชื่อในหน้านี้
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;