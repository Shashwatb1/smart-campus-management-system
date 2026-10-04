import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import nivaranLogo from "../assets/nivaran-icon-white.png";

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
          <img src={nivaranLogo} alt="Nivaran logo" />
        </span>
        Nivaran
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
        <Link to="/about" className="navbar-link-muted">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
