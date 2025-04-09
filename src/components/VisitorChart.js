import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Direct", value: 38, color: "#595959" },
  { name: "Organic", value: 22, color: "#666666" },
  { name: "Paid", value: 12, color: "#737373" },
  { name: "Social", value: 28, color: "#808080" },
];

function VisitorChart() {
  return (
    <div className="chart-container">
      <h3>Website Visitors</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="legend-list">
        {data.map((item, index) => (
          <li key={index} style={{ color: item.color }}>
            {item.name}: {item.value}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisitorChart;