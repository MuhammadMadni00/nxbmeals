import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const  Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <h2>NXB MEALS</h2>
      <div className="divider">
        <hr
          style={{
            color: "grey",
            backgroundColor: "grey",
            width: 195,
          }}
        />
      </div>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="fas fa-users"></i> Users
          </Link>
        </li>
        <li>
          <Link to="/menu">
            <i className="fas fa-utensils"></i> Menu
          </Link>
        </li>
        {/* <li>
          History
        </li> */}
        <li>
          <Link to="/catalogue">
            <i className="fas fa-book"></i> Catalogue
          </Link>
        </li>
        <li>
          <Link to="/invoicing">
            <i className="fas fa-file-invoice"></i> Invoicing
          </Link>
        </li>
        <li>
          <Link to="/verification">
            <i className="fas fa-check-circle"></i> Verification
          </Link>
        </li>
        <li>
          <Link to="/meal-history">
            <i className="fas fa-history"></i> Meal History
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
