import React, { useState } from "react";
import "./CategoriesPage.css";
import Image1 from "../assets/goldRingImage1.jpg";
import Image2 from "../assets/goldGiftsImage1.webp";
import Image3 from "../assets/goldEarringImage1.webp";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Rings", image: Image1, isActive: true },
    { id: 2, name: "Bestsellers", image: Image2, isActive: false },
    { id: 3, name: "Earrings", image: Image3, isActive: true },
  ]);

  const [newCategory, setNewCategory] = useState({ name: "", image: null });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCategory({ ...newCategory, image: imageUrl });
      setImagePreview(imageUrl);  
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.image) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory.name.toUpperCase(),
          image: newCategory.image,
          isActive: true,
        },
      ]);
      setNewCategory({ name: "", image: null });
      setImagePreview(null);  
    }
  };

  const handleEditCategory = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setNewCategory({ name: category.name, image: category.image });
    setImagePreview(category.image); 
    setEditCategoryId(id);
  };

  const handleUpdateCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editCategoryId
          ? { ...cat, name: newCategory.name, image: newCategory.image }
          : cat
      )
    );
    setNewCategory({ name: "", image: null });
    setImagePreview(null); 
    setEditCategoryId(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const toggleActiveStatus = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  return (
    <div className="categories-page">
      <div className="categories-form">
        <h3>Categories</h3>
        <p>Add, Edit or Delete a Category</p>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            placeholder="Type here"
          />
          <label>Image</label>
          <input type="file" onChange={handleFileChange} /> 
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          <button onClick={editCategoryId ? handleUpdateCategory : handleAddCategory}>
            {editCategoryId ? "Update Category" : "Create Category"}
          </button>
        </div>
      </div>
      <div className="categories-table">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>ACTIVE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={category.image} alt={category.name} />
                </td>
                <td>{category.name}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={category.isActive}
                      onChange={() => toggleActiveStatus(category.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="categori-action">
                  <button onClick={() => handleEditCategory(category.id)}><i class="fa-solid fa-pen-to-square"></i></button>
                  <button onClick={() => handleDeleteCategory(category.id)}><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
