import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Meal from './components/Meals.js';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Meal mealsData={searchResults} />
    </div>
  );
};

export default App;
