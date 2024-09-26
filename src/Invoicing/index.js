import React from "react";
import Sidebar from "../navbar/Sidebar";
import './Invoicing.css';
function Invoicing() {
return(
    <div className="invoicing-container">
    <Sidebar/>
    <div className="invoicing-content">
    <h1>Invoicing</h1>
    <hr/>
    </div>
    </div>
);
}
export default Invoicing;
