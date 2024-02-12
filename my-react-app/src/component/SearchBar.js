import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log(`검색어: ${searchText}`);
    //onSearch(searchText);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="찾으시는 카페가 있으신가요?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='search-input'
      />
      <div className='vertical-line'></div>
      <button onClick={handleSearch} className='search-button'>
        <img src={searchImage} alt='Search' width={25} height={25} />
      </button>
    </div>
  );
};

export default SearchBar;