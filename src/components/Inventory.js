import React from "react";
import "./Inventory.css";

const Inventory = () => {
  const inventoryData = [
    { id: 1, productName: "Product 1", stock: 2231 },
    { id: 2, productName: "Woman Kurta Set 502", stock: 654 },
    { id: 3, productName: "Woman Kurta Set 503", stock: 1088 },
  ];

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <h1>Inventory</h1>
        <button className="add-inventory-btn"> Add Inventory </button>
      </header>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Stock</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}> 
              <td>{item.id}</td>
              <td>{item.productName || "-"}</td>
              <td>{item.stock}</td>
              <td>
                <button className="view-btn"><i class="fa-solid fa-eye"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;