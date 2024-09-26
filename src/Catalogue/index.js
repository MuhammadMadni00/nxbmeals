import React from "react";
import Sidebar from "../navbar/Sidebar";
import UserCard from "../Cards/UserCard";
import './Catalogue.css';
function Catalogue() {
return(
    <div className="catalogue-container">
    <Sidebar/>
    <div className="catalogue-content">
    <h1>Catalogue</h1>
    <hr/>
    </div>
    </div>
);
}
export default Catalogue;
