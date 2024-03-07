import { useState } from "react";
import "./App.css";
import cafes from "./cafes.json";
import SearchBar from "./component/SearchBar";

function App() {
  const Logo = "LOGO";
  const recommend = "이런 카페는 어떠세요?";

  const [favorites, setFavorites] = useState(
    cafes.data.map((cafe) => ({
      name: cafe.name,
      favorite: cafe.favorites || false,
    }))
  );

  const handleFavoriteChange = (name) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.map((favorite) => {
        if (favorite.name === name) {
          return { ...favorite, favorite: !favorite.favorite };
        }
        return favorite;
      });
      return updatedFavorites;
    });
  };

  return (
    <div id="app" className="App">
      <h1 className="Logo">{Logo}</h1>
      <SearchBar
        cafes={cafes.data}
        onSearch={(searchText) => console.log('Searched:', searchText)}
        favorites={favorites}
        onFavoriteChange={handleFavoriteChange}
      />
      <div className="whatAboutThisCafe">{recommend}</div>

      {cafes.data.map((cafe, index) => (
        <div key={index} className="recommend-cafelist">
          <div className="grayLine"></div>
          <img className="picture" src={cafe.imageUrl || "이미지 주소가 없을 때 기본 이미지 주소"} width={100} height={100}/>
          <div className="cafeName">{cafe.name}</div>
          <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
          <div className="characteristic">{cafe.tags.join(", ")}</div>
          {favorites.find((item) => item.name === cafe.name)?.favorite ? (
            <img
              className="isFavorite"
              src="img/like.png"
              style={{ cursor: "pointer" }}
              onClick={() => handleFavoriteChange(cafe.name)}
              alt="favorite"
            />
          ) : (
            <img
              className="isFavorite"
              src="img/dislike.png"
              style={{ cursor: "pointer" }}
              onClick={() => handleFavoriteChange(cafe.name)}
              alt="not favorite"
            />
          )}
        </div>
      ))}

      <div className="grayLine"></div>
    </div>
  );
}

export default App;

