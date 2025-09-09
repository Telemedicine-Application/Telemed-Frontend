import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  
  const navigate = useNavigate();

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const logoStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#003566",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "30px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
  };

  const toggleWrapper = {
    display: "flex",
    alignItems: "center",
    background: "#f0f0f0",
    borderRadius: "20px",
    padding: "3px",
  };

  const toggleOption = (active) => ({
    padding: "6px 12px",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: active ? "#fff" : "#333",
    background: active ? "#ff6600" : "transparent",
    transition: "all 0.2s ease",
  });

  // Optional: keep the previous handleScroll behaviour (navigates to home if not there)
  const handleScroll = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      // small delay so home can render before trying to scroll
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        SehatSaathi <span role="img" aria-label="sparkles">✨</span>
      </div>

      <ul style={navLinksStyle}>
        <li>
          <span style={linkStyle} onClick={() => handleScroll("home")}>
            Home
          </span>
        </li>

        <li>
          <span style={linkStyle} onClick={() => handleScroll("about")}>
            About
          </span>
        </li>

        <li>
          <span style={linkStyle} onClick={() => handleScroll("features")}>
            Features
          </span>
        </li>

        <li>
          <span style={linkStyle} onClick={() => handleScroll("contact")}>
            Contact
          </span>
        </li>

          <span
            style={{ ...linkStyle, marginLeft: "10px" }}
            onClick={() => navigate('/login')}
          >
          Login
          </span>
      </ul>
    </nav>
  );
}
