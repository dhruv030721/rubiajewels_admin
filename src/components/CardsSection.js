import React from "react";
import Card from "./Card";
import "./CardsSection.css";

function CardsSection() {
  const cardsData = [
    {
      icon: <i class="fa-solid fa-tag"></i>,
      title: "Sales",
      amount: "$230,220",
      date: "May 2022",
      growth: "↑ +55% last month",
    },
    {
      icon: <i class="fa-solid fa-bag-shopping"></i>,
      title: "Customers",
      amount: "$3,200",
      date: "May 2022",
      growth: "↑ +12% last month",
    },
    {
      icon: <i class="fa-solid fa-dollar-sign"></i>,
      title: "Avg Revenue",
      amount: "$2,300",
      date: "May 2022",
      growth: "↑ +210% last month",
    },
  ];

  return (
    <div className="cards-section">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}

export default CardsSection;
