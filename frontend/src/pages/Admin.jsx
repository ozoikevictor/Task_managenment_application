import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {
  const [stats, setStats] = useState({ totalUsers: 0, totalTasks: 0 });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/tasks"),
        ]);
        setStats(statsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError("Could not load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="page-wrap">
      <div className="container py-4 py-md-5">
        <div className="mb-4">
          <h3 className="fw-semibold mb-1">Admin Dashboard</h3>
          <p className="text-secondary mb-0">Overview of users and tasks across the platform.</p>
        </div>

        {error && <div className="alert alert-danger small">{error}</div>}

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="stat-card card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-secondary small mb-1">Total Users</p>
                <h4 className="fw-semibold mb-0">{stats.totalUsers}</h4>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-secondary small mb-1">Total Tasks</p>
                <h4 className="fw-semibold mb-0">{stats.totalTasks}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h6 className="fw-semibold mb-3">All Tasks</h6>

            {loading ? (
              <p className="text-secondary small mb-0">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-secondary small mb-0">No tasks found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Task</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task._id}>
                        <td>{task.user?.name || "—"}</td>
                        <td className="text-secondary">{task.user?.email || "—"}</td>
                        <td>{task.title}</td>
                        <td>
                          <span
                            className={`badge status-badge ${
                              task.status === "completed"
                                ? "bg-success"
                                : "bg-warning-subtle text-warning-emphasis"
                            }`}
                          >
                            {task.status === "completed" ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;