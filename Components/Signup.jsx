import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePic: null,
    fullname: "", // Changed from full_name to match backend
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
    language: "English",
    password: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert image to base64 for backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send JSON data instead of FormData since backend expects JSON
      const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message || "Registration successful!");
        setFormData({
          profilePic: null,
          fullname: "",
          phone: "",
          gender: "Male",
          dob: "",
          address: "",
          language: "English",
          password: "",
        });
        setPreview(null);
        navigate("/login");
      } else {
        alert("Error: " + (data.message || data.mesaage || "Registration failed"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error! Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register for Telemedicine 🏥</h2>
      <p style={styles.subheading}>
        Connect with doctors online and access healthcare from your village.
      </p>

      <div style={styles.formWrapper}>
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div style={styles.profileContainer}>
            <div style={styles.imageWrapper}>
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  style={styles.profileImage}
                />
              ) : (
                <div style={styles.placeholder}>+</div>
              )}
            </div>
            <label style={styles.uploadButton}>
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.row}>
            <div style={styles.rowItem}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.input}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div style={styles.rowItem}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Preferred Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={styles.input}
          >
            <option>English</option>
            <option>Punjabi</option>
            <option>Hindi</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Registering..." : "Sign Up 🚀"}
          </button>

          <p style={styles.loginText}>
            Already registered?{" "}
            <span style={styles.loginLink} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0e1525",
    minHeight: "100vh", // Changed from height to minHeight
    padding: "40px 20px",
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#f97316",
  },
  subheading: { fontSize: "16px", marginBottom: "30px", color: "#ccc" },
  formWrapper: { display: "flex", justifyContent: "center" },
  form: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #334155",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#0f172a",
    color: "#fff",
    boxSizing: "border-box", // Added for better sizing
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  rowItem: {
    flex: 1,
  },
  profileContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  imageWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 10px",
    backgroundColor: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #f97316",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    fontSize: "32px",
    color: "#ccc",
  },
  uploadButton: {
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#f97316",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
  },
  submitButton: {
    width: "50%",
    padding: "12px",
    backgroundColor: "#f97316",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    display: "block",
    margin: "20px auto 0",
    textAlign: "center",
    transition: "0.3s",
  },
  loginText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#ccc",
  },
  loginLink: {
    color: "#f97316",
    fontWeight: "bold",
    cursor: "pointer",
  },
};