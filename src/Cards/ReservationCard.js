import React from 'react';
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

const lunchData = {
  labels: generateLast7Days(), 
  datasets: [
    {
      label: 'Lunch Reservations',
      data: [30, 40, 25, 50, 60, 35, 45], 
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const dinnerData = {
  labels: generateLast7Days(),
  datasets: [
    {
      label: 'Dinner Reservations',
      data: [50, 60, 55, 70, 80, 65, 75],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Lunch and Dinner Reservations (Last 7 Days)' },
  },
};

const ReservationCard = () => {
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
