import React, { useState, useEffect, useRef } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    villages: 0,
    travel: 0,
    rating: 0
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate statistics
          const animateNumber = (key, target, suffix = '') => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setAnimatedStats(prev => ({
                ...prev,
                [key]: key === 'rating' ? current.toFixed(1) : Math.floor(current)
              }));
            }, 40);
          };

          setTimeout(() => {
            animateNumber('villages', 173);
            animateNumber('travel', 50);
            animateNumber('rating', 4.8);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    background: `
      linear-gradient(135deg, 
        rgba(16, 24, 40, 0.98) 0%,
        rgba(30, 41, 59, 0.95) 50%,
        rgba(15, 23, 42, 0.98) 100%
      ),
      url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "120px 0",
    position: "relative",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
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
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const titleStyle = {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "800",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
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

  const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "80px",
    alignItems: "start",
  };

  const featuresStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
  };

  const featuresSectionTitleStyle = {
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "40px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "32px",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const iconStyle = (gradient) => ({
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    color: "white",
    flexShrink: 0,
  });

  const featureTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "8px",
  };

  const featureDescStyle = {
    color: "#cbd5e1",
    lineHeight: "1.6",
  };

  const statsCardStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "40px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    position: "sticky",
    top: "120px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
  };

  const statsCardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "32px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  };

  const statItemStyle = {
    textAlign: "center",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const statNumberStyle = {
    fontSize: "2.2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "block",
    lineHeight: "1",
    marginBottom: "8px",
  };

  const statLabelStyle = {
    color: "#94a3b8",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .feature-item:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-2px);
      }
      
      .stat-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-2px);
      }
      
      @media (max-width: 768px) {
        .content-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        .stats-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const features = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "End-to-end encryption ensures your medical data remains completely private and secure.",
      gradient: "linear-gradient(135deg, #ef4444, #dc2626)"
    },
    {
      icon: "🌐",
      title: "Multilingual Platform",
      description: "Seamless communication in Punjabi, Hindi, and English for better healthcare access.",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },
    {
      icon: "🤖",
      title: "AI Health Assistant",
      description: "Smart symptom analysis and health recommendations powered by advanced AI technology.",
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)"
    },
    {
      icon: "💊",
      title: "Smart Medicine Tracker",
      description: "Real-time pharmacy inventory and medicine availability across your local area.",
      gradient: "linear-gradient(135deg, #10b981, #059669)"
    }
  ];

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={overlayStyle}></div>

      {/* Floating background elements */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "5%",
        width: "250px",
        height: "250px",
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "pulse 6s ease-in-out infinite",
        zIndex: 1,
      }}></div>

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            Why Choose{" "}
            <span style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              TeleMed Nabha?
            </span>
          </h2>
          <p style={subtitleStyle}>
            Revolutionizing healthcare delivery for 173 rural villages with cutting-edge 
            telemedicine technology, real-time medicine tracking, and multilingual support 
            designed specifically for communities that need it most.
          </p>
        </div>

        <div style={contentGridStyle} className="content-grid">
          {/* Features Section */}
          <div style={featuresStyle}>
            <h3 style={featuresSectionTitleStyle}>
              Advanced Healthcare Solutions
            </h3>
            
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  ...featureItemStyle,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.8 + index * 0.2}s`,
                }}
                className="feature-item"
              >
                <div style={iconStyle(feature.gradient)}>
                  {feature.icon}
                </div>
                <div>
                  <h4 style={featureTitleStyle}>{feature.title}</h4>
                  <p style={featureDescStyle}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Card */}
          <div style={statsCardStyle}>
            <h4 style={statsCardTitleStyle}>Real Impact Metrics</h4>
            <div style={statsGridStyle} className="stats-grid">
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>{animatedStats.villages}+</span>
                <div style={statLabelStyle}>Villages Connected</div>
              </div>
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>{animatedStats.travel}%</span>
                <div style={statLabelStyle}>Less Travel Time</div>
              </div>
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>24/7</span>
                <div style={statLabelStyle}>Doctor Availability</div>
              </div>
              <div style={statItemStyle} className="stat-item">
                <span style={statNumberStyle}>{animatedStats.rating}★</span>
                <div style={statLabelStyle}>User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}