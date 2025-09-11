import React, { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Mock navigate function for demonstration
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In your actual app, replace this with: const navigate = useNavigate();
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    background: `
      linear-gradient(135deg, 
        rgba(16, 24, 40, 0.95) 0%,
        rgba(30, 41, 59, 0.9) 50%,
        rgba(15, 23, 42, 0.95) 100%
      ),
      url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 10,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
    minHeight: "100vh",
    padding: "80px 0",
  };

  const contentStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const imageContainerStyle = {
    position: "relative",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
  };

  const titleStyle = {
    fontSize: "clamp(3rem, 6vw, 5rem)",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const highlightStyle = {
    background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    position: "relative",
  };

  const subtitleStyle = {
    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
    color: "#94a3b8",
    fontWeight: "500",
    marginBottom: "32px",
    lineHeight: "1.6",
  };

  const descriptionStyle = {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "#cbd5e1",
    lineHeight: "1.8",
    marginBottom: "48px",
    maxWidth: "600px",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "64px",
  };

  const primaryButtonStyle = {
    background: "linear-gradient(135deg, #2192FF 0%, #0079FF 100%)",
    color: "#ffffff",
    padding: "16px 32px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(33, 146, 255, 0.4)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  };

  const secondaryButtonStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    padding: "16px 32px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const imageCardStyle = {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    transform: "perspective(1000px) rotateY(-5deg) rotateX(2deg)",
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const mainImageStyle = {
    width: "100%",
    height: "500px",
    objectFit: "cover",
    display: "block",
  };

  const floatingCardStyle = {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
    marginTop: "48px",
  };

  const statItemStyle = {
    textAlign: "center",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  };

  const statNumberStyle = {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "block",
    lineHeight: "1",
  };

  const statLabelStyle = {
    color: "#94a3b8",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginTop: "8px",
  };

  // Add custom CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      
      @keyframes slideInLeft {
        0% { opacity: 0; transform: translateX(-100px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      
      .floating-element {
        animation: float 6s ease-in-out infinite;
      }
      
      .hero-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 35px rgba(33, 146, 255, 0.6);
      }
      
      .secondary-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.4);
      }
      
      .image-card:hover {
        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
      }
      
      .stat-item:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
      }
      
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center;
        }
        .stats-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section style={heroStyle}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "300px",
        height: "300px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "pulse 4s ease-in-out infinite",
        zIndex: 1,
      }}></div>
      
      <div style={{
        position: "absolute",
        bottom: "30%",
        right: "15%",
        width: "200px",
        height: "200px",
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "pulse 4s ease-in-out infinite 2s",
        zIndex: 1,
      }}></div>

      <div style={containerStyle}>
        <div style={gridStyle} className="hero-grid">
          {/* Content Section */}
          <div style={contentStyle}>
            <h1 style={titleStyle}>
              Modern Healthcare for{" "}
              <span style={highlightStyle}>Rural India</span>
            </h1>
            
            <p style={subtitleStyle}>
              Connecting villages to world-class medical care through advanced telemedicine
            </p>
            
            <p style={descriptionStyle}>
              Experience seamless healthcare delivery with our AI-powered platform. 
              Get instant consultations, digital prescriptions, and 24/7 medical 
              support designed specifically for rural communities across India.
            </p>
            
            <div style={buttonGroupStyle}>
              <button
                className="hero-button"
                style={primaryButtonStyle}
                onClick={() => navigate('/consultation')}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #0079FF 0%, #006FE6 100%)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #2192FF 0%, #0079FF 100%)";
                }}
              >
                Start Consultation →
              </button>
              
              <button
                className="secondary-button"
                style={secondaryButtonStyle}
              >
                Watch Demo
              </button>
            </div>

            {/* Stats Section */}
            <div style={statsStyle} className="stats-grid">
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>10K+</span>
                <div style={statLabelStyle}>Patients Served</div>
              </div>
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>24/7</span>
                <div style={statLabelStyle}>Available</div>
              </div>
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>98%</span>
                <div style={statLabelStyle}>Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div style={imageContainerStyle}>
            <div 
              style={imageCardStyle}
              className="image-card"
            >
              <img 
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Doctor consultation"
                style={mainImageStyle}
              />
            </div>

            {/* Floating Cards */}
            <div style={{
              ...floatingCardStyle,
              top: "20px",
              left: "-30px",
              width: "180px",
            }} className="floating-element">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}>⚕️</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>
                    Dr. Consultation
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                    Available Now
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              ...floatingCardStyle,
              bottom: "30px",
              right: "-20px",
              width: "200px",
            }} className="floating-element">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}>📱</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>
                    Mobile App
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                    Download Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}