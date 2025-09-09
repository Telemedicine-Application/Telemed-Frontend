import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("patient");
  const [formData, setFormData] = useState({
    phone: "", // Fixed: backend expects 'phone', not 'email'
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For now, only patient login is implemented in your backend
      // You can add doctor login endpoint later
      const endpoint = "http://127.0.0.1:5000/api/auth/login"; // Fixed port and endpoint

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Store token and user data
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.userData));
          
          toast.success(data.message || "Login successful! 🎉", {
            duration: 4000,
            position: 'top-center',
          });
          
          // Navigate after a short delay
          setTimeout(() => {
            if (loginType === "doctor") {
              navigate("/doctor-dashboard", { replace: true });
            } else {
              navigate("/consultation", { replace: true }); // Or wherever you want patients to go
            }
          }, 1500);
        } else {
          toast.error("No token received from server", {
            duration: 4000,
            position: 'top-center',
          });
        }
      } else {
        toast.error(data.message || "Login failed", {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error! Please check if the server is running.", {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login to SehatSaathi 🏥</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Role Selector */}
          <label style={styles.label}>Select Role</label>
          <select
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            style={styles.input}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {/* Doctor login note */}
          {loginType === "doctor" && (
            <div style={styles.noteBox}>
              <p style={styles.noteText}>
                📝 Doctor login will be implemented soon. Please select Patient for now.
              </p>
            </div>
          )}

          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your phone number"
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
            required
          />

          <div style={styles.forgotWrapper}>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(loginType === "doctor" ? styles.disabledButton : {})
            }} 
            disabled={loading || loginType === "doctor"}
          >
            {loading ? "Logging in..." : loginType === "doctor" ? "Coming Soon" : "Login 🚀"}
          </button>

          {loginType === "patient" && (
            <p style={styles.signupText}>
              Don't have an account?{" "}
              <span
                style={styles.signupLink}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0e1525",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#f97316", // Consistent with signup
  },
  form: {
    backgroundColor: "#1e293b", // Consistent with signup
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    display: "block",
    color: "#ddd",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #334155",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#0f172a",
    color: "#fff",
    boxSizing: "border-box",
  },
  noteBox: {
    backgroundColor: "#1f2937",
    border: "1px solid #f97316",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "15px",
  },
  noteText: {
    color: "#f97316",
    fontSize: "14px",
    margin: 0,
  },
  forgotWrapper: { 
    textAlign: "right", 
    marginBottom: "15px" 
  },
  forgotLink: {
    fontSize: "14px",
    color: "#f97316",
    textDecoration: "none",
    cursor: "pointer",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f97316",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    textAlign: "center",
    transition: "0.3s",
  },
  disabledButton: {
    backgroundColor: "#6b7280",
    cursor: "not-allowed",
  },
  signupText: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "20px",
    color: "#ccc",
  },
  signupLink: {
    color: "#f97316",
    fontWeight: "bold",
    cursor: "pointer",
  },
};