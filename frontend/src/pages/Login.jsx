import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", formData);

      // Save token and user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg auth-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="brand-badge brand-badge-lg mx-auto mb-3">TM</span>
                  <h3 className="fw-semibold mb-1">Welcome back</h3>
                  <p className="text-secondary small mb-0">Log in to manage your tasks</p>
                </div>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-medium">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="text-center small text-secondary mt-4 mb-0">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
