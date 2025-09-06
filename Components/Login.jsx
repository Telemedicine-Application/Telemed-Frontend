import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await fetch("http://127.0.0.1:5004/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          alert("No token received from server");
          return;
        }

        alert("Login successful!");
        navigate("/dashboard", { replace: true }); // redirect after login
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
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subheading}>Login to your Telemed account</p>

        <div style={styles.formWrapper}>
          <form style={styles.form} onSubmit={handleSubmit}>
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

            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={styles.signupText}>
              Don’t have an account?{" "}
              <span
                style={styles.signupLink}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
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
    marginBottom: "10px",
    color: "#ff6600",
  },
  subheading: { fontSize: "16px", marginBottom: "30px", color: "#ccc" },
  formWrapper: { display: "flex", justifyContent: "center" },
  form: {
    backgroundColor: "#1a1f2e",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
  },
  label: { fontSize: "14px", marginBottom: "5px", display: "block", color: "#ddd" },
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
  forgotWrapper: {
    textAlign: "right",
    marginBottom: "15px",
  },
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
