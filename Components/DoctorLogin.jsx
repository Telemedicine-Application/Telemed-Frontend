import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorLogin() {
  const navigate = useNavigate();
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
      const res = await fetch("http://127.0.0.1:5004/doctor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("doctor", JSON.stringify(data.doctor));

          toast.success("Doctor login successful! 🎉", {
            duration: 4000,
            position: "top-center",
          });

          setTimeout(() => {
            navigate("/doctor-dashboard", { replace: true });
          }, 1500);
        } else {
          toast.error("No token received from server", {
            duration: 4000,
            position: "top-center",
          });
        }
      } else {
        toast.error(data.error || "Login failed", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Please check the server.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "94vh", backgroundColor: "#0e1525", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", color: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px", color: "#f97316" }}>Doctor Login</h2>
        <form style={{ backgroundColor: "#1a1f2e", padding: "30px", borderRadius: "15px" }} onSubmit={handleSubmit}>
          
          <label>Doctor ID</label>
          <input type="text" name="doctorId" value={formData.doctorId} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#f97316",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              textAlign: "center",
              transition: "0.3s",
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading} // ✅ only disable while request is in progress
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
          
          {loginType === "doctor" && (
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
