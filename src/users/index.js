import React from "react";
import Sidebar from "../navbar/Sidebar";
import UserCard from "../Cards/UserCard";
import './Users.css';
function Users() {
return(
    <div className="users-container">
    <Sidebar/>
    <div className="users-content">
    <h1>Users</h1>
    <hr/>
    <UserCard/>
    </div>
    </div>
);
}
export default Users;
