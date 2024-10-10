import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { addDays, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateLast7Days = () => {
  const today = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    days.push(format(addDays(today, -i), 'MMM dd'));
  }
  return days;
};

const fetchMealData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/meals', {
      headers: {
        authorization: localStorage.authToken,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meal data:', error);
    return {};
  }
};

const processMealData = (data) => {
  const last7Days = generateLast7Days();
  const lunchReservations = Array(7).fill(0); // Initialize lunch reservations for each of the last 7 days
  const dinnerReservations = Array(7).fill(0); // Initialize dinner reservations for each of the last 7 days

  Object.values(data).forEach((reservations) => {
    reservations.forEach((meal) => {
      if (meal.date && meal.qty) { // Ensure date and quantity exist
        const mealDate = new Date(meal.date);

        if (!isNaN(mealDate.getTime())) { // Ensure date is a valid date
          const formattedMealDate = format(mealDate, 'MMM dd'); // Format the meal date
          const dayIndex = last7Days.indexOf(formattedMealDate); // Get the index of the date in last7Days

          if (dayIndex !== -1) {
            if (meal.meal_slot === 'Lunch') {
              lunchReservations[dayIndex] += meal.qty; // Sum the quantity for lunch
            } else if (meal.meal_slot === 'Dinner') {
              dinnerReservations[dayIndex] += meal.qty; // Sum the quantity for dinner
            }
          }
        }
      }
    });
  });

  return { lunchReservations, dinnerReservations };
};
const ReservationCard = () => {
  const [lunchData, setLunchData] = useState({
    labels: generateLast7Days(),
    datasets: [
      {
        label: 'Lunch Reservations',
        data: Array(7).fill(0), // Default values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const [dinnerData, setDinnerData] = useState({
    labels: generateLast7Days(),
    datasets: [
      {
        label: 'Dinner Reservations',
        data: Array(7).fill(0), // Default values
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      const mealData = await fetchMealData();
      const { lunchReservations, dinnerReservations } = processMealData(mealData);

      setLunchData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: lunchReservations,
          },
        ],
      }));

      setDinnerData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: dinnerReservations,
          },
        ],
      }));
    };

    loadData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Lunch and Dinner Reservations (Last 7 Days)' },
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Meal Reservation Information (Last 7 Days)</h2>
      <div style={styles.chartContainer}>
        <div style={styles.chart}>
          <h3>Lunch Reservations</h3>
          <Bar data={lunchData} options={options} />
        </div>
        <div style={styles.chart}>
          <h3>Dinner Reservations</h3>
          <Bar data={dinnerData} options={options} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    margin: '20px auto',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  chart: {
    width: '45%',
  },
};

export default ReservationCard;
