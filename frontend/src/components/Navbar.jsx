import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8L42 17L24 26L6 17Z" fill="white" />
            <path d="M14 21v9c0 3 20 3 20 0v-9" stroke="white" strokeWidth="2.2" fill="none" />
          </svg>
        </span>
        Smart Campus
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
