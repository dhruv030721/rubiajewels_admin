import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <h2>No order details available.</h2>;
  }

  return (
    <div className="order-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      
      <h1>Order Detail</h1>
      <div className="order-info-cards">
        <div className="info-card">
          <h3>Customer</h3>
          <p>{order.userId}</p>
          <p>{order.firstName} {order.lastName}</p>
          <p>{order.email}</p>
          <p>{order.phone}</p>
        </div>

        <div className="info-card">
          <h3>Deliver To</h3>
          <p>{order.address}, {order.city}, {order.state}, {order.country} - {order.pincode}</p>
        </div>

        <div className="info-card">
          <h3>Payment Info</h3>
          <p>Payment details here...</p>
        </div>
      </div>

      <h2>Order #{order._id}</h2><br />

      <table className="order-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Product</th>
            <th>Karats</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Ring Size</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td><img src={`https://backend.rubiajewels.com/${item.image.replace("\\", "/")}`} alt={item.name}className="product-image" /></td>
              <td>{item.name}</td>
              <td>{item.karat}</td>
              <td>{item.color}</td>
              <td>{item.quantity}</td>
              <td>{item.size || "N/A"}</td>
              <td>₹ {item.price.toFixed(2)}/-</td>
              <td>₹ {(item.price * item.quantity).toFixed(2)}/-</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3 className="grand-total">Grand Total: ₹ {order.totalAmount.toFixed(2)}/-</h3>
    </div>
  );
};

export default OrderDetailsPage;