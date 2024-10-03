import React, { useState, useEffect } from "react";

const MealData = () => {
  const [mealsData, setMealsData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState({});
  const [mealFilter, setMealFilter] = useState("All");
  const [employeeIdFilter, setEmployeeIdFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const api_base_uri="http://localhost:5000/";

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${api_base_uri}api/meals/`);
        const data = await response.json();
        setMealsData(data);
        await fetchUserData(data);
        setFilteredData(flattenMealData(data)); 
      } catch (error) {
        console.error("Error fetching meal data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const fetchUserData = async (meals) => {
    const userDetails = {};
    const employeeIds = Object.keys(meals);

    for (const employeeId of employeeIds) {
      try {
        const response = await fetch(`${api_base_uri}api/users/${employeeId}`);
        const data = await response.json();
        userDetails[employeeId] = {
          name: `${data.first_name} ${data.last_name}`,
          location: data.location,
        };
      } catch (error) {
        console.error(`Error fetching user data for employee ID ${employeeId}:`, error);
      }
    }

    setUserData(userDetails);
  };

  const flattenMealData = (data) => {
    return Object.keys(data).reduce((acc, employeeId) => {
      return [...acc, ...data[employeeId]];
    }, []);
  };

  const filterMeals = () => {
    let filtered = flattenMealData(mealsData);

    if (mealFilter !== "All") {
      filtered = filtered.filter((meal) => meal.meal_slot === mealFilter);
    }

    if (employeeIdFilter !== "All") {
      filtered = filtered.filter((meal) =>
        meal.employee_id.includes(employeeIdFilter)
      );
    }

    if (locationFilter !== "All") {
      filtered = filtered.filter(
        (meal) =>
          userData[meal.employee_id]?.location === locationFilter
      );
    }

    if (dateFrom && dateTo) {
      filtered = filtered.filter((meal) => {
        const mealDate = new Date(meal.date);
        return mealDate >= new Date(dateFrom) && mealDate <= new Date(dateTo);
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterMeals();
  }, [mealFilter, employeeIdFilter, locationFilter, dateFrom, dateTo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Meal History</h2>

      <div style={styles.filtersContainer}>
        <select
          value={employeeIdFilter}
          onChange={(e) => setEmployeeIdFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Users</option>
          {Object.keys(userData).map((id) => (
            <option key={id} value={id}>
              {userData[id].name}
            </option>
          ))}
        </select>

        <select
          value={mealFilter}
          onChange={(e) => setMealFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Meals</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>


        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Locations</option>
          <option value="Lahore Center I">Lahore Center I</option>
          <option value="Lahore Center II">Lahore Center II</option>
          <option value="Lahore Center III">Lahore Center III</option>
        </select>

        <input
          type="date"
          placeholder="Date From"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Date To"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={styles.input}
        />
      </div>


      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Meal</th>
            <th style={styles.th}>Served Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((meal) => (
            <tr key={meal._id}>
              <td style={styles.td}>{meal.employee_id}</td>
              <td style={styles.td}>
                {userData[meal.employee_id]?.name}
              </td>
              <td style={styles.td}>
                {userData[meal.employee_id]?.location}
              </td>
              <td style={styles.td}>{meal.meal_slot}</td>
              <td style={styles.td}>{new Date(meal.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginRight: "10px",
    width: "200px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    marginRight: "10px",
    width: "200px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default MealData;
