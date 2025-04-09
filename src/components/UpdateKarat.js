import React, { useState, useEffect } from "react";
import "./UpdateKarat.css";

function UpdateKarat() {
  const [karatPrices, setKaratPrices] = useState([]);
  const [selectedKarat, setSelectedKarat] = useState("");
  const [newKaratPrice, setNewKaratPrice] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchKaratPrices = async () => {
      try {
        const response = await fetch("https://backend.rubiajewels.com/api/karat-prices");
        if (!response.ok) {
          throw new Error("Failed to fetch karat prices");
        }
        const data = await response.json();
        setKaratPrices(data);
      } catch (error) {
        alert("Error fetching karat prices: " + error.message);
      }
    };

    fetchKaratPrices();
  }, []);

  const handleUpdateKaratPrice = async () => {
    if (!selectedKarat || !newKaratPrice) {
      alert("Please select a karat and enter a valid price.");
      return;
    }

    try {
      const response = await fetch("https://backend.rubiajewels.com/api/karat-prices", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          karat: selectedKarat,
          price: parseFloat(newKaratPrice).toFixed(2),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update karat price");
      }

      const updatedPrice = await response.json();

      setKaratPrices((prevPrices) =>
        prevPrices.map((item) =>
          item.karat === updatedPrice.karat
            ? { ...item, price: updatedPrice.price }
            : item
        )
      );
      setNewKaratPrice("");
    } catch (error) {
      alert("Error updating karat price: " + error.message);
    }
  };

  return (
    <>
      <div className="karat-section">
        <div className="karat-form">
          <h2 className="karat-h2">Update Karat Price</h2>
          <label className="karat-label">Select Karat:</label>
          <select
            value={selectedKarat}
            className="update-price-select"
            onChange={(e) => setSelectedKarat(e.target.value)}
          >
            <option value="">Select a karat</option>
            {karatPrices.map((item) => (
              <option key={item.karat} value={item.karat}>
                {item.karat}
              </option>
            ))}
          </select>
          <label className="karat-label">New Price (per gram):</label>
          <input
            type="number"
            value={newKaratPrice}
            onChange={(e) => setNewKaratPrice(e.target.value)}
            placeholder="Enter new price"
            className="karat-input"
          />
          <button className="karat-button" onClick={handleUpdateKaratPrice}>
            Update Price
          </button>
        </div>

        <div className="karat-table-container">
          <h2 className="karat-h2">Current Karat Prices</h2>
          <table className="update-karat-table">
            <thead>
              <tr>
                <th>Carat</th>
                <th>Price per gram</th>
              </tr>
            </thead>
            <tbody>
              {karatPrices.map((item) => (
                <tr key={item.karat}>
                  <td>{item.karat}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UpdateKarat;