import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import WatchList from "./components/WatchList";
import Movies from "./components/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddToWatchList = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      let newWatchList = [...watchlist, movieObj];
      localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
      setWatchList(newWatchList);
      console.log("Added:", movieObj.title);
    }
  };

  let handleRemoveWatchList = (movieObj) => {
    let filteredWatchlist = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
    console.log("Removed:", movieObj.title);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="bold p-1"></div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                watchlist={watchlist}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveWatchList={handleRemoveWatchList}
              />
            </>
          }
        />
        <Route
          path="/WatchList"
          element={
            <WatchList
              watchlist={watchlist}
              handleRemoveWatchList={handleRemoveWatchList}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
