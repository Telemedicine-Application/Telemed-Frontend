import React, { useState, useEffect, useRef } from "react";
import emailjs from 'emailjs-com';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // EmailJS configuration (you'll need to set up your EmailJS account)
    const templateParams = {
      title: "Contact Request",      // or formData.subject if you have one
      name: formData.userName,       // match {{name}}
      email: formData.userEmail,     // match {{email}}
      message: formData.message      // match {{message}}
    };


    try {
      // Replace with your EmailJS service ID, template ID, and user ID
      const result = await emailjs.send(
        'service_t6w699i',
        'template_9j7krrc',
        templateParams,
        'tVNOXzXYSuj4uTvl0'
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ userEmail: '', message: '' });
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  const sectionStyle = {
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.98) 0%,
        rgba(30, 41, 59, 0.95) 30%,
        rgba(16, 24, 40, 0.98) 70%,
        rgba(15, 23, 42, 0.98) 100%
      ),
      url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
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
      radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
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

  const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "start",
  };

  const leftSectionStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
  };

  const leftTitleStyle = {
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
    alignItems: "center",
    gap: "20px",
    marginBottom: "32px",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const iconStyle = (gradient) => ({
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    color: "white",
    flexShrink: 0,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
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
    fontSize: "0.95rem",
  };

  const ctaButtonStyle = {
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    border: "none",
    padding: "16px 32px",
    borderRadius: "50px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginTop: "32px",
    boxShadow: "0 12px 24px rgba(6, 182, 212, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  };

  const formCardStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "40px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(50px)",
    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
  };

  const formTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "32px",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const emailDisplayStyle = {
    background: "rgba(6, 182, 212, 0.1)",
    border: "1px solid rgba(6, 182, 212, 0.3)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
    color: "#06b6d4",
    fontSize: "1rem",
    fontWeight: "600",
  };

  const labelStyle = {
    display: "block",
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    marginBottom: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    background: isSubmitting
      ? "linear-gradient(135deg, #64748b, #475569)"
      : "linear-gradient(135deg, #06b6d4, #3b82f6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 16px rgba(6, 182, 212, 0.3)",
    position: "relative",
    overflow: "hidden",
  };

  const statusMessageStyle = (type) => ({
    padding: "12px",
    borderRadius: "8px",
    marginTop: "16px",
    textAlign: "center",
    fontWeight: "600",
    background: type === 'success'
      ? "rgba(34, 197, 94, 0.1)"
      : "rgba(239, 68, 68, 0.1)",
    color: type === 'success' ? "#22c55e" : "#ef4444",
    border: `1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
  });

  const features = [
    {
      icon: "📱",
      title: "24/7 Telemedicine Access",
      description: "Round-the-clock medical consultations available on all devices",
      gradient: "linear-gradient(135deg, #ff6b6b, #ee5a24)"
    },
    {
      icon: "🌐",
      title: "Multi-Language Support",
      description: "Seamless experience in Punjabi, Hindi, and English",
      gradient: "linear-gradient(135deg, #a8e6cf, #4ecdc4)"
    },
    {
      icon: "🚨",
      title: "Emergency Response",
      description: "Instant emergency alerts and rapid medical assistance",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)"
    },
    {
      icon: "🤝",
      title: "Community Healthcare",
      description: "Serving 173+ villages with dedicated rural healthcare solutions",
      gradient: "linear-gradient(135deg, #74b9ff, #0984e3)"
    }
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.1); }
      }
      
      .feature-item:hover {
        background: rgba(255, 255, 255, 0.12) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-2px);
      }
      
      .cta-button:hover {
        transform: scale(1.05);
        box-shadow: 0 16px 32px rgba(6, 182, 212, 0.4) !important;
      }
      
      .submit-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(6, 182, 212, 0.4) !important;
      }
      
      .form-input:focus {
        border-color: rgba(6, 182, 212, 0.5) !important;
        box-shadow: 0 0 20px rgba(6, 182, 212, 0.2) !important;
      }
      
      @media (max-width: 768px) {
        .content-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={overlayStyle}></div>

      {/* Floating background elements */}
      <FloatingElement top="15%" left="10%" size="200px" delay="0" />
      <FloatingElement top="70%" left="80%" size="150px" delay="3" />

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            Ready to Transform{" "}
            <span style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Rural Healthcare?
            </span>
          </h2>
          <p style={subtitleStyle}>
            Join the healthcare revolution that's connecting rural communities with
            world-class medical care. Get in touch to learn more about our telemedicine solutions.
          </p>
        </div>

        <div style={contentGridStyle} className="content-grid">
          {/* Left Section */}
          <div style={leftSectionStyle}>
            <h3 style={leftTitleStyle}>Why Choose SehatSaathi?</h3>

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

            <button
              style={ctaButtonStyle}
              className="cta-button"
              onClick={() => window.open('tel:+911234567890', '_self')}
            >
              Call Us Now: +91 12345 67890
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>📞</span>
            </button>
          </div>

          {/* Contact Form */}
          <div style={formCardStyle}>
            <h3 style={formTitleStyle}>Get In Touch</h3>

            <div style={emailDisplayStyle}>
              <strong>Our Email:</strong> sehatsaathi2025@gmail.com
            </div>

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Your Email Address</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                style={inputStyle}
                className="form-input"
                required
              />

              <label style={labelStyle}>Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                style={textareaStyle}
                className="form-input"
                required
              />

              <button
                type="submit"
                style={submitButtonStyle}
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ marginRight: "8px" }}>⏳</span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <span style={{ marginLeft: "8px" }}>🚀</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div style={statusMessageStyle('success')}>
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={statusMessageStyle('error')}>
                  ❌ Failed to send message. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}