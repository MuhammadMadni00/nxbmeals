import React, { useState, useEffect } from 'react';
import './Calendar.css'; // For styles

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [meals, setMeals] = useState({}); // Store meals for each date
  
  const mealOptions = [
    { name: 'Biryani', price: 200 },
    { name: 'Chicken Karahi', price: 300 },
    { name: 'Grilled Fish', price: 400 },
  ];

  // Initialize meals with some default data for each date
  useEffect(() => {
    let defaultMeals = {};
    for (let day = 1; day <= 31; day++) {
      defaultMeals[day] = mealOptions; // Same meal options for every date initially
    }
    setMeals(defaultMeals);
  }, []);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());

  const handleDateClick = (day) => {
    setSelectedDate(day); // Set the selected date to view meals
  };

  const renderCalendar = () => {
    const calendarDays = [];
    let emptyCells = firstDayOfMonth;

    // Add empty cells to align the first day
    for (let i = 0; i < emptyCells; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Render days of the month
    for (let day = 1; day <= totalDays; day++) {
      calendarDays.push(
        <div key={day} className="calendar-day" onClick={() => handleDateClick(day)}>
          <span>{day}</span>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
      
      {selectedDate && (
        <div className="meal-container">
          <h3>Meals for {selectedDate} {currentDate.toLocaleString('default', { month: 'long' })}</h3>
          <ul>
            {meals[selectedDate].map((meal, index) => (
              <li key={index}>
                {meal.name} - Rs {meal.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;
