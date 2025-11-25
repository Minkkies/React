import { useState } from 'react'

function App() {
  //ค่าเริ่มต้นของงาน
  const [tasks, setTasks] = useState([
    { id: 1, text: 'เรียน React', completed: false },
    { id: 2, text: 'ทำการบ้าน', completed: true },
  ]);
  const [inputText, setInputText] = useState('');

  //เพิ่มงานใหม่
  const addTask = () => {
    if (inputText.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  };

  //ลบงาน
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  //สลับสถานะงานเสร็จ/ไม่เสร็จ
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  //ส่วนของ UI
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem' }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-4">

                <h1 className="text-center text-primary mb-2">📝 To-Do List</h1>
                <p className="text-center text-muted mb-4">จัดการรายการสิ่งที่ต้องทำของคุณ</p>

                <div className="row text-center mb-4">
                  <div className="col-4">
                    <div style={{ background: 'rgba(13, 110, 253, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                      <h3 className="text-primary mb-0">{totalTasks}</h3>
                      <small className="text-muted">งานทั้งหมด</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div style={{ background: 'rgba(25, 135, 84, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                      <h3 className="text-success mb-0">{completedTasks}</h3>
                      <small className="text-muted">เสร็จแล้ว</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div style={{ background: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                      <h3 className="text-warning mb-0">{totalTasks - completedTasks}</h3>
                      <small className="text-muted">ค้างอยู่</small>
                    </div>
                  </div>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="พิมพ์งานที่ต้องทำ..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <button className="btn btn-primary px-4" onClick={addTask}>
                    ➕ เพิ่ม
                  </button>
                </div>

                <div className="list-group">
                  {tasks.length === 0 ? (
                    <div className="text-center text-muted py-5">
                      ยังไม่มีรายการ เพิ่มงานใหม่ได้เลย! 🎯
                    </div>
                  ) : (
                    tasks.map(task => (
                      <div
                        key={task.id}
                        className={`list-group-item d-flex align-items-center gap-3 ${task.completed ? 'bg-success bg-opacity-10' : ''
                          }`}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input m-0"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                          style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                        />
                        <span
                          className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''
                            }`}
                        >
                          {task.text}
                        </span>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="text-center text-muted mt-4 small">
                  💡 กด Enter เพื่อเพิ่มงานเร็วขึ้น
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App