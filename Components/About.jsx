import React from "react";

export default function About() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    alignItems: "flex-start",
    padding: "80px 10px",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const leftColStyle = {
    flex: "1 1 150px",
    maxWidth: "500px",
  };

  const rightColStyle = {
    flex: "1 1 300px",
    backgroundColor: "#1f1f1f",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    padding: "30px",
    textAlign: "center",
  };

  const sectionTitleStyle = {
    fontSize: "2.2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#00DFA2",
    marginBottom: "10px",
  };

  const sectionSubtitleStyle = {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#ccc",
    marginBottom: "50px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.6",
  };

  const featureTitleStyle = {
    fontWeight: "bold",
    color: "#00DFA2",
    marginBottom: "5px",
  };

  const featureRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "25px",
  };

  const iconBoxStyle = (bgColor) => ({
    backgroundColor: bgColor,
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45px",
    height: "45px",
    fontSize: "1.2rem",
    color: "#fff",
  });

  const statGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    marginTop: "20px",
  };

  const statBoxStyle = {
    textAlign: "center",
  };

  const statNumberStyle = {
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#ff7a00",
    marginBottom: "5px",
  };

  const statLabelStyle = {
    fontSize: "0.95rem",
    color: "#bbb",
  };

  return (
    <section
      id="about"
      style={{ backgroundColor: "#121212", padding: "70px 0" }}
    >
      <h2 style={sectionTitleStyle}>Why TeleMed for Nabha?</h2>
      <p style={sectionSubtitleStyle}>
        Bridging the healthcare gap for 173 rural villages. Secure telemedicine
        access, real-time medicine updates, and multilingual support – built for
        communities that need it the most.
      </p>

      <div style={containerStyle}>
        {/* Left Column */}
        <div style={leftColStyle}>
          <h3
            style={{
              color: "#00DFA2",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Smarter Healthcare, Closer to Home
          </h3>

          <div style={featureRowStyle}>
            <div style={iconBoxStyle("#1f1f1f")}>🔒</div>
            <div>
              <p style={featureTitleStyle}>Secure & Private</p>
              <p style={{ color: "#ddd" }}>
                All patient data is encrypted, accessible only to you and your
                doctor.
              </p>
            </div>
          </div>

          <div style={featureRowStyle}>
            <div style={iconBoxStyle("#1f1f1f")}>🌐</div>
            <div>
              <p style={featureTitleStyle}>Multilingual Support</p>
              <p style={{ color: "#ddd" }}>
                Available in Punjabi, Hindi, and English for better accessibility.
              </p>
            </div>
          </div>

          <div style={featureRowStyle}>
            <div style={iconBoxStyle("#1f1f1f")}>⚡</div>
            <div>
              <p style={featureTitleStyle}>AI Symptom Checker</p>
              <p style={{ color: "#ddd" }}>
                Works even in low bandwidth areas to guide patients quickly.
              </p>
            </div>
          </div>

          <div style={featureRowStyle}>
            <div style={iconBoxStyle("#1f1f1f")}>💊</div>
            <div>
              <p style={featureTitleStyle}>Medicine Availability</p>
              <p style={{ color: "#ddd" }}>
                Real-time updates from local pharmacies to save time & travel.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={rightColStyle}>
          <h4
            style={{
              color: "#00DFA2",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Measurable Impact
          </h4>

          <div style={statGridStyle}>
            <div style={statBoxStyle}>
              <p style={statNumberStyle}>173+</p>
              <p style={statLabelStyle}>Villages Served</p>
            </div>
            <div style={statBoxStyle}>
              <p style={statNumberStyle}>50%</p>
              <p style={statLabelStyle}>Reduced Travel</p>
            </div>
            <div style={statBoxStyle}>
              <p style={statNumberStyle}>24/7</p>
              <p style={statLabelStyle}>Doctor Access</p>
            </div>
            <div style={statBoxStyle}>
              <p style={statNumberStyle}>4.8</p>
              <p style={statLabelStyle}>User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
