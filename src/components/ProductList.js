import React, { useState } from "react";
import "./ProductList.css";
import image1 from "../assets/braceletsGoldImage4.webp";
import image2 from "../assets/roseGoldImage1.webp";

const initialProducts = [
  {
    id: 1,
    name: "Gold Bracelet",
    image: image1,
    productId: "KBPROD1",
    price: { current: 999, original: 1999 },
    category: "Bracelet",
    stock: 1,
    status: "Publish",
  },
  {
    id: 2,
    name: "Gold Ring",
    image: image2,
    productId: "KBPROD2",
    price: { current: 1499, original: 2999 },
    category: "Ring",
    stock: 2,
    status: "Unpublish",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleStatusChange = (id, newStatus) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, status: newStatus } : product
      )
    );
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>PRODUCT NAME</th>
            <th>PRODUCT ID</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>STOCK</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <div className="product-info">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div>
                    <p className="product-name">{product.name}</p>
                  </div>
                </div>
              </td>
              <td>{product.productId}</td>
              <td>
                <div>
                  <p className="price-current">₹ {product.price.current}</p>
                  <p className="price-original">₹ {product.price.original}</p>
                </div>
              </td>
              <td>{product.category}</td>
              <td>Stock: {product.stock}</td>
              <td>
                <select
                  className="status-dropdown"
                  value={product.status}
                  onChange={(e) =>
                    handleStatusChange(product.id, e.target.value)
                  }
                >
                  <option value="Publish">Publish</option>
                  <option value="Unpublish">Unpublish</option>
                </select>
              </td>
              <td>
                <button className="productlist-edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="productlist-delete"
                  onClick={() => console.log(`Delete product ${product.id}`)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
