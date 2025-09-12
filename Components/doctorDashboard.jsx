import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayAppointments: 8,
    pendingConsultations: 12,
    totalPatients: 245,
    
  });

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

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctor");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading your dashboard...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <p style={styles.errorText}>Doctor data not found!</p>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.brand}>
            <span style={styles.brandIcon}>🏥</span>
            Sehat Saathi
          </div>
        </div>
        <div style={styles.navRight}>
          <div style={styles.notificationBadge}>
            <span style={styles.notificationIcon}>🔔</span>
            <span style={styles.notificationCount}>3</span>
          </div>
          <div style={styles.profileContainer}>
            <div style={styles.profileInfo}>
              <span style={styles.doctorName}>Dr. {doctor.fullname}</span>
              <span style={styles.doctorSpecialization}>{doctor.specialization}</span>
            </div>
            <img
              src={doctor.profilePic || "https://via.placeholder.com/50"}
              alt="Profile"
              style={styles.profileImage}
            />
            <button style={styles.logoutButton} onClick={handleLogout}>
              🚪
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Welcome Header */}
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>Hello, Dr. {doctor.fullname}! 👋</h1>
            <p style={styles.welcomeSubtitle}>
              Ready to help your patients today? Here's your dashboard overview.
            </p>
          </div>
          <div style={styles.dateTimeCard}>
            <div style={styles.currentDate}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div style={styles.currentTime}>
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        {/* Doctor Info Card */}
        <div style={styles.doctorInfoCard}>
          <div style={styles.doctorAvatar}>
            <img
              src={doctor.profilePic || "https://via.placeholder.com/120"}
              alt="Doctor Profile"
              style={styles.doctorAvatarImg}
            />
            <div style={styles.onlineStatus}></div>
          </div>
          <div style={styles.doctorDetails}>
            <h2 style={styles.doctorFullName}>Dr. {doctor.fullname}</h2>
            <div style={styles.doctorBadges}>
              <span style={styles.badge}>{doctor.specialization}</span>
              <span style={styles.badge}>{doctor.degree}</span>
            </div>
            <div style={styles.doctorMetrics}>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Experience</span>
                <span style={styles.metricValue}>{doctor.experience || '5+'} Years</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Rating</span>
                <span style={styles.metricValue}>⭐ 4.8/5</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Patients Helped</span>
                <span style={styles.metricValue}>1,200+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📅</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>{stats.todayAppointments}</h3>
              <p style={styles.statLabel}>Today's Appointments</p>
            </div>
            <div style={styles.statTrend}>+2 from yesterday</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏳</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>{stats.pendingConsultations}</h3>
              <p style={styles.statLabel}>Pending Consultations</p>
            </div>
            <div style={styles.statTrend}>3 urgent</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>{stats.totalPatients}</h3>
              <p style={styles.statLabel}>Total Patients</p>
            </div>
            <div style={styles.statTrend}>+15 this month</div>
          </div>

          
        </div>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <button style={styles.actionCard} onClick={() => navigate('/appointments')}>
              <div style={styles.actionIcon}>📋</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>View Appointments</h4>
                <p style={styles.actionDesc}>Manage your daily schedule</p>
              </div>
            </button>

            <button style={styles.actionCard} onClick={() => navigate('/consultations')}>
              <div style={styles.actionIcon}>🩺</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>Start Consultation</h4>
                <p style={styles.actionDesc}>Begin patient consultation</p>
              </div>
            </button>

            <button style={styles.actionCard} onClick={() => navigate('/patients')}>
              <div style={styles.actionIcon}>👥</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>Patient Records</h4>
                <p style={styles.actionDesc}>Access patient history</p>
              </div>
            </button>

            <button style={styles.actionCard} onClick={() => navigate('/prescriptions')}>
              <div style={styles.actionIcon}>💊</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>Prescriptions</h4>
                <p style={styles.actionDesc}>Write & manage prescriptions</p>
              </div>
            </button>

            <button style={styles.actionCard} onClick={() => navigate('/reports')}>
              <div style={styles.actionIcon}>📊</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>Analytics</h4>
                <p style={styles.actionDesc}>View practice insights</p>
              </div>
            </button>

            <button style={styles.actionCard} onClick={() => navigate('/settings')}>
              <div style={styles.actionIcon}>⚙️</div>
              <div style={styles.actionContent}>
                <h4 style={styles.actionTitle}>Settings</h4>
                <p style={styles.actionDesc}>Manage preferences</p>
              </div>
            </button>
          </div>
        </div>

        {/* Today's Schedule */}
        <div style={styles.scheduleSection}>
          <h3 style={styles.sectionTitle}>Today's Schedule</h3>
          <div style={styles.scheduleCard}>
            <div style={styles.appointmentItem}>
              <div style={styles.appointmentTime}>9:00 AM</div>
              <div style={styles.appointmentDetails}>
                <h4 style={styles.patientName}>Rajesh Kumar</h4>
                <p style={styles.appointmentType}>Regular Checkup • Room 101</p>
              </div>
              <div style={styles.appointmentStatus}>Confirmed</div>
            </div>

            <div style={styles.appointmentItem}>
              <div style={styles.appointmentTime}>10:30 AM</div>
              <div style={styles.appointmentDetails}>
                <h4 style={styles.patientName}>Priya Sharma</h4>
                <p style={styles.appointmentType}>Follow-up • Video Call</p>
              </div>
              <div style={styles.appointmentStatus}>In Progress</div>
            </div>

            <div style={styles.appointmentItem}>
              <div style={styles.appointmentTime}>2:00 PM</div>
              <div style={styles.appointmentDetails}>
                <h4 style={styles.patientName}>Amit Singh</h4>
                <p style={styles.appointmentType}>Consultation • Room 102</p>
              </div>
              <div style={styles.appointmentStatus}>Upcoming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f4ff",
    minHeight: "100vh",
    color: "#1e293b",
  },

  // Loading States
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4ff",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#64748b",
    fontWeight: "500",
  },

  // Error States
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4ff",
    textAlign: "center",
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  errorText: {
    fontSize: "20px",
    color: "#ef4444",
    marginBottom: "30px",
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  // Navigation
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    padding: "16px 32px",
    boxShadow: "0 4px 20px rgba(79, 70, 229, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  brandIcon: {
    fontSize: "28px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  notificationBadge: {
    position: "relative",
    cursor: "pointer",
  },
  notificationIcon: {
    fontSize: "24px",
    color: "white",
  },
  notificationCount: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  doctorName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
  },
  doctorSpecialization: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.8)",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(255, 255, 255, 0.3)",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },

  // Main Content
  mainContent: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  // Welcome Section
  welcomeSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    backgroundColor: "white",
    padding: "24px 32px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
    border: "1px solid #e0e7ff",
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  welcomeSubtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
  },
  dateTimeCard: {
    backgroundColor: "#f8faff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #e0e7ff",
  },
  currentDate: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "4px",
  },
  currentTime: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#4f46e5",
  },

  // Doctor Info Card
  doctorInfoCard: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "16px",
    marginBottom: "32px",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
    border: "1px solid #e0e7ff",
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  doctorAvatar: {
    position: "relative",
  },
  doctorAvatarImg: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #e0e7ff",
  },
  onlineStatus: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    width: "20px",
    height: "20px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    border: "3px solid white",
  },
  doctorDetails: {
    flex: 1,
  },
  doctorFullName: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 16px 0",
  },
  doctorBadges: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },
  badge: {
    backgroundColor: "#ddd6fe",
    color: "#7c3aed",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  doctorMetrics: {
    display: "flex",
    gap: "32px",
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metricLabel: {
    fontSize: "14px",
    color: "#64748b",
  },
  metricValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
    border: "1px solid #e0e7ff",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.3s ease",
  },
  statIcon: {
    fontSize: "40px",
    padding: "16px",
    backgroundColor: "#f8faff",
    borderRadius: "12px",
    border: "1px solid #e0e7ff",
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  statTrend: {
    fontSize: "12px",
    color: "#22c55e",
    backgroundColor: "#dcfce7",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "500",
  },

  // Sections
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },

  // Actions Section
  actionsSection: {
    marginBottom: "40px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  actionCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e0e7ff",
    boxShadow: "0 2px 10px rgba(59, 130, 246, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
  },
  actionIcon: {
    fontSize: "32px",
    padding: "12px",
    backgroundColor: "#f8faff",
    borderRadius: "10px",
    border: "1px solid #e0e7ff",
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  actionDesc: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },

  // Schedule Section
  scheduleSection: {
    marginBottom: "40px",
  },
  scheduleCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
    border: "1px solid #e0e7ff",
    overflow: "hidden",
  },
  appointmentItem: {
    display: "flex",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #f1f5f9",
    gap: "20px",
  },
  appointmentTime: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4f46e5",
    minWidth: "80px",
  },
  appointmentDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  appointmentType: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  appointmentStatus: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
};