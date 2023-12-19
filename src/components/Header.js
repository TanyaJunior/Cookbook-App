import React from "react";
import backgroundImage from "./assets/images/background11.jpg"; // Import the image
import "./assets/Header.css";
const Header = () => {
  return (
    <div className="image-container">
       <img
        src={backgroundImage}
        alt="Centered Image"
      />
      <div className="image-container-paragraph">
        <h1>RECIPE BOOK</h1>
        <p>
          A recipe app allows users to explore, search, and save a wide variety
          of culinary delights. Users can effortlessly browse through an
          extensive collection of recipes, explore detailed instructions,
          discover ingredients, and even save their favorite recipes for future
          reference. With a user-friendly interface, search functionalities, and
          personalized features like saved recipes, the app aims to be a go-to
          resource for cooking enthusiasts, offering inspiration and guidance in
          the kitchen. Whether searching for a quick weekday meal or an
          impressive weekend dish, the app provides a delightful culinary
          journey for all levels of cooks.
        </p>
      </div>
    </div>
  );
};

export default Header;
