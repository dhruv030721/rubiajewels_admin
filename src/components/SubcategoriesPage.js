import React, { useState } from "react";
import "./SubcategoriesPage.css";
import SubImage1 from "../assets/collection1.webp";
import SubImage2 from "../assets/collection2.webp";
import SubImage3 from "../assets/collection3.webp";

const SubcategoriesPage = () => {
  const [subcategories, setSubcategories] = useState([
    { id: 1, name: "Diamond Rings", image: SubImage1, isActive: true },
    { id: 2, name: "Gold Earrings", image: SubImage2, isActive: false },
    { id: 3, name: "Platinum Bracelets", image: SubImage3, isActive: false },
  ]);

  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    image: null,
  });
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory({ ...newSubcategory, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewSubcategory({ ...newSubcategory, image: imageUrl });
      setImagePreview(imageUrl);
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.name && newSubcategory.image) {
      setSubcategories([
        ...subcategories,
        {
          id: subcategories.length + 1,
          name: newSubcategory.name.toUpperCase(),
          image: newSubcategory.image,
          isActive: true,
        },
      ]);
      setNewSubcategory({ name: "", image: null });
      setImagePreview(null);
    }
  };

  const handleEditSubcategory = (id) => {
    const subcategory = subcategories.find((subcat) => subcat.id === id);
    setNewSubcategory({ name: subcategory.name, image: subcategory.image });
    setImagePreview(subcategory.image);
    setEditSubcategoryId(id);
  };

  const handleUpdateSubcategory = () => {
    setSubcategories(
      subcategories.map((subcat) =>
        subcat.id === editSubcategoryId
          ? {
              ...subcat,
              name: newSubcategory.name,
              image: newSubcategory.image,
            }
          : subcat
      )
    );
    setNewSubcategory({ name: "", image: null });
    setImagePreview(null);
    setEditSubcategoryId(null);
  };

  const handleDeleteSubcategory = (id) => {
    setSubcategories(subcategories.filter((subcat) => subcat.id !== id));
  };

  const toggleActiveStatus = (id) => {
    setSubcategories(
      subcategories.map((subcat) =>
        subcat.id === id ? { ...subcat, isActive: !subcat.isActive } : subcat
      )
    );
  };

  return (
    <div className="subcategories-page">
      <div className="subcategories-form">
        <h3>Subcategories</h3>
        <p>Add, Edit or Delete a Subcategory</p>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newSubcategory.name}
            onChange={handleInputChange}
            placeholder="Type here"
          />
          <label>Image</label>
          <input type="file" onChange={handleFileChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          <button
            onClick={
              editSubcategoryId ? handleUpdateSubcategory : handleAddSubcategory
            }
          >
            {editSubcategoryId ? "Update Subcategory" : "Create Subcategory"}
          </button>
        </div>
      </div>
      <div className="subcategories-table">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>ACTIVE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory, index) => (
              <tr key={subcategory.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={subcategory.image} alt={subcategory.name} />
                </td>
                <td>{subcategory.name}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={subcategory.isActive}
                      onChange={() => toggleActiveStatus(subcategory.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="subcategori-action">
                  <button onClick={() => handleEditSubcategory(subcategory.id)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteSubcategory(subcategory.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcategoriesPage;
