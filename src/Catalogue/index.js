import React from "react";
import Sidebar from "../navbar/Sidebar";
import './Catalogue.css';
import CatalogueCard from "../Cards/CatalogueCard";
function Catalogue() {
return(
    <div className="catalogue-container">
    <Sidebar/>
    <div className="catalogue-content">
    <h1>Manage Catalogue</h1>
    <hr/>
    <CatalogueCard/>

    </div>
    </div>
);
}
export default Catalogue;
