import React from "react";
import Sidebar from "../navbar/Sidebar";
import './MealsHistory.css';
import MealData from "./MealsData";
function MealsHistory() {
return(
    <div className="mealshistory-container">
    <Sidebar/>
    <div className="mealshistory-content">
    <h1>Meals History</h1>
    <hr/>
    <MealData/>
    </div>
    </div>
);
}
export default MealsHistory;
