import React from 'react';
import './MenuCard.css'; 

const MenuCard = () => {
  const menu = [
    {
      name: 'Chicken Caesar Salad',
      price: 12.99,
      image: 'https://via.placeholder.com/150', 
    },
    {
      name: 'Grilled Salmon',
      price: 18.50,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Vegetarian Pizza',
      price: 14.00,
      image: 'https://via.placeholder.com/150', 
    },
    {
      name: 'Pasta Alfredo',
      price: 16.75,
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="menu-card-container">
      <h2>Today's Menu</h2>
      <div className="menu-card">
        {menu.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
