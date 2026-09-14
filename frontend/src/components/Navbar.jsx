import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Safely read the stored user. Never lets a bad or missing value crash the app.
function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/">
          <span className="brand-badge">TM</span>
          Task Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm ms-lg-2 px-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex align-items-center gap-2 ms-lg-2">
                <span className="text-light-50 small d-none d-lg-inline">
                  Hi, {user.name}
                </span>
                <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;