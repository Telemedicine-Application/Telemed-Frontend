import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user data:", err);
        toast.error("Error loading user data");
        navigate("/login");
      }
    } else {
      toast.error("User data not found!");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.errorWrapper}>
        <p style={styles.errorText}>Unable to load user data</p>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      {/* Top Header */}
      <div style={styles.topHeader}>
        <h1 style={styles.pageTitle}>Patient Dashboard</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        {/* Patient Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatarSection}>
              <div style={styles.avatarWrapper}>
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={styles.avatar}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>
              <div style={styles.statusBadge}>
                <span style={styles.statusDot}></span>
                Active Patient
              </div>
            </div>
            
            <div style={styles.profileDetails}>
              <h2 style={styles.patientName}>{user.fullname || "Patient Name"}</h2>
              <p style={styles.patientId}>Patient ID: #PAT{Date.now().toString().slice(-6)}</p>
              
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>📞 Phone</span>
                  <span style={styles.detailValue}>{user.phone || "Not provided"}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>📧 Email</span>
                  <span style={styles.detailValue}>{user.email || "Not provided"}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>🎂 Date of Birth</span>
                  <span style={styles.detailValue}>{formatDate(user.dateOfBirth)}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>🌐 Language</span>
                  <span style={styles.detailValue}>{user.language || "English"}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>⚧ Gender</span>
                  <span style={styles.detailValue}>{user.gender || "Not specified"}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>🏠 Address</span>
                  <span style={styles.detailValue}>{user.address || "Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <div style={styles.actionCard} onClick={() => navigate("/consultation")}>
              <div style={styles.actionIcon}>💬</div>
              <h4 style={styles.actionTitle}>New Consultation</h4>
              <p style={styles.actionDesc}>Start a new medical consultation</p>
            </div>
            
            <div style={styles.actionCard} onClick={() => navigate("/appointments")}>
              <div style={styles.actionIcon}>📅</div>
              <h4 style={styles.actionTitle}>Appointments</h4>
              <p style={styles.actionDesc}>View and manage appointments</p>
            </div>
            
            <div style={styles.actionCard} onClick={() => navigate("/reports")}>
              <div style={styles.actionIcon}>📊</div>
              <h4 style={styles.actionTitle}>Medical Reports</h4>
              <p style={styles.actionDesc}>Access your health reports</p>
            </div>
            
            <div style={styles.actionCard} onClick={() => navigate("/profile-edit")}>
              <div style={styles.actionIcon}>⚙️</div>
              <h4 style={styles.actionTitle}>Edit Profile</h4>
              <p style={styles.actionDesc}>Update your information</p>
            </div>
          </div>
        </div>

        {/* Health Overview */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Health Overview</h3>
          <div style={styles.healthGrid}>
            <div style={styles.healthCard}>
              <div style={styles.healthIcon}>💊</div>
              <div>
                <h4 style={styles.healthTitle}>Prescriptions</h4>
                <p style={styles.healthValue}>3 Active</p>
              </div>
            </div>
            
            <div style={styles.healthCard}>
              <div style={styles.healthIcon}>🩺</div>
              <div>
                <h4 style={styles.healthTitle}>Consultations</h4>
                <p style={styles.healthValue}>12 Total</p>
              </div>
            </div>
            
            <div style={styles.healthCard}>
              <div style={styles.healthIcon}>🔬</div>
              <div>
                <h4 style={styles.healthTitle}>Lab Reports</h4>
                <p style={styles.healthValue}>5 Available</p>
              </div>
            </div>
            
            <div style={styles.healthCard}>
              <div style={styles.healthIcon}>📈</div>
              <div>
                <h4 style={styles.healthTitle}>Vitals</h4>
                <p style={styles.healthValue}>Updated Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Recent Consultations</h3>
          <div style={styles.activityCard}>
            {/* Sample data - replace with actual API data */}
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}></div>
              <div style={styles.activityDetails}>
                <h4 style={styles.activityTitle}>Dr. Rajesh Sharma</h4>
                <p style={styles.activityDesc}>General Physician • Video Consultation</p>
                <span style={styles.activityTime}>September 10, 2025 at 2:30 PM</span>
              </div>
              <div style={styles.activityStatus}>Completed</div>
            </div>
            
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}></div>
              <div style={styles.activityDetails}>
                <h4 style={styles.activityTitle}>Dr. Priya Mehta</h4>
                <p style={styles.activityDesc}>Cardiologist • In-person Visit</p>
                <span style={styles.activityTime}>September 2, 2025 at 11:00 AM</span>
              </div>
              <div style={styles.activityStatus}>Completed</div>
            </div>
            
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}></div>
              <div style={styles.activityDetails}>
                <h4 style={styles.activityTitle}>Dr. Amit Singh</h4>
                <p style={styles.activityDesc}>Dermatologist • Video Consultation</p>
                <span style={styles.activityTime}>August 25, 2025 at 4:15 PM</span>
              </div>
              <div style={styles.activityStatus}>Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    paddingTop: "80px", // Account for fixed navbar
  },
  
  loadingWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #f97316",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  
  loadingText: {
    color: "#64748b",
    fontSize: "16px",
  },
  
  errorWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  
  errorText: {
    color: "#ef4444",
    fontSize: "18px",
  },
  
  topHeader: {
    backgroundColor: "#ffffff",
    padding: "20px 40px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  
  profileHeader: {
    display: "flex",
    gap: "30px",
    alignItems: "flex-start",
  },
  
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  
  avatarWrapper: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid #f97316",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  
  avatarPlaceholder: {
    color: "#f97316",
    fontSize: "48px",
    fontWeight: "bold",
  },
  
  statusBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  
  statusDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
  },
  
  profileDetails: {
    flex: 1,
  },
  
  patientName: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },
  
  patientId: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "25px",
  },
  
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  
  detailLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },
  
  detailValue: {
    fontSize: "16px",
    color: "#1e293b",
    fontWeight: "600",
  },
  
  section: {
    marginBottom: "40px",
  },
  
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },
  
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  
  actionCard: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  
  actionIcon: {
    fontSize: "40px",
    marginBottom: "15px",
  },
  
  actionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },
  
  actionDesc: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  
  healthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  
  healthCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  
  healthIcon: {
    fontSize: "32px",
  },
  
  healthTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 5px 0",
  },
  
  healthValue: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#f97316",
    margin: 0,
  },
  
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  
  activityItem: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #f1f5f9",
  },
  
  activityIcon: {
    fontSize: "32px",
    padding: "10px",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
  },
  
  activityDetails: {
    flex: 1,
  },
  
  activityTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 5px 0",
  },
  
  activityDesc: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 5px 0",
  },
  
  activityTime: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  
  activityStatus: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
};