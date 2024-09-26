import React from 'react';
import Sidebar from '../navbar/Sidebar'; 
import './Dashboard.css'; 
import ReservationCard from '../Cards/ReservationCard';
import QuickVerifyCard from '../Cards/QuickVerifyCard';
import QuickServeCard from '../Cards/QuickServe';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <hr></hr>
        <h1>Reservation</h1>
        <ReservationCard/>
        <QuickVerifyCard/>
        <QuickServeCard/>
      </div>
    </div>
  );
}

export default Dashboard;
