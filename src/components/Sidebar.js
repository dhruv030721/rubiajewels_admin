import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <div className="sidebar">
      <h1  className="sidebar-logo"> RUBIA </h1>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li className="sidebar-item active">
            <Link to="/" className="sidebar-link">
              <span className="sidebar-icon"><i class="fa-solid fa-house"></i></span> Home 
            </Link>
          </li>
          <li className="sidebar-item">
            <span
              className="sidebar-link"
              onClick={() => toggleDropdown("product")}
            >
              <span className="sidebar-icon"><i class="fa-solid fa-box"></i></span> Product 
            </span>
            {activeDropdown === "product" && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/product-list" className="dropdown-link">
                      Product List
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-product" className="dropdown-link">
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link to="/updatekarat" className="dropdown-link">
                      Update Karat Price
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="sidebar-item">
            <span
              className="sidebar-link"
              onClick={() => toggleDropdown("order")}
            >
              <span className="sidebar-icon"><i class="fa-solid fa-table-list"></i></span> Orders 
            </span>
            {activeDropdown === "order" && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/pending" className="dropdown-link">
                      Pending Orders 
                    </Link> 
                  </li> 
                  <li> 
                    <Link to="/processing" className="dropdown-link"> 
                      Processing Orders 
                    </Link> 
                  </li> 
                  <li> 
                    <Link to="/ready-to-ship" className="dropdown-link">
                      Ready To Ship Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/complete" className="dropdown-link">
                      Completed Orders
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="sidebar-item">
            <span
              className="sidebar-link"
              onClick={() => toggleDropdown("return")}
            >
              <span className="sidebar-icon"><i class="fa-solid fa-reply"></i></span> Return
            </span>
            {activeDropdown === "return" && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/customer" className="dropdown-link">
                      Customer
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="sidebar-item">
            <span
              className="sidebar-link"
              onClick={() => toggleDropdown("master")}
            >
              <span className="sidebar-icon"><i class="fa-solid fa-star"></i></span> Master
            </span>
            {activeDropdown === "master" && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/coupon" className="dropdown-link">
                      Coupon
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="dropdown-link">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/subcategories" className="dropdown-link">
                      Subcategories
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="sidebar-item">
            <Link to="/reviews" className="sidebar-link">
              <span className="sidebar-icon"><i class="fa-solid fa-splotch"></i></span> Reviews
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/userlist" className="sidebar-link">
              <span className="sidebar-icon"><i class="fa-solid fa-clipboard-list"></i></span> UserList
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button">
        <span className="logout-icon"><i class="fa-solid fa-right-from-bracket"></i></span> Log Out
      </button>
    </div>
  );
}

export default Sidebar;