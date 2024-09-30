import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../navbar/Sidebar";
import "./Catalogue.css";
import CatalogueCard from "../Cards/CatalogueCard";

function Catalogue() {
  const navigate = useNavigate(); 

  const handleAddNew = () => {
    navigate("/add-catalogue"); // Navigate to the Add Catalogue page
  };

  return (
    <div className="catalogue-container">
      <Sidebar />
      <div className="catalogue-content">
        <div className="Catalogue-header">
          <div>
            <h1>Manage Catalogue</h1>
          </div>
          <div>
            <button className="add-new-button" onClick={handleAddNew}>
              Add New
            </button>
          </div>
        </div>
        <hr />
        <CatalogueCard />
      </div>
    </div>
  );
}

export default Catalogue;
