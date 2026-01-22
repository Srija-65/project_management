import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openHistoryId, setOpenHistoryId] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null); // 🔹 NEW

  const columns = ["To Do", "In Progress", "Testing", "Done"];

  const colorMap = {
    "To Do": "bg-red-100 border-red-400 text-red-700",
    "In Progress": "bg-yellow-100 border-yellow-400 text-yellow-700",
    "Testing": "bg-blue-100 border-blue-400 text-blue-700",
    "Done": "bg-green-100 border-green-400 text-green-700",
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch {
        setError("Unable to load tasks");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task title");
    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), status, userId: "69724da5470f943e59c554ec" }),
    });
    const newTask = await res.json();
    setTasks((s) => [...s, newTask]);
    setTitle("");
  };

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setTasks((s) => s.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, { method: "DELETE" });
    setTasks((s) => s.filter((t) => t._id !== id));
  };

  // 🔹 NEW: Drop handler
  const handleDrop = async (newStatus) => {
    if (!draggedTask || draggedTask.status === newStatus) return;
    await updateStatus(draggedTask._id, newStatus);
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
        Project Management Utility
      </h1>

      {/* Task Input */}
      <div className="bg-white p-4 rounded-xl shadow-lg flex gap-2 w-full max-w-xl justify-center mb-8">
        <input
          className="border p-2 rounded w-full"
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {columns.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={addTask} className="bg-indigo-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}        // 🔹 NEW
            onDrop={() => handleDrop(col)}               // 🔹 NEW
            className={`p-4 rounded-lg border-2 min-h-[160px] flex flex-col items-center ${colorMap[col]}`}
          >
            <h3 className="font-bold text-lg mb-3">{col}</h3>

            {tasks.filter((t) => t.status === col).map((task) => (
              <div
                key={task._id}
                draggable                                // 🔹 NEW
                onDragStart={() => setDraggedTask(task)} // 🔹 NEW
                className="bg-white p-3 rounded shadow mb-3 w-full relative cursor-move"
              >
                {/* Three dots menu */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === task._id ? null : task._id)
                    }
                    className="text-xl font-bold"
                  >
                    ⋮
                  </button>

                  {openMenuId === task._id && (
                    <div className="absolute right-0 mt-1 bg-white border rounded shadow w-32 z-10">
                      <button
                        onClick={() => {
                          setOpenHistoryId(
                            openHistoryId === task._id ? null : task._id
                          );
                          setOpenMenuId(null);
                        }}
                        className="block w-full px-3 py-1 hover:bg-gray-100 text-left"
                      >
                        View History
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="block w-full px-3 py-1 hover:bg-red-100 text-left text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <p className="font-medium mb-2">{task.title}</p>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                  className="border p-1 rounded w-full"
                >
                  {columns.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                {/* Inline History */}
                {openHistoryId === task._id && (
                  <div className="mt-2 bg-gray-50 border rounded p-2 text-sm">
                    <p className="font-semibold mb-1">History:</p>
                    {task.history?.map((h, i) => (
                      <p key={i}>
                        {i + 1}. {h.status} —{" "}
                        {new Date(h.changedAt).toLocaleString()}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
