import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("patient");
  const [formData, setFormData] = useState({
    doctorId: "",
    email: "",
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
      const endpoint =
        loginType === "doctor"
          ? "http://127.0.0.1:5004/doctor-login"
          : "http://127.0.0.1:5004/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);

          if (loginType === "doctor") {
            localStorage.setItem("doctor", JSON.stringify(data.doctor));
            navigate("/doctor-dashboard", { replace: true });
          } else {
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard", { replace: true });
          }
        } else {
          alert("No token received from server");
          return;
        }
        alert(`${loginType === "doctor" ? "Doctor" : "Patient"} login successful!`);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
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

          {/* Doctor-specific field */}
          {loginType === "doctor" && (
            <>
              <label style={styles.label}>Doctor ID</label>
              <input
                type="text"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </>
          )}

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.forgotWrapper}>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {loginType === "patient" && (
            <p style={styles.signupText}>
              Don’t have an account?{" "}
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
    minHeight: "94vh",
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
    color: "#ff6600",
  },
  form: {
    backgroundColor: "#1a1f2e",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
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
    border: "1px solid #333",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#0e1525",
    color: "#fff",
  },
  forgotWrapper: { textAlign: "right", marginBottom: "15px" },
  forgotLink: {
    fontSize: "14px",
    color: "#ff6600",
    textDecoration: "none",
    cursor: "pointer",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6600",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    textAlign: "center",
    transition: "0.3s",
  },
  signupText: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "20px",
    color: "#ccc",
  },
  signupLink: {
    color: "#ff6600",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
