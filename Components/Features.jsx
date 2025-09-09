import React from "react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📹",
      title: "Video Consultations",
      description:
        "Connect with doctors remotely through secure video calls, reducing the need for long travel.",
      button: "Consult Now",
      color: "#ff6f00",
      action: () => navigate("/consultation")
    },
    {
      icon: "📋",
      title: "Digital Health Records",
      description:
        "Access and update patient records anytime, even offline — ensuring continuity of care in rural areas.",
      button: "View Records",
      color: "#ff8f00",
      action: () => console.log("Navigate to health records")
    },
    {
      icon: "🔍",
      title: "Online Prescription Analyzer",
      description:
        "Upload your prescription image and get clear, readable text instantly. Perfect for understanding handwritten prescriptions.",
      button: "Analyze Prescription",
      color: "#ff9800",
      action: () => navigate("/prescription-analyzer")
    },
    {
      icon: "💊",
      title: "Medicine Availability",
      description:
        "Get real-time updates on medicine stock at nearby pharmacies to avoid unnecessary visits.",
      button: "Check Medicines",
      color: "#ffa000",
      action: () => console.log("Navigate to medicine availability")
    },
    {
      icon: "🤖",
      title: "AI Symptom Checker",
      description:
        "Use an AI-powered assistant to check symptoms quickly, even in low-bandwidth areas.",
      button: "Start Check",
      color: "#ffb300",
      action: () => console.log("Navigate to symptom checker")
    },
  ];

  return (
    <div
      id="features"
      style={{
        backgroundColor: "#1c1c1c", // dark grey background
        padding: "4rem 2rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#ff6f00",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Key Features of Our Telemedicine Platform
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#cccccc",
          maxWidth: "700px",
          margin: "0 auto 3rem auto",
          fontSize: "1.05rem",
        }}
      >
        Empowering rural communities with accessible, affordable, and reliable
        healthcare — anytime, anywhere.
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#2a2a2a", // dark card background
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
              textAlign: "center",
              flex: "1 1 280px",
              maxWidth: "300px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                fontSize: "2rem",
                backgroundColor: feature.color,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                color: "#fff",
              }}
            >
              {feature.icon}
            </div>
            <h3 style={{ color: "#ff8f00", fontWeight: "bold", fontSize: "1.2rem" }}>
              {feature.title}
            </h3>
            <p style={{ color: "#cccccc", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              {feature.description}
            </p>
            <button
              style={{
                backgroundColor: feature.color,
                border: "none",
                padding: "0.6rem 1.5rem",
                borderRadius: "1.5rem",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#e65100")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = feature.color)
              }
              onClick={feature.action}
            >
              {feature.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}