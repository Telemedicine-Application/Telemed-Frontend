import React from "react";
import { FaMobileAlt, FaComments, FaHospital } from "react-icons/fa";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#0d0d0d",
      padding: "50px 20px",
      color: "#fff",
    },
    footerContent: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    section: {
      flex: 1,
      minWidth: "200px",
      marginBottom: "20px",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#ff7a00",
      fontSize: "1.1rem",
      letterSpacing: "0.5px",
    },
    text: {
      color: "#bbb",
      fontSize: "14px",
      margin: "6px 0",
      lineHeight: "1.5",
    },
    link: {
      color: "#bbb",
      fontSize: "14px",
      textDecoration: "none",
      display: "block",
      margin: "6px 0",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#ff7a00",
    },
    icons: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      gap: "12px",
    },
    bottom: {
      textAlign: "center",
      marginTop: "30px",
      color: "#777",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "15px",
      fontSize: "13px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        
        {/* Brand Section */}
        <div style={styles.section}>
          <h3 style={{ color: "#ff7a00", marginBottom: "12px" }}>TeleMed 🩺</h3>
          <p style={styles.text}>
            Bridging healthcare gaps for rural communities in Nabha & beyond.
          </p>
          <p style={styles.text}>
            Secure, accessible, and multilingual telemedicine support.
          </p>
        </div>

        {/* Features */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Features</h4>
          <a href="#" style={styles.link}>Video Consultations</a>
          <a href="#" style={styles.link}>Digital Health Records</a>
          <a href="#" style={styles.link}>AI Symptom Checker</a>
          <a href="#" style={styles.link}>Medicine Availability</a>
        </div>

        {/* Support */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Support</h4>
          <a href="#" style={styles.link}>About Us</a>
          <a href="#" style={styles.link}>Privacy Policy</a>
          <a href="#" style={styles.link}>Terms of Service</a>
          <a href="#" style={styles.link}>Contact</a>
        </div>

        {/* Connect */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Connect With Us</h4>
          <div style={styles.icons}>
            <FaMobileAlt size={24} color="#ff7a00" />
            <FaComments size={24} color="#ff7a00" />
            <FaHospital size={24} color="#ff7a00" />
          </div>
          <p style={styles.text}>
            Follow us for health updates, tips, and TeleMed news.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div style={styles.bottom}>
        © 2025 TeleMed. All rights reserved. Made with ❤️ for better rural healthcare.
      </div>
    </footer>
  );
};

export default Footer;
