import React, { useState } from "react";
import "../assets/styles/FilterBox.css";

function FilterBox({ onFilter }) {
  const [sortOption, setSortOption] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onFilter(sortOption, selectedCategory);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  return (
    <form onSubmit={handleSearchSubmit} className='filter-box'>
      <div className='radio-container'>
        <label>
          <input
            type='radio'
            value='1'
            checked={sortOption === "1"}
            onChange={handleSortChange}
          />
          Oldest
        </label>
        <label>
          <input
            type='radio'
            value='-1'
            checked={sortOption === "-1"}
            onChange={handleSortChange}
          />
          Newest
        </label>
      </div>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='dropdown-box'
      >
        <option value=''>All Categories</option>
        <option value='Electronics'>Electronics</option>
        <option value='Gadgets'>Gadgets</option>
        <option value='Computer'>Computer</option>
        <option value='Clothing'>Clothing</option>
        <option value='Home & Kitchen'>Home & Kitchen</option>
        <option value='Beauty & Personal Care'>Beauty & Personal Care</option>
        <option value='Health & Fitness'>Health & Fitness</option>
        <option value='Books & Media'>Books & Media</option>
        <option value='Sports & Outdoors'>Sports & Outdoors</option>
        <option value='Toys & Games'>Toys & Games</option>
        <option value='Jewelry & Accessories'>Jewelry & Accessories</option>
        <option value='Baby & Kids'>Baby & Kids</option>
        <option value='Furniture & Decor'>Furniture & Decor</option>
        <option value='Groceries & Food'>Groceries & Food</option>
      </select>
      <button type='submit' className='filter-btn'>
        Filter
      </button>
    </form>
  );
}

export default FilterBox;
