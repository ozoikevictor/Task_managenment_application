import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      await api.post("/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
                  <h3 className="fw-semibold mb-1">Create your account</h3>
                  <p className="text-secondary small mb-0">Start organizing your tasks today</p>
                </div>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

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
                    {loading ? "Creating account..." : "Register"}
                  </button>
                </form>

                <p className="text-center small text-secondary mt-4 mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
