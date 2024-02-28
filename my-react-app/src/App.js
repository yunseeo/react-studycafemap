import { useState } from "react";
import "./App.css";
import cafes from "./cafes.json";
import SearchBar from "./component/SearchBar";

const CafeItem = ({ test }) => {
  return <div>{test}</div>;
};

function App() {
  const Logo = "LOGO";
  const recommend = "이런 카페는 어떠세요?";

  const [list, setList] = useState(
    cafes.data.map((cafe) => ({
      name: cafe.name,
      favorite: cafe.favorites || false,
    }))
  );
  const changeFavorite = (name, favorite) => {
    setList((prevList) => {
      return prevList.map((item) => {
        if (item.name === name) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      });
    });
  };

  const handleFavoriteChange = (name) => {
    changeFavorite(name);
  };

  console.log(list);

  return (
    <div id="app" className="App">
      <h1 className="Logo">{Logo}</h1>
      <SearchBar cafes={cafes.data} onSearch={(searchText) => console.log('Searched:', searchText)} onFavoriteChange={handleFavoriteChange}/>
      <div className="whatAboutThisCafe">{recommend}</div>

      {cafes.data.map((cafe, index) => (
        <div key={index}>
          <div className="grayLine"></div>
          <img className="picture" src={cafe.imageUrl} />
          <div className="cafeName">{cafe.name}</div>
          <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
          <div className="characteristic">{cafe.tags.join(", ")}</div>
          {list.find((item) => item.name === cafe.name)?.favorite ? (
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
      ))}

      <div className="grayLine"></div>
    </div>
  );
}

export default App;

