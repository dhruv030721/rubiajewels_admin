import React, { useState, useEffect } from "react";
import "./CouponCodePage.css";

const CouponCodePage = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "ONLINE",
      discount: "3%",
      validity: { from: "25-10-2024", to: "31-10-2024" },
      active: true,
    },
    {
      id: 2,
      code: "FLAT99OF",
      discount: "5%",
      validity: { from: "25-10-2024", to: "31-10-2024" },
      active: true,
    },
    {
      id: 3,
      code: "2THOUSAND",
      discount: "7%",
      validity: { from: "25-10-2024", to: "31-10-2024" },
      active: true,
    },
    {
      id: 4,
      code: "499",
      discount: "3%",
      validity: { from: "25-10-2024", to: "31-10-2024" },
      active: true,
    },
    {
      id: 5,
      code: "zz10",
      discount: "50%",
      validity: { from: "25-10-2024", to: "31-10-2024" },
      active: false,
    },
  ]);

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    startFrom: "",
    tillValid: "",
  });

  const [activeMenu, setActiveMenu] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateCoupon = () => {
    const newCoupon = {
      id: coupons.length + 1,
      code: formData.code,
      discount: `${formData.discount}%`,
      validity: `From ${formData.startFrom} to ${formData.tillValid}`,
      active: true,
    };
    setCoupons([...coupons, newCoupon]);
    setFormData({ code: "", discount: "", startFrom: "", tillValid: "" });
  };

  const toggleActiveStatus = (id) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
      )
    );
  };

  const handleActionClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditCoupon = (id) => {
    const couponToEdit = coupons.find((coupon) => coupon.id === id);
    if (couponToEdit) {
      setFormData({
        code: couponToEdit.code,
        discount: couponToEdit.discount.replace("%", ""),
        startFrom: couponToEdit.validity.split(" ")[1],
        tillValid: couponToEdit.validity.split(" ")[3],
      });
      setActiveMenu(null);
    }
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    setActiveMenu(null);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        !e.target.closest(".action-menu") &&
        !e.target.closest(".action-options")
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="coupon-container">
      <div className="coupon-grid">
        <div className="form-container">
          <h1>Coupon Code</h1>
          <p>Add, Edit or Delete a Coupon Code</p>
          <label>
            Coupon Code
            <input
              type="text"
              name="code"
              placeholder="Coupon Code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Discount (%)
            <input
              type="text"
              name="discount"
              placeholder="Discount (%)"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Starts From
            <input
              type="date"
              name="startFrom"
              placeholder="Start From"
              value={formData.startFrom}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Till Valid
            <input
              type="date"
              name="tillValid"
              placeholder="Till Valid"
              value={formData.tillValid}
              onChange={handleInputChange}
            />
          </label>
          <button className="coupon-button" onClick={handleCreateCoupon}>
            Create Coupon Code
          </button>
        </div>
        <div>
          <table className="coupon-table">
            <thead>
              <tr>
                <th>NO.</th>
                <th>COUPON CODE</th>
                <th>DISCOUNT (%)</th>
                <th>VALIDITY</th>
                <th>ACTIVE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}</td>
                  <td className="validity-td">
                    {" "}
                    From <br /> {coupon.validity.from} <br /> To <br />{" "}
                    {coupon.validity.to}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleActiveStatus(coupon.id)}
                      className={`toggle-btn ${coupon.active ? "active" : ""}`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="action-td">
                    <div className="action-options">
                      <button
                        className="action-button-edit"
                        onClick={() => handleEditCoupon(coupon.id)}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="action-button-delete"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponCodePage;
