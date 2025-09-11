import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.98) 0%,
        rgba(30, 41, 59, 0.95) 30%,
        rgba(16, 24, 40, 0.98) 70%,
        rgba(15, 23, 42, 0.98) 100%
      ),
      url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "120px 0",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1,
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 2,
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "80px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const titleStyle = {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "800",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: "1.1",
  };

  const subtitleStyle = {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    color: "#cbd5e1",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.7",
  };

  const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "32px",
    marginTop: "60px",
  };

  const getFeatureCardStyle = (index, isHovered) => ({
    background: isHovered 
      ? "rgba(255, 255, 255, 0.12)" 
      : "rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "40px",
    backdropFilter: "blur(20px)",
    border: isHovered 
      ? "1px solid rgba(255, 255, 255, 0.25)" 
      : "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: isHovered
      ? "0 32px 64px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)"
      : "0 25px 50px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? isHovered ? "translateY(-8px)" : "translateY(0)" 
      : "translateY(40px)",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: `${index * 0.1}s`,
    cursor: "pointer",
  });

  const iconContainerStyle = (gradient, isHovered) => ({
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    color: "white",
    marginBottom: "24px",
    boxShadow: isHovered 
      ? "0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)"
      : "0 10px 25px rgba(0, 0, 0, 0.3)",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  const featureTitleStyle = {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "16px",
    background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const featureDescStyle = {
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "1rem",
    marginBottom: "32px",
  };

  const buttonStyle = (gradient, isHovered) => ({
    background: gradient,
    border: "none",
    padding: "14px 28px",
    borderRadius: "50px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: isHovered
      ? "0 12px 24px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)"
      : "0 8px 16px rgba(0, 0, 0, 0.2)",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  const features = [
    {
      icon: "🎥",
      title: "HD Video Consultations",
      description: "Crystal-clear video calls with doctors through our secure, HIPAA-compliant platform. Advanced compression ensures smooth connections even in low-bandwidth rural areas.",
      button: "Start Consultation",
      gradient: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
      action: () => navigate("/consultation")
    },
    {
      icon: "📊",
      title: "Smart Health Records",
      description: "AI-powered digital health records with offline sync capability. Your medical history is always accessible, organized, and secure across all devices.",
      button: "Access Records",
      gradient: "linear-gradient(135deg, #a8e6cf, #4ecdc4)",
      action: () => console.log("Navigate to health records")
    },
    {
      icon: "🔬",
      title: "Prescription Intelligence",
      description: "Advanced OCR technology converts handwritten prescriptions to digital text instantly. Includes drug interaction warnings and dosage verification.",
      button: "Analyze Now",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      action: () => navigate("/prescription-analyzer")
    },
    {
      icon: "💊",
      title: "Real-Time Pharmacy Network",
      description: "Live inventory tracking across 200+ pharmacies. Get instant notifications when your medicines arrive, with price comparison and reservation features.",
      button: "Find Medicines",
      gradient: "linear-gradient(135deg, #ffeaa7, #fab1a0)",
      action: () => console.log("Navigate to medicine availability")
    },
    {
      icon: "🧠",
      title: "AI Health Assistant",
      description: "Advanced symptom analysis powered by medical AI. Multi-language support with voice input capability for comprehensive health assessments.",
      button: "Ask Assistant",
      gradient: "linear-gradient(135deg, #74b9ff, #0984e3)",
      action: () => console.log("Navigate to symptom checker")
    }
  ];

  // Floating background elements
  const FloatingElement = ({ top, left, size, delay }) => (
    <div style={{
      position: "absolute",
      top: top,
      left: left,
      width: size,
      height: size,
      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: `pulse 8s ease-in-out infinite ${delay}s`,
      zIndex: 1,
    }} />
  );

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @media (max-width: 768px) {
        .features-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={overlayStyle}></div>
      
      {/* Floating background elements */}
      <FloatingElement top="10%" left="5%" size="200px" delay="0" />
      <FloatingElement top="60%" left="85%" size="150px" delay="2" />
      <FloatingElement top="30%" left="70%" size="100px" delay="4" />

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            Revolutionary{" "}
            <span style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Healthcare Features
            </span>
          </h2>
          <p style={subtitleStyle}>
            Cutting-edge telemedicine solutions designed for rural communities. 
            Experience the future of healthcare with our AI-powered platform that works 
            seamlessly across all devices and network conditions.
          </p>
        </div>

        <div style={featuresGridStyle} className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              style={getFeatureCardStyle(index, hoveredFeature === index)}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Gradient overlay for hover effect */}
              {hoveredFeature === index && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))",
                  borderRadius: "24px",
                  zIndex: -1,
                }} />
              )}
              
              <div style={iconContainerStyle(feature.gradient, hoveredFeature === index)}>
                {feature.icon}
              </div>
              
              <h3 style={featureTitleStyle}>
                {feature.title}
              </h3>
              
              <p style={featureDescStyle}>
                {feature.description}
              </p>
              
              <button
                style={buttonStyle(feature.gradient, hoveredFeature === index)}
                onClick={feature.action}
                onMouseEnter={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
              >
                {feature.button}
                <span style={{
                  marginLeft: "8px",
                  fontSize: "0.9rem",
                  transition: "transform 0.3s ease",
                  display: "inline-block",
                  transform: hoveredFeature === index ? "translateX(4px)" : "translateX(0)",
                }}>
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}