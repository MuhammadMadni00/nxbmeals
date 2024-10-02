import React, { useState } from "react";
import "./LoginCard.css"; // Import the styles for the login card
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useNavigate } from "react-router-dom";

function LoginCard() {
  // State to store username and password input
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use React Router's navigate hook
  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };
  const api_base_uri="https://66c4-116-58-42-68.ngrok-free.app/";

  const handleLogin = async (e) => {
    alert("hi",api_base_uri)
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api_base_uri}api/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("authToken", response.data.token);

      console.log("Username:", email, "Password:", password);
      navigate("/");
    } catch (err) {
      setError("Login failed, please check your credentials");
    }
  };

  return (
    <div className="login-card">
      <h1>NXB Meals</h1>

      <hr
        style={{
          color: "grey",
          backgroundColor: "grey",
          height: 1,
        }}
      />
      <p class="tag-line">Sign in to start session</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <div className="input-icon">
            <i className="fas fa-envelope"></i> {/* Font Awesome Email Icon */}
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

        <div className="form-group">
          <div className="input-icon">
            <i className="fas fa-lock"></i> {/* Font Awesome Password Icon */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="flex-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="custom-checkbox"></span>
            Remember Me
          </label>
          <button type="submit">Login</button>
        </div>
      </form>
      <p className="forgot-password">
        <a href="#" onClick={handleForgotPassword}>
          Forgot your password?
        </a>
      </p>
    </div>
  );
}

export default LoginCard;
