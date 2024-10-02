import React, { useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'; // Add custom styles for the dashboard content
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const api_base_uri="http://127.0.0.1:4040/";
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api_base_uri}api/auth/forgot-password`,
        {
          email,
        }
      );
      if (response.status == 200) {
        alert("email sent successfully");
      }
    } catch (err) {}
  };
  return (
    <div className="forgotpassword">
      <h1>Forgot Password</h1>
      <hr
        style={{
          color: "grey",
          backgroundColor: "grey",
          height: 1,
        }}
      />

      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <div className="input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <button type="submit">Send me reset password instruction</button>
      </form>
    </div>
  );
}
export default ForgotPassword;
