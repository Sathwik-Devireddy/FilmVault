import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import PagiNation from "./PagiNation";

function Movies({ handleAddToWatchList, handleRemoveWatchList, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=81275ecc298aeb3d3093169a56eb1b5a&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [pageNo]);

  return (
    <>
      <div className="p-3">
        <h1 className="text-xl text-center font-bold p-2">TRENDING MOVIES</h1>
        <div className="flex flex-row flex-wrap justify-around">
          {movies.map((movie) => (
            <MovieCard
              movieObj={movie} // ✅ fixed naming
              key={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveWatchList={handleRemoveWatchList}
              watchlist={watchlist}
            />
          ))}
        </div>
        <PagiNation
          pageNo={pageNo}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </>
  );
}

export default Movies;
