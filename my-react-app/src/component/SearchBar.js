import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ cafes, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCafes, setFilteredCafes] = useState([]);

  const handleSearch = () => {
    console.log(`검색어: ${searchText}`);

    // cafes.json에서 검색어와 일치하는 카페를 찾아서 표시하는 로직을 추가
    const filteredCafes = cafes.filter((cafe) => {
      // 카페 이름 또는 특징 중에 검색어와 일치하는 부분이 있는지 검사
      return (
        cafe.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (cafe.features && cafe.features.some((feature) =>
          feature.toLowerCase().includes(searchText.toLowerCase())
        ))
      );
    });

    setFilteredCafes(filteredCafes);

    if (typeof onSearch === 'function') {
      onSearch(searchText);
    }
  };

  return (
    <div>
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

      <div className='SearchResult'>'{searchText}' 검색결과</div>

      {/* 필터링된 카페 목록을 렌더링하는 부분 */}
      <div className='cafes-result'>
      {filteredCafes && filteredCafes.map((cafe, index, array) => (
        <div key={index} className={`cafe-result ${index === array.length - 1 ? 'last-cafe-result' : ''}`}>
        <div className="grayLine"></div>
        <img className="picture" src={cafe.imageUrl} />
        <div className="cafeName">{cafe.name}</div>
        <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
        <div className="characteristic">{cafe.tags.join(", ")}</div>
      </div>
      ))}
       <div className="last-grayLine"></div>
      </div>
    </div>
  );
};

export default SearchBar;