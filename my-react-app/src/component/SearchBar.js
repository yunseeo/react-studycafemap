import React, { useState, useEffect } from 'react';
import searchImage from './search.png';

const SearchBar = ({ cafes, onSearch, onFavoriteChange }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [showNoResult, setShowNoResult] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(cafes.map((cafe) => ({ name: cafe.name, favorite: cafe.favorites || false })));
  }, [cafes]);

  const handleSearch = () => {
    console.log(`검색어: ${searchText}`);

    const filteredCafes = cafes.filter((cafe) => {
      return (
        cafe.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (cafe.tags && cafe.tags.some((tag) =>
          tag.toLowerCase().includes(searchText.toLowerCase())
        ))
      );
    });

    setFilteredCafes(filteredCafes);
    setShowNoResult(filteredCafes.length === 0 && searchText.length > 0);

    if (typeof onSearch === 'function') {
      onSearch(searchText);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowNoResult(false);
  };

  const handleFavoriteChange = (name) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.map((favorite) => {
        if (favorite.name === name) {
          return { ...favorite, favorite: !favorite.favorite };
        }
        return favorite;
      });
      onFavoriteChange && onFavoriteChange(updatedFavorites); 
      return updatedFavorites;
    });
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="찾으시는 카페가 있으신가요?"
          value={searchText}
          onChange={handleInputChange}
          className='search-input'
        />
        <div className='vertical-line'></div>
        <button onClick={handleSearch} className='search-button'>
          <img src={searchImage} alt='Search' width={25} height={25} />
        </button>
      </div>

      {searchText.length > 0 && (<div className='SearchResult'> '{searchText}' 검색결과</div>)}
      {showNoResult && (
        <div className='cafes-result'>
          <div className='gray-Line'></div>
          <div className='NoSearchResult'>
            검색 결과와 일치하는 카페가 없습니다.
          </div>
          <div className='gray-Line'></div>
        </div>
      )}

      <div className='cafes-result'>
        {filteredCafes.length > 0 && (
          filteredCafes.map((cafe, index, array) => (
            <div key={index} className={`cafe-result ${index === array.length - 1 ? 'last-cafe-result' : ''}`}>
              <div className="gray_Line"></div>
              <img className="picture" src={cafe.imageUrl} />
              <div className="cafeName">{cafe.name}</div>
              <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
              <div className="characteristic">{cafe.tags.join(", ")}</div>
              {favorites.find((favorite) => favorite.name === cafe.name)?.favorite ? (
                <img
                  className="isFavorite"
                  src="img/like.png"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFavoriteChange(cafe.name)}
                />
              ) : (
                <img
                  className="isFavorite"
                  src="img/dislike.png"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFavoriteChange(cafe.name)}
                />
              )}
            </div>
          ))
        )}
        {filteredCafes.length > 0 && <div className="last-grayLine"></div>}
      </div>
    </div>
  );
};

export default SearchBar;
