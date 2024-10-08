import React, { useState } from "react";
import "./LoginCard.css"; 
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { useNavigate } from "react-router-dom";

function LoginCard() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 
  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };
  const api_base_uri="http://localhost:5000/";

  const handleLogin = async (e) => {
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
            <i className="fas fa-lock"></i> 
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
