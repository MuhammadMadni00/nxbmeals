import React, { useEffect, useState } from 'react';

const MealRecordsTable = ({ employeeId }) => {
  const [userData, setUserData] = useState(null);
  const [mealRecords, setMealRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const api_base_uri="http://localhost:5000/";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${api_base_uri}api/users/${employeeId}`);
        const userData = await userResponse.json();
        setUserData(userData);

        const mealsResponse = await fetch(`${api_base_uri}api/meals/${employeeId}`);
        const mealsData = await mealsResponse.json();
        
        setMealRecords(mealsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateTotalAmount = (records) => {
    return records.reduce((total, meal) => total + meal.price, 0);
  };

  return (
    <div style={styles.tableContainer}>
      <h2 style={styles.heading}>Meal Records for {userData.first_name} {userData.last_name}</h2>
      <div style={styles.userInfo}>
        <p><strong>Employee ID:</strong> {userData.employee_id}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Location:</strong> {userData.location}</p>
        <img src={userData.profile_url} alt="Profile" style={styles.profileImage} />
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Meal Details</th>
            <th style={styles.th}>Meal Slot</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {mealRecords.map((meal) => (
            <tr key={meal._id}>
              <td style={styles.td}>{new Date(meal.date).toLocaleDateString()}</td>
              <td style={styles.td}>{meal.meal_name}</td>
              <td style={styles.td}>{meal.meal_slot}</td>
              <td style={styles.td}>{meal.qty}</td>
              <td style={styles.td}>Rs {meal.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={styles.totalCell}><strong>Total:</strong></td>
            <td style={styles.totalCell}>Rs {calculateTotalAmount(mealRecords)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    width: '80%',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: '20px',
  },
  userInfo: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  profileImage: {
    width: '100px',
    borderRadius: '50%',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  td: {
    border: '1px solid #ccc',
    padding: '10px',
  },
  totalCell: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
};

export default MealRecordsTable;
