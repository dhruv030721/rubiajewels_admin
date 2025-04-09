import React from "react";
import "./TopBar.css";

function TopBar() {
  return (
    <div className="topbar">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      <div className="user-container">
        <span className="notification-icon"><i class="fa-solid fa-bell"></i></span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="User"
          className="user-avatar"
        />
        <span className="user-name">Aiden Max</span>
        <span className="dropdown-icon">▼</span>
      </div>
    </div>
  );
}

export default TopBar;
