import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu/"); 
        const data = await response.json();
        setMeals(createDefaultMeals(data)); 
      } catch (error) {
        console.error("Error fetching meal options:", error);
      }
    };

    fetchMealOptions();
  }, []);

  const createDefaultMeals = (mealOptions) => {
    let defaultMeals = {};
    mealOptions.forEach((option) => {
      const servedDate = new Date(option.mealServedDate);
      const servedDay = servedDate.getUTCDate(); 
      if (servedDay >= 1 && servedDay <= 31) {
        if (!defaultMeals[servedDay]) {
          defaultMeals[servedDay] = {
            date: servedDate.toISOString().split("T")[0],
            meals: [],
          };
        }
        defaultMeals[servedDay].meals.push(option); 
      }
    });
    return defaultMeals;
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const totalDays = daysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const handleDayPreviewClick = (day) => {
    setSelectedDate(day);
    setShowModal(true); 
  };
  const handleCloseModal = () => setShowModal(false); 
  const handleAddMeal = (date) => {
    const month = 10; 
    const year = 2024;
    console.log("date", date.toString);
    let newDate = new Date(Date.UTC(year, month - 1, date, 6, 50, 27, 41));
    console.log(newDate);
    navigate(`/add-meal/${newDate.toJSON()}`);
  };
  const renderCalendar = () => {
    const calendarDays = [];
    let emptyCells = firstDayOfMonth;

    for (let i = 0; i < emptyCells; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const hasMeals = meals[day] && meals[day].meals.length > 0;

      calendarDays.push(
        <div key={day} className={`calendar-day`}>
          <div className="day-number">{day}</div>
          {hasMeals ? (
            <div
              className="meal-preview"
              onClick={() => handleDayPreviewClick(day)}
            >
              <strong>Day Preview</strong>
              {meals[day].meals.map((meal, index) => (
                <p key={index}>
                  {meal.selectedItems.map((item) => item.mealName).join(", ")}
                </p>
              ))}
            </div>
          ) : (
            <div className="meal-preview">
              <strong>No meals available</strong>
            </div>
          )}
          <button
            className="add-meal-btn"
            onClick={() => {
              handleAddMeal(day);
            }}
          >
            Click To Add
          </button>
        </div>
      );
    }

    return calendarDays;
  };

  const selectedMeals = meals[selectedDate] ? meals[selectedDate].meals : [];

  return (
    <div className="calendar-container">
      <h2>Menu</h2>
      <h2>
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="calendar-grid">{renderCalendar()}</div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Menu for{" "}
            {new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              selectedDate
            ).toLocaleDateString()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Meals</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Meal Items</th>
                <th>Meal Slot</th>
                <th>Pricing</th>
              </tr>
            </thead>
            <tbody>
              {selectedMeals.map((meal) => (
                <tr key={meal._id}>
                  <td>
                    {meal.selectedItems.map((item) => item.mealName).join(", ")}
                  </td>
                  <td>{meal.mealSlot}</td>
                  <td>
                    <div>Same Week: {meal.totalPrice}</div>
                    <div>1 Week Before: {meal.totalPrice}</div>
                    <div>2 Weeks Before: {meal.totalPrice}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
