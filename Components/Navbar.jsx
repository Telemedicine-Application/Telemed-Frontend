import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    toast.success('Logged out successfully!', {
      duration: 3000,
      position: 'top-center',
    });
    navigate('/', { replace: true });
  };

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
    cursor: "pointer",
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

  // User profile styles
  const userProfileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "25px",
    transition: "background-color 0.3s",
    backgroundColor: showDropdown ? "#f5f5f5" : "transparent",
  };

  const profilePicStyle = {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "2px solid #ff6600",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const profileImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const defaultAvatarStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    color: "#003566",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const userNameStyle = {
    color: "#333",
    fontSize: "0.9rem",
    fontWeight: "600",
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "8px 0",
    minWidth: "150px",
    zIndex: 1001,
    marginTop: "5px",
  };

  const dropdownItemStyle = {
    width: "100%",
    background: "none",
    border: "none",
    color: "#333",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "0.9rem",
    textAlign: "left",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const authButtonsStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  const loginButtonStyle = {
    background: "none",
    border: "2px solid #ff6600",
    color: "#ff6600",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s",
  };

  const signupButtonStyle = {
    background: "#ff6600",
    border: "2px solid #ff6600",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s",
  };

  const handleScroll = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    navigate('/user-dashboard'); // Fixed: Navigate to correct route
  };

  const handleConsultation = () => {
    setShowDropdown(false);
    navigate('/consultation');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle} onClick={() => navigate('/')}>
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

        {/* Show user profile or auth buttons */}
        {user ? (
          <li>
            <div 
              className="user-profile"
              style={userProfileStyle} 
              onClick={handleUserProfileClick}
            >
              <div style={profilePicStyle}>
                {user.profilePic ? (
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    style={profileImageStyle}
                  />
                ) : (
                  <div style={defaultAvatarStyle}>
                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <span style={userNameStyle}>
                {user.fullname || 'User'}
              </span>
              <span style={{ color: '#666', fontSize: '12px' }}>▼</span>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div style={dropdownStyle}>
                  <button 
                    style={dropdownItemStyle}
                    onClick={handleDashboard}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span></span> Dashboard
                  </button>
                  <button 
                    style={dropdownItemStyle}
                    onClick={handleConsultation}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span></span> Consultation
                  </button>
                  <button 
                    style={dropdownItemStyle}
                    onClick={handleLogout}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span></span> Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        ) : (
          <li style={authButtonsStyle}>
            <button
              style={loginButtonStyle}
              onClick={() => navigate('/login')}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff6600';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ff6600';
              }}
            >
              Login
            </button>
            <button
              style={signupButtonStyle}
              onClick={() => navigate('/signup')}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ff6600';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ff6600';
                e.target.style.color = '#fff';
              }}
            >
              Sign Up
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}