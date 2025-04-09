import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();   
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://backend.rubiajewels.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const response = await axios.put(`https://backend.rubiajewels.com/users/${id}/status`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status: response.data.status } : user
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <div className="user-list-container">
      <header className="user-list-header">
        <h1>Registered User List</h1>
        <p>View Registered Users on the Website</p>
      </header>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EAMIL ID</th>
              <th>REGISTERED DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className={`status-button ${user.status.toLowerCase()}`}
                    onClick={() => toggleStatus(user._id)}
                  >
                    {user.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
