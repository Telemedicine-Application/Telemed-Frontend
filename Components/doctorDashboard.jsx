import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from localStorage (make sure this matches login)
    const token = localStorage.getItem("doctorToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch doctor data from backend
    fetch("http://localhost:5004/api/auth/check-auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDoctor(data.doctor);
          // Save doctor info in localStorage for Navbar
          localStorage.setItem("doctor", JSON.stringify(data.doctor));
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error fetching doctor data:", err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!doctor) {
    return <div style={styles.error}>Doctor data not found!</div>;
  }

  return (
    <div style={styles.container}>
      {/* Navbar with doctor info */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>Telemedicine</div>
        <div style={styles.profileContainer}>
          <span style={styles.name}>{doctor.fullname}</span>
          <img
            src={doctor.profilePic || "https://via.placeholder.com/40"}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
      </nav>

      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcome}>Welcome, Dr. {doctor.fullname}!</h1>
        <p style={styles.info}>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p style={styles.info}>
          <strong>Degree:</strong> {doctor.degree}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: "10px 20px",
    color: "#fff",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  name: {
    fontSize: "16px",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  welcomeSection: {
    textAlign: "center",
    marginTop: "50px",
  },
  welcome: {
    fontSize: "28px",
    color: "#1e293b",
  },
  info: {
    fontSize: "18px",
    color: "#334155",
    margin: "10px 0",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "20px",
  },
  error: {
    textAlign: "center",
    padding: "50px",
    fontSize: "20px",
    color: "red",
  },
};
