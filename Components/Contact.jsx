import React from "react";

export default function Contact() {
  return (
    <div id="contact" style={styles.container}>
      <h2 style={styles.heading}>Ready to Start Your Journey? 🚀</h2>
      <p style={styles.subheading}>
        Join thousands of Gen Z users who are already improving their mental health with MindSpace.
      </p>

      <div style={styles.content}>
        {/* Left Column */}
        <div style={styles.left}>
          <h3 style={styles.leftTitle}>Get Started Today 💪</h3>

          <div style={styles.feature}>
            <span style={styles.icon}>📱</span>
            <div>
              <strong>Download the App</strong>
              <p style={styles.text}>Available on iOS and Android</p>
            </div>
          </div>

          <div style={styles.feature}>
            <span style={styles.icon}>💻</span>
            <div>
              <strong>Web Platform</strong>
              <p style={styles.text}>Access from any browser</p>
            </div>
          </div>

          <div style={styles.feature}>
            <span style={styles.icon}>🎧</span>
            <div>
              <strong>24/7 Support</strong>
              <p style={styles.text}>We’re always here when you need us</p>
            </div>
          </div>

          <button style={styles.startButton}>Start Free Trial ✨</button>
        </div>

        {/* Right Column */}
        <div style={styles.right}>
          <h3 style={styles.formTitle}>Questions? We Got Answers 💬</h3>

          <div style={styles.demoNote}>
            <strong>Demo Form:</strong> This is a sample contact form for demonstration purposes.
          </div>

          <form>
            <label>Name</label>
            <input type="text" placeholder="Your name" style={styles.input} />

            <label>Email</label>
            <input type="email" placeholder="your@email.com" style={styles.input} />

            <label>Message</label>
            <textarea
              placeholder="What's on your mind?"
              style={styles.textarea}
            ></textarea>

            <button type="submit" style={styles.sendButton}>
              Send Message 💌
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0D0D0D", // black background
    padding: "100px 70px",
    textAlign: "center",
    color: "#f5f5f5", // light grey text
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#FF6A00", // orange accent
  },
  subheading: {
    fontSize: "16px",
    marginBottom: "40px",
    color: "#bbb", // lighter grey
  },
  content: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  left: {
    flex: "1",
    minWidth: "280px",
    textAlign: "left",
  },
  leftTitle: {
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#FF6A00",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    gap: "10px",
    backgroundColor: "#1a1a1a",
    padding: "10px",
    borderRadius: "10px",
  },
  icon: {
    fontSize: "24px",
    backgroundColor: "#FF6A00",
    padding: "10px",
    borderRadius: "10px",
    color: "#fff",
  },
  text: {
    margin: 0,
    color: "#ccc",
  },
  startButton: {
    marginTop: "20px",
    backgroundColor: "#FF6A00",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  right: {
    flex: "1",
    minWidth: "320px",
    backgroundColor: "#1c1c1c",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "left",
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#FF6A00",
  },
  demoNote: {
    backgroundColor: "#333",
    color: "#FF6A00",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #444",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#0D0D0D",
    color: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "80px",
    marginBottom: "15px",
    border: "1px solid #444",
    borderRadius: "8px",
    outline: "none",
    resize: "none",
    backgroundColor: "#0D0D0D",
    color: "#fff",
  },
  sendButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FF6A00",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
