import React from "react";
import "./Card.css";

function Card({ icon, title, amount, date, growth }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <span className="card-date">{date}</span>
        </div>
        <h2 className="card-amount">{amount}</h2>
        <p className="card-growth">{growth}</p>
      </div>
    </div>
  );
}

export default Card;