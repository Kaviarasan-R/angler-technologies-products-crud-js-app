import React, { useState } from "react";
import "../assets/styles/FilterBox.css";

function SearchBox({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className='search-box'
      />
      {/* <button type='submit' onClick={handleSearchSubmit} className='filter-btn'>
        Search
      </button> */}
    </div>
  );
}

export default SearchBox;
