import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menu.css";

const MenuForm = () => {
  const [catalogueItems, setCatalogueItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mealSlot, setMealSlot] = useState([]);
  const [repeat, setRepeat] = useState("Does not repeat");
  const [offerAsMeal, setOfferAsMeal] = useState(false);
  const setsDate = useParams();
  const [date, setDate] = useState(setsDate);
  const api_base_uri = "http://localhost:5000/";
  const token = localStorage.authToken;
  
  const [pricing, setPricing] = useState({
    sameWeek: "",
    oneWeekBefore: "",
    twoWeekBefore: "",
  });
  const [applicableFor, setApplicableFor] = useState("");

  useEffect(() => {
    fetch(`${api_base_uri}api/catalogues`, {
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setCatalogueItems(data))
      .catch((error) => console.error("Error fetching catalogue:", error));
  }, []);

  const handleItemSelect = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const handleMealSlotChange = (slot) => {
    setMealSlot((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const handlePricingChange = (e, field) => {
    setPricing({
      ...pricing,
      [field]: e.target.value,
    });
  };
  const handleSave = ()=>{
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      selectedItems,
      mealSlot,
      repeat,
      offerAsMeal,
      date,
      pricing,
      applicableFor,
    };
    console.log("Form Data Submitted: ", formData);
  };
  const handleItemRemove = (itemToRemove) => {
    console.log(itemToRemove)
    setSelectedItems(selectedItems.reduce((item) => item.id !== itemToRemove.id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Menu</h2>
      <div className="menu-section">


        <div className="form-options">
          <label>
            <input
              type="checkbox"
              onChange={() => setOfferAsMeal(!offerAsMeal)}
              checked={offerAsMeal}
            />
            Offer As Meal
          </label>
          <div className="selected-menu-items">
          {selectedItems.length > 0 ? (
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>
                  <span className="menu-item-label">{item.name}</span>
                  <span
                    className="remove-icon"
                    onClick={() => handleItemRemove(item)}
                    role="button"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    &times; {/* HTML entity for the multiplication sign (×) */}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items selected.</p>
          )}
        </div>
          <h3>Meal slot</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleMealSlotChange("Lunch")}
              checked={mealSlot.includes("Lunch")}
            />
            Lunch
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleMealSlotChange("Dinner")}
              checked={mealSlot.includes("Dinner")}
            />
            Dinner
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleMealSlotChange("Cafe")}
              checked={mealSlot.includes("Cafe")}
            />
            Cafe
          </label>

          <h3>Repeat</h3>
          <label>
            <input
              type="radio"
              name="repeat"
              value="Does not repeat"
              onChange={(e) => setRepeat(e.target.value)}
              checked={repeat === "Does not repeat"}
            />
            Does not repeat
          </label>
          <label>
            <input
              type="radio"
              name="repeat"
              value="Weekly"
              onChange={(e) => setRepeat(e.target.value)}
              checked={repeat === "Weekly"}
            />
            Weekly
          </label>

          <h3>Date</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <h3>Pricing</h3>
          <div className="pricing">
            <label>
              Same Week:
              <input
                type="text"
                value={pricing.sameWeek}
                onChange={(e) => handlePricingChange(e, "sameWeek")}
              />
            </label>
            <label>
              1 Week Before:
              <input
                type="text"
                value={pricing.oneWeekBefore}
                onChange={(e) => handlePricingChange(e, "oneWeekBefore")}
              />
            </label>
            <label>
              2 Weeks Before:
              <input
                type="text"
                value={pricing.twoWeekBefore}
                onChange={(e) => handlePricingChange(e, "twoWeekBefore")}
              />
            </label>
          </div>
        </div>
        <div className="menu-items">
          <h3>Select Menu Items</h3>
          {catalogueItems.length > 0 ? (
            <ul>
              {catalogueItems.map((item) => (
                <li key={item.id} onClick={() => handleItemSelect(item)}>
                  <img
                    src={`data:image/png;base64,${item.image}`} // Assuming 'image' is the field in the API for the image URL
                    alt={item.name}
                    className="menu-item-image"
                  />
                  <span className="menu-item-label">{item.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading catalogue items...</p>
          )}
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" onClick={handleSave()}  >Save</button>
        <button type="button" onClick={() => console.log("Cancelled")}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
