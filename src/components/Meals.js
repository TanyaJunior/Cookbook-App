import React, { useState, useEffect } from "react";
import "./assets/Meal.css";

const Meal = () => {
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/";
    const searchInputTxt = "";

    fetch(`${apiUrl}filter.php?i=${searchInputTxt}`)
      .then((response) => response.json())
      .then((data) => setMealsData(data.meals || []))
      .catch((error) => console.error("Error fetching meals data:", error));
  }, []);

  const handleRecipeClick = (meal) => {
    const recipeDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;

    fetch(recipeDetailsUrl)
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.meals[0];
        const ingredients = [];

        // Collect ingredients and measurements
        for (let i = 1; i <= 20; i++) {
          if (recipe[`strIngredient${i}`]) {
            ingredients.push(
              `${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`
            );
          } else {
            break;
          }
        }

        // Join ingredients, each on a new line
        const formattedIngredients = ingredients.join("\n");

        // Extracting cooking times mentioned in the instructions
        const cookingTimes = recipe.strInstructions.match(
          /\d+\s*(?:minute|hour)s?/gi
        );

        // Assuming the cooking time is the maximum duration mentioned in the instructions
        let estimatedCookingTime = "Cooking time not specified";
        if (cookingTimes && cookingTimes.length > 0) {
          estimatedCookingTime = cookingTimes.reduce((maxTime, time) => {
            const duration = parseInt(time.match(/\d+/)[0]);
            return duration > maxTime ? duration : maxTime;
          }, 0);
          estimatedCookingTime = `Estimated cooking time: ${estimatedCookingTime} minutes`;
        }

        const popUpCard = document.createElement("div");
        popUpCard.className = "pop-up-card";

        const popUpContent = document.createElement("div");
        popUpContent.className = "pop-up-content";

        popUpContent.innerHTML = `
          <h2>${recipe.strMeal}</h2>
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <p>${recipe.strInstructions}</p>
          <h3>Ingredients:</h3>
          <pre>${formattedIngredients}</pre>
          <p>${estimatedCookingTime}</p>
        `;

        popUpCard.appendChild(popUpContent);

        const closeButtonBottom = document.createElement("button");
        closeButtonBottom.textContent = "Close";
        closeButtonBottom.className = "close-button";
        closeButtonBottom.onclick = function () {
          popUpCard.remove();
        };

        popUpCard.appendChild(closeButtonBottom);
        document.body.appendChild(popUpCard);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  return (
    <div className="meal-container">
      <h1>Meals</h1>
      <div className="meal-cards">
        {mealsData.map((meal) => (
          <div className="meal-card" key={meal.idMeal}>
            <div className="meal-picture">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-picture"
              />
            </div>
            <div className="meal-title">
              <h3>{meal.strMeal}</h3>
              <button
                onClick={() => handleRecipeClick(meal)}
                className="get-recipe-button"
              >
                Get Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meal;
