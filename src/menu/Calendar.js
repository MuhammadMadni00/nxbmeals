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
  const token = localStorage.authToken;

  useEffect(() => {
    const fetchMealOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu/", {
          headers: {
            authorization: token,
          },
        });

        const data = await response.json();
        setMeals(createDefaultMeals(data));
      } catch (error) {
        console.error("Error fetching meal options:", error);
      }
    };

    fetchMealOptions();
  }, [token]);

  const createDefaultMeals = (mealOptions) => {
    let defaultMeals = {};

    mealOptions.forEach((option) => {
      // Parse the full served date (including day, month, and year)
      const servedDate = new Date(option.mealServedDate);
      const servedDay = servedDate.toISOString().split("T")[0]; // Get the full date (YYYY-MM-DD)

      // Check if a meal entry for this exact date already exists
      if (!defaultMeals[servedDay]) {
        defaultMeals[servedDay] = {
          date: servedDay, // Store the full date in YYYY-MM-DD format
          meals: [],
        };
      }

      // Add the meal option to the meals array for this date
      defaultMeals[servedDay].meals.push(option);
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
    const dayKey = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    .toLocaleDateString('en-CA')

      .split("T")[0]; // Get the full date in YYYY-MM-DD format
    setSelectedDate(dayKey);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddMeal = (day) => {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    let newDate = new Date(Date.UTC(year, month - 1, day, 6, 50, 27, 41));
    navigate(`/add-meal/${newDate.toJSON()}`);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
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
      const dayKey = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      )
      .toLocaleDateString('en-CA')
        .split("T")[0];
      const hasMeals = meals[dayKey] && meals[dayKey].meals.length > 0;

      calendarDays.push(
        <div key={day} className={`calendar-day`}>
          <div className="day-number">{day}</div>
          {hasMeals ? (
            <div
              className="meal-preview"
              onClick={() => handleDayPreviewClick(day)}
            >
              <strong>Day Preview</strong>
              {meals[dayKey].meals.map((meal, index) => (
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

  // Day headers
  const dayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="calendar-container">
      <h2>Menu</h2>
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={goToNextMonth}>Next</button>
      </div>

      <div className="calendar-day-headers">
        {dayHeaders.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">{renderCalendar()}</div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Menu for {selectedDate}
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
                  <td>{meal.mealSlot || "N/A"}</td>
                  <td>{meal.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
