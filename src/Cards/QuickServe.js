import React, { useState } from 'react';

const QuickServeCard = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [mealSlot, setMealSlot] = useState('');
  const [selectedMeals, setSelectedMeals] = useState({});
  const api_base_uri="https://66c4-116-58-42-68.ngrok-free.app/";

  const meals = [
    { name: 'Biryani', price: 200 },
    { name: 'Chicken Karahi', price: 300 },
    { name: 'Grilled Fish', price: 400 },
  ];

  const handleMealChange = (mealName, isChecked, qty) => {
    setSelectedMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals };
      if (isChecked) {
        updatedMeals[mealName] = { qty, price: qty * meals.find(meal => meal.name === mealName).price };
      } else {
        delete updatedMeals[mealName];
      }
      return updatedMeals;
    });
  };

  const handleQtyChange = (mealName, qty) => {
    setSelectedMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals };
      if (updatedMeals[mealName]) {
        updatedMeals[mealName].qty = qty;
        updatedMeals[mealName].price = qty * meals.find(meal => meal.name === mealName).price;
      }
      return updatedMeals;
    });
  };

  const calculateTotal = () => {
    return Object.values(selectedMeals).reduce((acc, meal) => acc + meal.price, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create the data object that matches the schema
    // const mealData = {
    //   employee_id: employeeId,
    //   meal_slot: mealSlot,
    //   meals: Object.keys(selectedMeals).map((mealName) => ({
    //     meal_name: mealName,
    //     qty: selectedMeals[mealName].qty,
    //     price: selectedMeals[mealName].price,
    //   })),
    // };
  
    try {
      for (const mealName of Object.keys(selectedMeals)) {
        const mealData = {
          employee_id: employeeId,
          meal_slot: mealSlot,
          meal_name: mealName,
          meal_id: `meal_${Date.now()}`, // Example unique ID for each meal record
          qty: selectedMeals[mealName].qty,
          price: selectedMeals[mealName].price,
        };
  
        const response = await fetch(`${api_base_uri}api/meals/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mealData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save meal record');
        }
      }
  
      alert('Meal served successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while serving the meal.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <div>
        <h2 style={styles.heading}>Quick Serve</h2>

        <div style={styles.row}>
          <label>Employee ID</label>
          <label>Meal Slot</label>
        </div>

        <div style={styles.row}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            required 
            onChange={(e) => setEmployeeId(e.target.value)}
            style={styles.input}
          />
          <div>
            <input
              type="radio"
              name="mealSlot"
              value="Lunch"
              onChange={(e) => setMealSlot(e.target.value)}
              required
            /> Lunch
            <input
              type="radio"
              name="mealSlot"
              value="Dinner"
              onChange={(e) => setMealSlot(e.target.value)}
              style={{ marginLeft: '10px' }}
              required
            /> Dinner
          </div>
        </div>

        <div>
          {meals.map((meal, index) => (
            <div key={index} style={styles.mealRow}>
              <input
                type="checkbox"
                onChange={(e) => handleMealChange(meal.name, e.target.checked, selectedMeals[meal.name]?.qty || 1)}
              />
              <span style={styles.mealName}>{meal.name}</span>
              <input
                type="number"
                min="1"
                defaultValue="1"
                onChange={(e) => handleQtyChange(meal.name, parseInt(e.target.value))}
                style={styles.qtyInput}
                disabled={!selectedMeals[meal.name]}
              />
              <span style={styles.price}>Rs {meal.price}</span>
            </div>
          ))}
        </div>

        <div style={styles.total}>
          <h3>Total Price: Rs {calculateTotal()}</h3>
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    width: '80%', 
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  input: {
    width: '45%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  mealRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  mealName: {
    flex: '1',
    textAlign: 'left',
    marginLeft: '10px',
  },
  qtyInput: {
    width: '60px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginLeft: '10px', 
  },
  price: {
    marginLeft: '10px',
  },
  total: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  submitButton: {
    display: 'block',
    padding: '5px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px auto', // Centering the button
    fontSize: '14px', // Slightly smaller font
    textAlign: 'center',
  },
};

export default QuickServeCard;
