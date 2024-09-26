import React from "react";
import Sidebar from "../navbar/Sidebar";
import "./menu.css";
import Calendar from "./Calendar";
function Menu() {
  return (
    <div className="menu-container">
      <Sidebar />
      <div className="menu-content">
        <h1>Menu</h1>
        <Calendar/>
      </div>

    </div>
  );
}
export default Menu