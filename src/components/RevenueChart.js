import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", Google: 100, Facebook: 50 },
  { name: "Feb", Google: 200, Facebook: 120 },
  { name: "Mar", Google: 180, Facebook: 110 },
  { name: "Apr", Google: 150, Facebook: 100 },
  { name: "May", Google: 170, Facebook: 90 },
  { name: "Jun", Google: 130, Facebook: 200 },
  { name: "Jul", Google: 100, Facebook: 220 },  
  { name: "Aug", Google: 80, Facebook: 250 },
];

function RevenueChart() {
  return (
    <div className="chart-container">
      <h3>Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Google" stroke="#333" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Facebook" stroke="#333" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
