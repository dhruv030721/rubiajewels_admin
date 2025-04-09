import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    category: "",
    subcategory: "",
    weight: "",
    availableKarats: [],
    availableStones: [],
    description: "",
    diamondColor: "",
    numberOfDiamond: "",
    diamondCutGrade: "",
    diamondShape: "",
    diamondType: "",
    sideDiamondColor: "",
    numberOfSideDiamond: "",
    sideDiamondShape: "",
    sideDiamondCutGrade: "",
    sideDiamondType: "",
    stoneColor: "",
    stoneType: "",
    stoneWeight: "",
    stoneShape: "",
  });

  const [files, setFiles] = useState({
    goldImage: null,
    roseGoldImage: null,
    silverImage: null,
    hoverImage: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: Array.from(files),
    }));
  };

  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [karatPrices, setKaratPrices] = useState([]);
  const [stoneTotalPrice, setStoneTotalPrice] = useState(0);

  const [discountedPrices, setDiscountedPrices] = useState({
    discountedPrice10k: 0,
    discountedPrice14k: 0,
    discountedPrice18k: 0,
  });

  const [calculatedPrice, setCalculatedPrice] = useState({
    price10k: 0,
    price14k: 0,
    price18k: 0,
  });

  const [productDetails, setProductDetails] = useState({
    goldWeight10k: 0,
    goldWeight14k: 0,
    goldWeight18k: 0,
    diamondPrice: 0,
    diamondWeight: 0,
    sideDiamondWeight: 0,
    stonePieces: 0,
    stonePrice: 0,
    makingCharge: 0,
    discount: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("https://backend.rubiajewels.com/api/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchKaratPrices = async () => {
      try {
        const response = await axios.get(
          "https://backend.rubiajewels.com/api/karat-prices"
        );
        setKaratPrices(response.data);
      } catch (error) {
        console.error("Error fetching karat prices:", error);
      }
    };
    fetchKaratPrices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const calculatePrice = () => {
    const {
      goldWeight10k,
      goldWeight14k,
      goldWeight18k,
      diamondPrice,
      diamondWeight,
      sideDiamondWeight,  
      stonePieces,
      stonePrice,
      makingCharge,
      discount,
    } = productDetails;

    const calculate = (goldWeight, karatPrice) => {
      const diamondTotalWeight =
        parseFloat(diamondWeight) + parseFloat(sideDiamondWeight);
      const diamondTotalPrice = parseFloat(diamondPrice) * diamondTotalWeight; 
      const stoneTotalPrice = parseFloat(stonePieces) * parseFloat(stonePrice); 

      const totalPriceBeforeDiscount =
        parseFloat(karatPrice) * parseFloat(goldWeight) +
        diamondTotalPrice +
        stoneTotalPrice +
        parseFloat(makingCharge);

      const totalPriceAfterDiscount =
        totalPriceBeforeDiscount - parseFloat(discount);

      return totalPriceAfterDiscount + totalPriceAfterDiscount * 0.03;
    };

    setCalculatedPrice({
      price10k: calculate(
        goldWeight10k,
        karatPrices.find((k) => k.karat === "10K")?.price || 0
      ),
      price14k: calculate(
        goldWeight14k,
        karatPrices.find((k) => k.karat === "14K")?.price || 0
      ),
      price18k: calculate(
        goldWeight18k,
        karatPrices.find((k) => k.karat === "18K")?.price || 0
      ),
    });

    const calculateDiscountedPrice = (goldWeight, karatPrice) => {
      const diamondTotalWeight =
        parseFloat(diamondWeight) + parseFloat(sideDiamondWeight);
      const diamondTotalPrice = parseFloat(diamondPrice) * diamondTotalWeight;
      const stoneTotalPrice = parseFloat(stonePieces) * parseFloat(stonePrice);
      setStoneTotalPrice(stoneTotalPrice);

      return (
        parseFloat(karatPrice) * parseFloat(goldWeight) +
        diamondTotalPrice +
        stoneTotalPrice +
        parseFloat(makingCharge) -
        parseFloat(discount)
      );
    };

    setDiscountedPrices({
      discountedPrice10k: calculateDiscountedPrice(
        goldWeight10k,
        karatPrices.find((k) => k.karat === "10K")?.price || 0
      ),
      discountedPrice14k: calculateDiscountedPrice(
        goldWeight14k,
        karatPrices.find((k) => k.karat === "14K")?.price || 0
      ),
      discountedPrice18k: calculateDiscountedPrice(
        goldWeight18k,
        karatPrices.find((k) => k.karat === "18K")?.price || 0
      ),
    });
  };

  useEffect(() => {
    calculatePrice();
  }, [productDetails, karatPrices]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });
    setSubcategories(categories[selectedCategory] || []);
  };

  const handleKaratChange = (karat, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        availableKarats: [...formData.availableKarats, karat],
      });
    } else {
      setFormData({
        ...formData,
        availableKarats: formData.availableKarats.filter((k) => k !== karat),
      });
    }
  };

  const handleStoneChange = (stone, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        availableStones: [...formData.availableStones, stone],
      });
    } else {
      setFormData({
        ...formData,
        availableStones: formData.availableStones.filter((s) => s !== stone),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("productId", formData.productId);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("weight", formData.weight);
    data.append("price10k", calculatedPrice.price10k);
    data.append("price14k", calculatedPrice.price14k);
    data.append("price18k", calculatedPrice.price18k);
    data.append("discountedPrice10k", discountedPrices.discountedPrice10k);
    data.append("discountedPrice14k", discountedPrices.discountedPrice14k);
    data.append("discountedPrice18k", discountedPrices.discountedPrice18k);
    data.append("availableKarats", JSON.stringify(formData.availableKarats));
    data.append("availableStones", JSON.stringify(formData.availableStones));
    data.append("description", formData.description);
    data.append("diamondColor", formData.diamondColor);
    data.append("numberOfDiamond", formData.numberOfDiamond);
    data.append("diamondCutGrade", formData.diamondCutGrade);
    data.append("diamondShape", formData.diamondShape);
    data.append("diamondType", formData.diamondType);
    data.append("sideDiamondColor", formData.sideDiamondColor);
    data.append("numberOfSideDiamond", formData.numberOfSideDiamond);
    data.append("sideDiamondShape", formData.sideDiamondShape);
    data.append("sideDiamondCutGrade", formData.sideDiamondCutGrade);
    data.append("sideDiamondType", formData.sideDiamondType);
    data.append("stonePieces", productDetails.stonePieces);
    data.append("stoneColor", formData.stoneColor);
    data.append("stoneType", formData.stoneType);
    data.append("stoneWeight", formData.stoneWeight);
    data.append("stoneShape", formData.stoneShape);

    if (files.goldImage) {
      files.goldImage.forEach((file) => data.append("goldImage", file));
    }

    if (files.roseGoldImage) {
      files.roseGoldImage.forEach((file) => data.append("roseGoldImage", file));
    }

    if (files.silverImage) {
      files.silverImage.forEach((file) => data.append("silverImage", file));
    }

    if (files.hoverImage && files.hoverImage.length > 0) {
      data.append("hoverImage", files.hoverImage[0]);
    }

    try {
      const response = await axios.post(
        "https://backend.rubiajewels.com/api/products",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product has been added");
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      console.error(error.response?.data);
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="product-name">
            <h3 className="add-product-h3">Product Name</h3>
            <div className="two-form-group-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange(e)}
                  required
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <h3 className="add-product-h3">Product Details</h3>
          <div className="price">
            <div className="two-form-group-row">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Product Weight</label>
                <input
                  type="text"
                  name="weight"
                  placeholder="Type here"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">  
                <label>Product Id</label>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Product Description</label>
                <textarea
                  rows="1"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Type here"
                ></textarea>
              </div>
            </div>
          </div>

          <ul className="karat-prices" hidden>
            {karatPrices.length > 0 ? (
              karatPrices.map((karat) => (
                <li key={karat.id}>
                  {karat.name} ${karat.price}
                </li>
              ))
            ) : (
              <p>Loading karat prices...</p>
            )}
          </ul>

          <div className="height-width">
            <h3 className="add-product-h3">Gold Weight</h3>
            <div className="three-form-group-row">
              <div className="form-group">
                <label>Gold Weight 10k</label>
                <input
                  type="text"
                  name="goldWeight10k"
                  value={productDetails.goldWeight10k}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Gold Weight 14k</label>
                <input
                  type="text"
                  name="goldWeight14k"
                  value={productDetails.goldWeight14k}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Gold Weight 18k</label>
                <input
                  type="text"
                  name="goldWeight18k"
                  value={productDetails.goldWeight18k}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
            </div>

            <h3 className="add-product-h3">Diamond Discount / Process</h3>
            <div className="price">
              <div className="two-form-group-row">
                <div className="form-group">
                  <label>Making Charge </label>
                  <input
                    type="text"
                    name="makingCharge"
                    value={productDetails.makingCharge}
                    onChange={handleProductDetailsChange}
                    placeholder="Type here"
                  />
                </div>
                <div className="form-group">
                  <label>Discount</label>
                  <input
                    type="text"
                    name="discount"
                    value={productDetails.discount}
                    onChange={handleProductDetailsChange}
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="height-width">
            <h3 className="add-product-h3">Diamond Details</h3>
            <div className="three-form-group-row">
              <div className="form-group">
                <label>Diamond Color</label>
                <input
                  type="text"
                  name="diamondColor"
                  value={formData.diamondColor}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Number Of Diamond</label>
                <input
                  type="text"
                  name="numberOfDiamond"
                  value={formData.numberOfDiamond}
                  onChange={handleInputChange}
                  placeholder="Type here [Number]"
                />
              </div>
              <div className="form-group">
                <label>Diamond Cut Grade</label>
                <input
                  type="text"
                  name="diamondCutGrade"
                  value={formData.diamondCutGrade}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Diamond Shape</label>
                <input
                  type="text"
                  name="diamondShape"
                  value={formData.diamondShape}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Diamond Price</label>
                <input
                  type="text"
                  name="diamondPrice"
                  value={productDetails.diamondPrice}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Diamond Weight</label>
                <input
                  type="text"
                  name="diamondWeight"
                  value={productDetails.diamondWeight}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Diamond Type</label>
                <input
                  type="text"
                  name="diamondType"
                  value={formData.diamondType}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
            </div>
          </div>
          <div className="shown-prices">
            <div className="calculated-prices">
              <p>
                Original Price (10K): ₹{calculatedPrice.price10k.toFixed(2)}
              </p>
              <p>
                Original Price (14K): ₹{calculatedPrice.price14k.toFixed(2)}
              </p>
              <p>
                Original Price (18K): ₹{calculatedPrice.price18k.toFixed(2)}
              </p>
            </div>
            <div className="discounted-prices">
              <p>
                Discounted Price (10K): ₹
                {discountedPrices.discountedPrice10k.toFixed(2)}
              </p>
              <p>
                Discounted Price (14K): ₹
                {discountedPrices.discountedPrice14k.toFixed(2)}
              </p>
              <p>
                Discounted Price (18K): ₹
                {discountedPrices.discountedPrice18k.toFixed(2)}
              </p>
            </div>
          </div>
          <br />
          <br />

          <button className="public-button" type="submit">
            Publish
          </button>
        </div>

        <div className="right-section">
          <div className="form-group">
            <h3>Gold Product Image</h3>
            <input
              type="file"
              name="goldImage"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="form-group">
            <h3>RoseGold Product Image</h3>
            <input
              type="file"
              name="roseGoldImage"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="form-group">
            <h3>Silver Product Image</h3>
            <input
              type="file"
              name="silverImage"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="form-group">
            <h3>Hover Product Image</h3>
            <input type="file" name="hoverImage" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <h3 className="add-product-h3">Select Carat</h3>
            <div className="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  value="10k"
                  checked={formData.availableKarats.includes("10k")}
                  onChange={(e) =>
                    handleKaratChange(e.target.value, e.target.checked)
                  }
                />
                <label>10K</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="14k"
                  checked={formData.availableKarats.includes("14k")}
                  onChange={(e) =>
                    handleKaratChange(e.target.value, e.target.checked)
                  }
                />
                <label>14K</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="18k"
                  checked={formData.availableKarats.includes("18k")}
                  onChange={(e) =>
                    handleKaratChange(e.target.value, e.target.checked)
                  }
                />
                <label>18K</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h3 className="add-product-h3">Select Stone</h3>
            <div className="checkbox-group">
              <div>
                <input
                  type="checkbox"
                  value="Mother-of-pearl"
                  checked={formData.availableStones.includes("Mother-of-pearl")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Mother-of-pearl</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Malachite"
                  checked={formData.availableStones.includes("Malachite")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Malachite</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Tiger-Eye"
                  checked={formData.availableStones.includes("Tiger-Eye")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Tiger Eye</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Onyx"
                  checked={formData.availableStones.includes("Onyx")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Onyx</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Turquoise"
                  checked={formData.availableStones.includes("Turquoise")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Turquoise</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Diamond"
                  checked={formData.availableStones.includes("Diamond")}
                  onChange={(e) =>
                    handleStoneChange(e.target.value, e.target.checked)
                  }
                />
                <label>Diamond</label>
              </div>
            </div>
          </div>

          <div className="height-width">
            <h3 className="add-product-h3">Side Diamond Details</h3>
            <div className="three-form-group-row">
              <div className="form-group">
                <label>Side Diamond Color</label>
                <input
                  type="text"
                  name="sideDiamondColor"
                  value={formData.sideDiamondColor}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Number Of Side Diamond</label>
                <input
                  type="text"
                  name="numberOfSideDiamond"
                  value={formData.numberOfSideDiamond}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Side Diamond Shape</label>
                <input
                  type="text"
                  name="sideDiamondShape"
                  value={formData.sideDiamondShape}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Side Diamond Cut Grade</label>
                <input
                  type="text"
                  name="sideDiamondCutGrade"
                  value={formData.sideDiamondCutGrade}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Side Diamond Type</label>
                <input
                  type="text"
                  name="sideDiamondType"
                  value={formData.sideDiamondType}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Side Diamond Weight</label>
                <input
                  type="text"
                  name="sideDiamondWeight"
                  value={productDetails.sideDiamondWeight}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
            </div>
          </div>

          <div className="height-width">
            <h3 className="add-product-h3">Stone Details</h3>
            <div className="three-form-group-row">
              <div className="form-group">
                <label>Stone Piece</label>
                <input
                  type="text"
                  name="stonePieces"
                  value={productDetails.stonePieces}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Stone Price Per Piece</label>
                <input
                  type="text"
                  name="stonePrice"
                  value={productDetails.stonePrice}
                  onChange={handleProductDetailsChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Total Stone Price</label>
                <input 
                  type="text"
                  value={stoneTotalPrice.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Stone Color</label>
                <input
                  type="text"
                  name="stoneColor"
                  value={formData.stoneColor}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Stone Type</label>
                <input
                  type="text"
                  name="stoneType"
                  value={formData.stoneType}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Stone Weight</label>
                <input
                  type="text"
                  name="stoneWeight"
                  value={formData.stoneWeight}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
              <div className="form-group">
                <label>Stone Shape</label>
                <input
                  type="text"
                  name="stoneShape"
                  value={formData.stoneShape}
                  onChange={handleInputChange}
                  placeholder="Type here"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
