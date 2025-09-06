import React from "react";

export default function Hero() {
  const heroStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #0d0d0d, #1c1c1c, #2e2e2e)", // Black → dark grey
    padding: "20px",
    color: "#fff",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px",
  };

  const descriptionStyle = {
    maxWidth: "700px",
    fontSize: "1.1rem",
    color: "#cccccc", // Light grey text
    lineHeight: "1.6",
    marginBottom: "30px",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const primaryButtonStyle = {
    backgroundColor: "#ff6f00", // Orange accent
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "30px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(255, 111, 0, 0.4)",
    transition: "all 0.3s ease",
  };

  const secondaryButtonStyle = {
    backgroundColor: "transparent",
    color: "#ff6f00",
    padding: "12px 28px",
    borderRadius: "30px",
    border: "2px solid #ff6f00",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <section style={heroStyle}>
      <h1 style={headingStyle}>
        Bridging Healthcare Gaps for{" "}
        <span style={{ color: "#ff6f00" }}>Rural Communities</span>
      </h1>
      <h3
        style={{
          fontSize: "1.3rem",
          fontWeight: "500",
          marginBottom: "15px",
          color: "#aaaaaa", // Soft grey subheading
        }}
      >
        Telemedicine Access for Nabha & Surrounding Villages
      </h3>
      <p style={descriptionStyle}>
        Connect with doctors anytime, anywhere. Our telemedicine platform offers
        secure video consultations, offline health records, real-time medicine
        updates, and AI-powered symptom checks — making healthcare affordable
        and accessible for rural India.
      </p>
      <div style={buttonContainerStyle}>
        <button
          style={primaryButtonStyle}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#e65100")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#ff6f00")
          }
        >
          Start Consultation
        </button>
        <button
          style={secondaryButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff6f00";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ff6f00";
          }}
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
