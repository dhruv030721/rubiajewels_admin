import React from "react";
import RevenueChart from "../components/RevenueChart";
import VisitorChart from "../components/VisitorChart";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-row">
        <div className="chart-wrapper">
          <RevenueChart />
        </div>
        <div className="chart-wrapper">
          <VisitorChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
