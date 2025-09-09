import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        } else {
          alert("No token received from server");
          return;
        }
        alert("Doctor login successful!");
        navigate("/doctor-dashboard", { replace: true });
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
    <div style={{ minHeight: "94vh", backgroundColor: "#0e1525", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", color: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px", color: "#ff6600" }}>Doctor Login</h2>
        <form style={{ backgroundColor: "#1a1f2e", padding: "30px", borderRadius: "15px" }} onSubmit={handleSubmit}>
          <label>Doctor ID</label>
          <input type="text" name="doctorId" value={formData.doctorId} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "12px", marginBottom: "15px" }} />

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", backgroundColor: "#ff6600", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
