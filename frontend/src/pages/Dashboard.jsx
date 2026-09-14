import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";

function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function Dashboard() {
  const user = getStoredUser();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      // Guard against the API returning something other than a plain array
      setTasks(Array.isArray(res.data) ? res.data : res.data?.tasks || []);
    } catch (err) {
      setError("Could not load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", { title, description });
      setTasks([res.data, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Could not create task.");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status: "completed" });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError("Could not update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  const pendingCount = tasks.filter((t) => t.status !== "completed").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="page-wrap">
      <div className="container py-4 py-md-5">
        <div className="mb-4">
          <h3 className="fw-semibold mb-1">Welcome back, {user?.name || "there"} 👋</h3>
          <p className="text-secondary mb-0">Here's what's on your plate today.</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4">
            <div className="stat-card card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-secondary small mb-1">Total Tasks</p>
                <h4 className="fw-semibold mb-0">{tasks.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="stat-card card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-secondary small mb-1">Pending</p>
                <h4 className="fw-semibold mb-0">{pendingCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="stat-card card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-secondary small mb-1">Completed</p>
                <h4 className="fw-semibold mb-0">{completedCount}</h4>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger small">{error}</div>}

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h6 className="fw-semibold mb-3">Create a new task</h6>
                <form onSubmit={handleCreateTask}>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Task Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Finish project report"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Add more details (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Create Task
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <h6 className="fw-semibold mb-3">Your Tasks</h6>

            {loading ? (
              <p className="text-secondary small">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5 text-secondary">
                  No tasks yet. Create your first task to get started.
                </div>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;