import React from "react";
import "./Rto.css";

function Rto() {
  const orders = [
    {
      id: 1,
      orderId: "SC04/11/0001",
      customerName: "Demo Test",
      email: "p@gmail.com",
      date: "04/11/2024 - 12:14 PM",
      status: "Cancelled",
      product: {
        image: "https://via.placeholder.com/50", 
        name: "Blue and Pink TOP 2",
      },
      totalAmount: "₹ 599",
    },
    {
      id: 2,
      orderId: "SC03/11/0001",
      customerName: "Neha",
      email: "n@gmail.com",
      date: "03/11/2024 - 12:21 PM",
      status: "Cancelled",
      product: {
        image: "https://via.placeholder.com/50",
        name: "JMPS TOP 2",
      },
      totalAmount: "₹ 549",
    },
  ];
  return (
    <div className="rto-order-list">
      <h1>RTO</h1>
      <p>View Your RTO List.</p>

      <div className="rto-order-controls">
        <button className="rto-excel-button"><i class="fa-solid fa-file-excel"></i></button>
      </div>

      <table className="rto-order-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>ORDER ID</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <input type="checkbox" /> {order.id}
              </td>
              <td>
                <div className="rto-order-info">
                  <div>{order.orderId}</div>
                  <div>{order.customerName}</div>
                  <div>{order.email}</div>
                  <div>{order.date}</div>
                  <span className="rto-cancle-status-badge">{order.status}</span>
                </div>
              </td>
              <td>
                <div className="rto-product-info">
                  <img src={order.product.image} alt={order.product.name} />
                  <div>{order.product.name}</div>
                </div>
              </td>
              <td>{order.totalAmount}</td>
              <td>
                <button className="rto-detail-button">See Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rto;
