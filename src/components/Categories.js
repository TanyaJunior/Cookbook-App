import React, { useState, useEffect } from "react";
import "./assets/Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <div className="category-list">
        <div className="scrollable">
          {categories.map((category) => (
            <div className="category-card" key={category.idCategory}>
              <h3>{category.strCategory}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
