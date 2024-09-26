import React, { useState } from "react";

const QuickVerifyCard = () => {
  const [id, setId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={styles.card}>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <h2 style={styles.heading}>Quick Verify</h2>
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            required
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "22px",
    textAlign: "center",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "10%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginLeft: "75%",
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default QuickVerifyCard;
