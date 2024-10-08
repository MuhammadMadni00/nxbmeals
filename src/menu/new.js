import React from "react";
import Sidebar from "../navbar/Sidebar";
import "./menu.css";
import Calendar from "./Calendar";
import MenuForm from "./addMenuForm";

function AddMeal() {
  return (
    <div className="menu-container">
      <Sidebar />
      <div className="menu-content">
        <h1>Menu</h1>
        <hr/>
        <addMenuForm/>
        <MenuForm/>
      </div>

    </div>
  );
}
export default AddMeal