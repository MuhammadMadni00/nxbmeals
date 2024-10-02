import React from "react";
import Sidebar from "../navbar/Sidebar";
import './Invoicing.css';
import MealTable from "./MealTable";
function Invoicing() {
return(
    <div className="invoicing-container">
    <Sidebar/>
    <div className="invoicing-content">
    <h1>Invoicing</h1>
    <hr/>
    <MealTable/>
    </div>
    </div>
);
}
export default Invoicing;
