import React from "react";

export default function Consultation() {
  const doctors = [
    { name: "Dr. Rajesh Kumar", field: "General Physician" },
    { name: "Dr. Priya Sharma", field: "Cardiologist" },
    { name: "Dr. Amit Singh", field: "Ophthalmologist (Eye)" },
    { name: "Dr. Neha Verma", field: "Dermatologist" },
  ];

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    padding: "20px",
  };

  const tableStyle = {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    overflow: "hidden",
  };

  const headerStyle = {
    backgroundColor: "#0f172a",
    padding: "15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "2px solid #334155",
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    padding: "15px 20px",
    borderBottom: "1px solid #334155",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "#16a34a",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <div style={tableStyle}>
        <div style={headerStyle}>Available Doctors</div>
        {doctors.map((doc, idx) => (
          <div style={rowStyle} key={idx}>
            <span>{doc.name}</span>
            <span>{doc.field}</span>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
              onClick={() => alert(`Calling ${doc.name}...`)}
            >
              📞 Call
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
