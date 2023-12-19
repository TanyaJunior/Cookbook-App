import React, { useState } from 'react';
import './assets/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mealsData, setMealsData] = useState([]);

  const handleSearch = () => {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
    fetch(`${apiUrl}filter.php?i=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setMealsData(data.meals || []))
      .catch((error) => console.error('Error fetching meals data:', error));
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="Meals.js">Meals</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
          <div className="search-results">
        <div className="meal-cards">
          {mealsData.map((meal) => (
            <div className="meal-card" key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-picture"
              />
              <div className="meal-title">
                <h3>{meal.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
