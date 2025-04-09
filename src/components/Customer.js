import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";

const Customer = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchReturnOrders = async () => {
      try {
        const response = await axios.get("https://backend.rubiajewels.com/return-orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching return orders:", error);
      }
    };

    fetchReturnOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://backend.rubiajewels.com/return-orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="customer-order-list">
      <table className="customer-order-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Image</th>
            <th>Reason</th>
            <th>User Info</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>
                <div className="customer-proof">
                  <img
                    src={`https://backend.rubiajewels.com/uploads/${order.proofImage}`}
                    alt="Proof"
                    width={120}
                    height={120}
                  />
                </div>
              </td>
              <td>
                <div>{order.reason}</div>
              </td>
              <td>
                <div>
                  <div>Email: {order.email}</div>
                  <div>Phone: {order.phone}</div>
                  <div>
                    <strong>Amount:</strong> ₹ {order.amount}
                  </div>
                </div>
              </td>

              <td className="customer-select-td">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
