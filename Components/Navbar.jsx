import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // <-- get navigate from hook

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
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        MindSpace <span role="img" aria-label="sparkles">✨</span>
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
        <li>
          <span
            style={linkStyle}
            onClick={() => navigate("/signup")} 
          >
            Signup
          </span>
        </li>
      </ul>
    </nav>
  );
}
