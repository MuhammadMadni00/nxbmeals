import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const base_uri = "http://localhost:5000/api/users";
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(base_uri);
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Apply search filter
  const filteredUsers = users.filter(user => 
    (user.Email && user.Email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.Name && user.Name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleActivateDeactivate = async (email, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active"; // Toggle status

    // Confirm with the user before making the status change
    const confirm = window.confirm(`Do you want to change the status of user ${email} to ${newStatus}?`);

    if (confirm) {
      try {
        const response = await axios.put('http://localhost:5000/api/users/updatestatus', {
          email: email,
          status: newStatus.toLowerCase() === "active" ? true : false, 
        });

        console.log(response.data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.Email === email ? { ...user, Status: newStatus } : user
          )
        );
        alert(`User status changed to ${newStatus}`);
      } catch (error) {
        console.error("Error updating user status:", error);
        alert("Failed to update status.");
      }
    }
  };

  const handleRead = (id) => {
    console.log(`Read details for user with ID: ${id}`);
  };

  const handleUpdate = (id) => {
    console.log(`Update user with ID: ${id}`);
  };
  const handleDelete = async (email) => {
    const confirm = window.confirm(`Are you sure you want to delete the user with email: ${email}?`);

    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/users/delete`, {
          data:{email} 
        });

        console.log(response.data);
        setUsers((prevUsers) => prevUsers.filter((user) => user.Email !== email));
        alert(`User with email ${email} has been deleted.`);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };


  // Pagination applied to filteredUsers
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) < 5) {
      pageNumbers.push(i);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>User Data</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          <tr style={styles.rowhead}>
            <th>Email</th>
            <th>Name</th>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.ID} style={styles.row}>
              <td style={styles.cell}>{user.Email}</td>
              <td style={styles.cell}>{user.Name}</td>
              <td style={styles.cell}>{user.ID}</td>
              <td style={styles.cell}>{user.Type}</td>
              <td style={styles.cell}>{user.Status}</td>
              <td style={styles.actions}>
                <i
                  className="fas fa-eye"
                  onClick={() => handleRead(user.ID)}
                  style={{ ...styles.icon, color: "#28a745" }}
                  title="Read"
                ></i>
                <i
                  className="fas fa-edit"
                  onClick={() => handleUpdate(user.ID)}
                  style={{ ...styles.icon, color: "#007BFF" }}
                  title="Update"
                ></i>
                <i
                  className="fas fa-trash"
                  onClick={() => handleDelete(user.Email)}
                  style={{ ...styles.icon, color: "#dc3545" }}
                  title="Delete"
                ></i>
                <i
                  className={`fas ${
                    user.Status === "Active" ? "fa-toggle-on" : "fa-toggle-off"
                  }`}
                  onClick={() => handleActivateDeactivate(user.Email,user.Status)}
                  style={{
                    ...styles.icon,
                    color: user.Status === "Active" ? "#ffc107" : "#6c757d",
                  }}
                  title={user.Status === "Active" ? "Deactivate" : "Activate"}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          previous
        </button>
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => paginate(number)}
            style={
              number === currentPage
                ? styles.activePageButton
                : styles.pageButton
            }
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center", // Center align all table content
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  rowhead: {
    borderBottom: "3px solid #ddd",
  },
  cell: {
    padding: "20px", // Add padding for better appearance
  },
  actions: {

    direction:"center"
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
    padding:"4px"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    margin: "0 5px",
    padding: "5px 10px",
    border: "1px solid #007BFF",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  activePageButton: {
    margin: "0 5px",
    padding: "5px 10px",
    border: "1px solid #007BFF",
    backgroundColor: "#0056b3",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  searchInput: {
    width: '30%',
    padding: '15px',
    marginBottom: '30px',
    marginLeft:"65%",
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

export default UserCard;
