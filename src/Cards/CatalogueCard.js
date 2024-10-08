import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CatalogueCard = () => {
    const [catalogue, setCatalogue] = useState("");
    const [loading, setLoading] = useState(true);
    const api_base_uri="http://localhost:5000/";    
    const navigate = useNavigate(); 
    const token = localStorage.authToken
    const handleToggleStatus = (id) => {
    setCatalogue((prevCatalogue) =>
      prevCatalogue.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    
    if (confirm) {
      try {
        console.log(`${api_base_uri}/api/catalogues/${id}`,{
          
          headers:{
            authorization:token
          }});
        await axios.delete(`${api_base_uri}/api/catalogues/${id}`,{
          
          headers:{
            authorization:token
          }});
          setCatalogue((prevCatalogue) =>
          prevCatalogue.filter((item) => item.id !== id)
        );
        
        alert("Item deleted successfully.");
      } catch (error) {
        console.error("Error deleting the item:", error);
        alert("Failed to delete the item.");
      }
    }
}

  const handleEdit = (id) => {
  
    navigate(`/edit-catalogue/${id}`,{ headers: {
      'authorization': token
    }});
  };
  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await fetch(`${api_base_uri}api/catalogues`,{ headers: {
            'authorization': token
          }});
        if (!response.ok) {
          throw new Error("Failed to fetch catalogues");
        }
        const data = await response.json();
        setCatalogue(data)

      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogues();
  }, []);

  return (
    <div style={styles.cardContainer}>
    {catalogue.length === 0 ? ( 
      <p>No catalogues available.</p> 
    ) : (
      catalogue.map((item) => (
        <div key={item._id} style={styles.card}>
          <img src={`data:image/png;base64,${item.image}`} alt={item.name} style={styles.image} />
          <h2 style={styles.name}>{item.name}</h2>
          <p style={styles.type}>Type: {item.type}</p>
          <p style={styles.price}>Price: RS:{item.price.toFixed(2)}</p>
          <p style={styles.status}>Status: {item.status}</p>
          <div style={styles.actions}>
            <button
              style={styles.editButton}
              onClick={() => handleEdit(item._id)}
            >
              Edit
            </button>
       
            <button
              style={styles.deleteButton}
              
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button
              style={styles.toggleButton}
              onClick={() => handleToggleStatus(item._id)}
            >
              {item.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>
      ))
    )}

    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },
  card: {
    width: "250px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  type: {
    fontSize: "16px",
    color: "#777",
    margin: "5px 0",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    margin: "5px 0",
  },
  status: {
    fontSize: "16px",
    margin: "5px 0",
    color: "#28a745",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggleButton: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CatalogueCard;
