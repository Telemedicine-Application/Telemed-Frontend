import React, { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const footerStyle = {
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.98) 0%,
        rgba(30, 41, 59, 0.95) 50%,
        rgba(15, 23, 42, 0.98) 100%
      ),
      url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    position: "relative",
    overflow: "hidden",
    padding: "80px 0 40px 0",
    color: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.95) 0%,
        rgba(30, 41, 59, 0.9) 50%,
        rgba(15, 23, 42, 0.95) 100%
      )
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

  const footerContentStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
    gap: "60px",
    marginBottom: "60px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const brandSectionStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
  };

  const brandTitleStyle = {
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const brandDescStyle = {
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
    marginBottom: "12px",
  };

  const sectionStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const sectionTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const linkStyle = {
    color: "#94a3b8",
    fontSize: "0.95rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "12px 0",
    padding: "8px 0",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "6px",
  };

  const connectSectionStyle = {
    ...sectionStyle,
    transitionDelay: "0.6s",
  };

  const socialIconsStyle = {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  };

  const socialIconStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(10px)",
  };

  const contactInfoStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    marginTop: "20px",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#cbd5e1",
    fontSize: "0.9rem",
    marginBottom: "12px",
  };

  const contactIconStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    color: "white",
  };

  const bottomSectionStyle = {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "40px",
    textAlign: "center",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
  };

  const copyrightStyle = {
    color: "#94a3b8",
    fontSize: "0.9rem",
    lineHeight: "1.6",
  };

  // Add custom CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .footer-link:hover {
        color: #06b6d4 !important;
        transform: translateX(8px);
        background: rgba(6, 182, 212, 0.1);
        padding-left: 12px !important;
      }
      
      .social-icon:hover {
        background: linear-gradient(135deg, #06b6d4, #3b82f6) !important;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
        border-color: rgba(6, 182, 212, 0.3) !important;
        color: white !important;
      }
      
      .contact-info:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
      }
      
      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        .social-icons {
          justify-content: center;
        }
      }
      
      @media (max-width: 1024px) {
        .footer-content {
          grid-template-columns: 1fr 1fr !important;
          gap: 40px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const features = [
    { name: "Video Consultations", icon: "📹" },
    { name: "Digital Health Records", icon: "📋" },
    { name: "AI Symptom Checker", icon: "🤖" },
    { name: "24/7 Support", icon: "🕐" }
  ];

  const support = [
    { name: "About Us", icon: "ℹ️" },
    { name: "Privacy Policy", icon: "🔒" },
    { name: "Terms of Service", icon: "📜" },
    { name: "Contact Support", icon: "💬" },
    
  ];

  return (
    <footer ref={footerRef} style={footerStyle}>
      <div style={overlayStyle}></div>
      
      {/* Floating background elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "200px",
        height: "200px",
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "pulse 8s ease-in-out infinite",
        zIndex: 1,
      }}></div>

      <div style={containerStyle}>
        <div style={footerContentStyle} className="footer-content">
          
          {/* Brand Section */}
          <div style={brandSectionStyle}>
            <h3 style={brandTitleStyle}>
              TeleMed
              <span style={{fontSize: "1.5rem"}}>🩺</span>
            </h3>
            <p style={brandDescStyle}>
              Revolutionizing healthcare delivery for rural communities across India. 
              Connecting patients with quality medical care through innovative telemedicine solutions.
            </p>
            <p style={brandDescStyle}>
              Secure, accessible, and multilingual healthcare support designed 
              specifically for underserved communities.
            </p>

            <div style={contactInfoStyle} className="contact-info">
              <div style={contactItemStyle}>
                <div style={contactIconStyle}>📍</div>
                <span>Nabha, Punjab, India</span>
              </div>
              <div style={contactItemStyle}>
                <div style={contactIconStyle}>📞</div>
                <span>+91 98765 43210</span>
              </div>
              <div style={contactItemStyle}>
                <div style={contactIconStyle}>✉️</div>
                <span>sehatsaathi@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{...sectionStyle, transitionDelay: "0.4s"}}>
            <h4 style={sectionTitleStyle}>Our Services</h4>
            {features.map((feature, index) => (
              <a 
                key={index}
                href="#" 
                style={linkStyle}
                className="footer-link"
              >
                <span style={{fontSize: "1.1rem"}}>{feature.icon}</span>
                {feature.name}
              </a>
            ))}
          </div>

          {/* Support */}
          <div style={{...sectionStyle, transitionDelay: "0.5s"}}>
            <h4 style={sectionTitleStyle}>Support</h4>
            {support.map((item, index) => (
              <a 
                key={index}
                href="#" 
                style={linkStyle}
                className="footer-link"
              >
                <span style={{fontSize: "1.1rem"}}>{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div style={connectSectionStyle}>
            <h4 style={sectionTitleStyle}>Connect With Us</h4>
            
            <div style={socialIconsStyle} className="social-icons">
              <div style={socialIconStyle} className="social-icon">
                📱
              </div>
              <div style={socialIconStyle} className="social-icon">
                💬
              </div>
              <div style={socialIconStyle} className="social-icon">
                🏥
              </div>
              <div style={socialIconStyle} className="social-icon">
                📧
              </div>
            </div>

            <p style={{...brandDescStyle, fontSize: "0.9rem"}}>
              Stay updated with health tips, platform updates, and community news. 
              Join our mission to make healthcare accessible for everyone.
            </p>

            <div style={{
              background: "rgba(6, 182, 212, 0.1)",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "20px",
              border: "1px solid rgba(6, 182, 212, 0.2)",
            }}>
              <div style={{
                color: "#06b6d4",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "8px",
              }}>
               Our Mission
              </div>
              <div style={{
                color: "#cbd5e1",
                fontSize: "0.85rem",
                lineHeight: "1.6",
              }}>
                Bridging healthcare gaps for 173+ villages and empowering rural communities with world-class medical care.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomSectionStyle}>
          <p style={copyrightStyle}>
            © 2025 Sehatsaathi. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;