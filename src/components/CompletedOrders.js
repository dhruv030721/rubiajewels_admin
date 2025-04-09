import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CompletedOrders.css";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [status, setStatus] = useState("completed");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (order) => {
    navigate(`/order-details/${order._id}`, { state: { order } });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://backend.rubiajewels.com/get-user");
        if (response.data.userId && response.data.token) {
          setUserId(response.data.userId);
          setToken(response.data.token);
        }
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error
        );
      }
    };
    fetchUserData();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId || !token) return;

      try {
        const response = await axios.get(`https://backend.rubiajewels.com/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId, token]);

  const handleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleStatusChange = async () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to update.");
      return;
    }

    try {
      await Promise.all(
        selectedOrders.map(async (orderId) => {
          console.log(`Updating order with ID: ${orderId}`);

          const response = await axios.put(
            `https://backend.rubiajewels.com/orders/${orderId}/status`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(`Order ${orderId} updated successfully:`, response.data);
        })
      );

      const updatedOrdersResponse = await axios.get(
        "https://backend.rubiajewels.com/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "Updated orders fetched from server:",
        updatedOrdersResponse.data
      );

      setOrders(updatedOrdersResponse.data);
      setSelectedOrders([]);
    } catch (error) {
      console.error(
        "Error updating order status:",
        error.response?.data || error
      );
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="pending-order-list">
      <h1>Completed Orders</h1>
      <div className="pending-order-controls">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="ready-to-ship">Ready to Ship</option>
          <option value="completed" disabled>
            Completed
          </option>
        </select>
        <button className="pending-go-button" onClick={handleStatusChange}>
          Go
        </button>
      </div>

      <table className="pending-order-table" key={orders.length}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ORDER INFO</th>
            <th>SHIPPING</th>
            <th>ORDER DETAILS</th>
            <th>TOTAL AMOUNT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <></>
          ) : (
            orders
              .filter((order) => order.status === "completed")
              .map((order) => (
                <React.Fragment key={order._id}>
                  <tr key={order._id} className="order-card">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={() => handleOrderSelection(order._id)}
                      />
                    </td>
                    <td>
                      <div className="pending-order-info">
                        <div>
                          <strong>Email:</strong> {order.email}
                        </div>
                        <div>
                          <strong>Status:</strong> {order.status}
                        </div>
                        <div>
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="address">
                      <div className="pending-order-info">
                        <div>
                          <strong>Name:</strong> {order.firstName}{" "}
                          {order.lastName}
                        </div>
                        <div>
                          <strong>Address:</strong> {order.address},{" "}
                          {order.city}, {order.state}, {order.country} -{" "}
                          {order.pincode}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="pending-order-info order-details">
                        {order.cartItems.map((item) => (
                          <div key={item._id} className="order-item">
                            <img
                              src={`https://backend.rubiajewels.com/${item.image.replace(
                                "\\",
                                "/"
                              )}`}
                              alt={item.name}
                              className="pending-product-info-img"
                            />
                            <div>
                              <strong>Product Name:</strong> {item.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <button
                        className="pending-detail-button"
                        onClick={() => handleViewDetails(order)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>

                  {expandedOrder === order._id && (
                    <tr className="order-card">
                      <td></td>
                      <td>
                        <div className="pending-order-info">
                          <div>
                            <strong>Order ID:</strong> {order._id}
                          </div>
                          <div>
                            <strong>User ID:</strong> {order.userId}
                          </div>
                          <div>
                            <strong>Email:</strong> {order.email}
                          </div>
                          <div>
                            <strong>Status:</strong> {order.status}
                          </div>
                          <div>
                            <strong>Order Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="pending-order-info">
                          <div>
                            <strong>Name:</strong> {order.firstName}{" "}
                            {order.lastName}
                          </div>
                          <div>
                            <strong>Address:</strong> {order.address},{" "}
                            {order.city}, {order.state}, {order.country} -{" "}
                            {order.pincode}
                          </div>
                          <div>
                            <strong>Phone:</strong> {order.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="pending-order-info">
                          {order.cartItems.map((item) => (
                            <div key={item._id} className="order-item">
                              <div>
                                <strong>Product Name:</strong> {item.name}
                              </div>
                              <div>
                                <strong>Color:</strong> {item.color}
                              </div>
                              <div>
                                <strong>Size:</strong> {item.size}
                              </div>
                              <div>
                                <strong>Karat:</strong> {item.karat}
                              </div>
                              <div>
                                <strong>Stone:</strong>{" "}
                                {item.stone ? item.stone : "N/A"}
                              </div>
                              <div>
                                <strong>Quantity:</strong> {item.quantity}
                              </div>
                              <div>
                                <strong>Price:</strong> ${item.price.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td> ${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedOrders;
