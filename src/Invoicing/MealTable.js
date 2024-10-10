import React, { useEffect, useState } from "react";
import MealRecordsTable from "./MealRecordsTable";

const MealTable = () => {
  const [mealData, setMealData] = useState({});
  const [loading, setLoading] = useState(true);
  const [employeeNames, setEmployeeNames] = useState({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const api_base_uri = "http://localhost:5000/";
  const token = localStorage.authToken

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${api_base_uri}api/meals/`,{
          headers: {
            'authorization': token
          }
        });
        const data = await response.json();
        console.log(data);
        setMealData(data);
        await fetchEmployeeNames(data);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployeeNames = async (data) => {
      const employeeIds = Object.keys(data);
      
      const names = {};

      for (const employeeId of employeeIds) {
        try {
          const response = await fetch(`${api_base_uri}api/users/${employeeId}`,
            {
              headers: {
                'authorization': token
              }
            }
          );
          const userData = await response.json();
          if (userData && userData.first_name) {
            names[employeeId] = `${userData.first_name} ${userData.last_name}`;
          }
        } catch (error) {
          console.error(
            `Error fetching name for employee ID ${employeeId}:`,
            error
          );
        }
      }

      setEmployeeNames(names);
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const employeeTotals = Object.keys(mealData).map((employeeId) => {
    const meals = mealData[employeeId];
    const totalAmount = meals.reduce((acc, meal) => acc + meal.price, 0);
    return {
      employeeId,
      totalAmount,
      meals,
      name: employeeNames[employeeId] || "Unknown",
    };
  });

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployeeId((prevSelectedId) =>
      prevSelectedId === employeeId ? null : employeeId
    );
  };

  return (
    <div style={styles.tableContainer}>
      <h2 style={styles.heading}>Employee Meal Records</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Employee Name</th>
            <th style={styles.th}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {employeeTotals.map((employee) => (
            <tr key={employee.employeeId}>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => handleEmployeeClick(employee.employeeId)}
                >
                  {employee.employeeId}
                </button>
                {selectedEmployeeId === employee.employeeId && (
                  <MealRecordsTable employeeId={selectedEmployeeId} />
                )}
              </td>
              <td style={styles.td}>{employee.name}</td>
              <td style={styles.td}>Rs {employee.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontWeight: "bold",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    color: "#555",
  },
  button: {
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    borderRadius:"10px",
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
  },
  loading: {
    textAlign: "center",
    fontSize: "20px",
    marginTop: "20px",
    color: "#007BFF",
  },
};

export default MealTable;
