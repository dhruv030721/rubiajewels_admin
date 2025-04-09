import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      productImage: "https://via.placeholder.com/50",
      productName: "Lavender bandhani Cotton Kurti for Women",
      loginMail: "p@gmail.com",
      name: "panchani ram",
      location: "surat",
      rating: 5,
      subject: "xxf",
      review: "arfarfaddasa",
      reviewerImage: "https://via.placeholder.com/50",
      date: "02 October, 2024",
      time: "09:48 AM",
      status: "Draft",
    },
  ]);

  const toggleStatus = (id) => {
    setReviewsData((prevData) =>
      prevData.map((review) =>
        review.id === id
          ? { ...review, status: review.status === "Draft" ? "Publish" : "Draft" }
          : review
      )
    );
  };

  return (
    <div className="reviews-container">
      <header className="reviews-header">
        <h1>Reviews</h1>
        <p>All Reviews</p>
      </header>
      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>NO.</th>
              <th>PRODUCT</th>
              <th>LOGIN MAIL</th>
              <th>NAME</th>
              <th>RATE & REVIEW</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {reviewsData.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="product-info">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="product-image"
                    />
                    <p>{review.productName}</p>
                  </div>
                </td>
                <td>{review.loginMail}</td>
                <td>
                  {review.name}
                  <br />
                  {review.location}
                </td>
                <td>
                  <div className="rate-review">
                    {"⭐".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                    <p>
                      <strong>Subject:</strong> {review.subject}
                    </p>
                    <p>
                      <strong>Review:</strong> {review.review}
                    </p>
                    <img
                      src={review.reviewerImage}
                      alt={review.name}
                      className="reviewer-image"
                    />
                  </div>
                </td>
                <td>
                  <p>{review.date}</p>
                  <p>{review.time}</p>
                </td>
                <td>
                  <button
                    className={`status-badge ${review.status.toLowerCase()}`}
                    onClick={() => toggleStatus(review.id)}
                  >
                    {review.status}
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

export default Reviews;
