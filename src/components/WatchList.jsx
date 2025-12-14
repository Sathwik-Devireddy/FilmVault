import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import genres from "../utility/genre.js";

function WatchList({ watchlist, handleRemoveWatchList }) {
  const [localWatchlist, setLocalWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [uniqueGenres, setUniqueGenres] = useState([]);

  useEffect(() => {
    setLocalWatchlist(watchlist);

    let genreSet = new Set();
    watchlist.forEach((movie) => {
      movie.genre_ids?.forEach((id) => genreSet.add(id));
    });
    setUniqueGenres(["All Genres", ...Array.from(genreSet)]);
  }, [watchlist]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortIncreasing = () => {
    const sorted = [...localWatchlist].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setLocalWatchlist(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...localWatchlist].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setLocalWatchlist(sorted);
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return "Unknown";
    return genreIds.map((id) => genres[id] || "Unknown").join(", ");
  };

  const filteredMovies = localWatchlist.filter((movieObj) => {
    const matchesSearch = movieObj.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All Genres" ||
      (movieObj.genre_ids && movieObj.genre_ids.includes(selectedGenre));

    return matchesSearch && matchesGenre;
  });

  return (
    <>
      <div className="flex justify-center flex-wrap m-2">
        <div className="flex justify-center items-center font-bold mx-1 h-[3rem] w-[12rem] rounded-xl bg-blue-500 text-white">
          Watchlist ({watchlist.length})
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-2 m-4">
        {uniqueGenres.map((genreId, idx) => {
          const isSelected = selectedGenre === genreId;
          return (
            <div
              key={idx}
              onClick={() => setSelectedGenre(genreId)}
              className={`flex justify-center items-center font-bold px-4 h-[2.5rem] rounded-xl cursor-pointer
          transition-all duration-500 
          ${
            isSelected
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "bg-gray-200 text-black bg-gradient-to-r from-pink-500 to-purple-500 bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-no-repeat bg-left hover:text-white"
          }`}
            >
              {genreId === "All Genres"
                ? "All Genres"
                : genres[genreId] || "Unknown"}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center m-4">
        <input
          onChange={handleSearch}
          value={search}
          className="border h-[3rem] w-[18rem] bg-gray-200 outline-none px-2 rounded"
          type="text"
          placeholder="Search movies..."
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="border-b-2 bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">
                <div className="flex justify-center items-center space-x-2">
                  <div
                    onClick={sortIncreasing}
                    className="cursor-pointer hover:text-blue-600"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div>Rating</div>
                  <div
                    onClick={sortDecreasing}
                    className="cursor-pointer hover:text-blue-600"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th className="p-3">Popularity</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  {search
                    ? "No movies found matching your search"
                    : "Your watchlist is empty"}
                </td>
              </tr>
            ) : (
              filteredMovies.map((movieObj) => (
                <tr key={movieObj.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img
                        src={
                          movieObj.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`
                            : "/placeholder-image.jpg"
                        }
                        className="h-[25vh] w-[20vh] rounded-lg object-cover"
                        alt={movieObj.title}
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                      <div className="mx-4 font-semibold hover:text-blue-600 cursor-pointer">
                        {movieObj.title}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{movieObj.vote_average.toFixed(1)}</td>
                  <td className="p-4">{Math.round(movieObj.popularity)}</td>
                  <td className="p-4">{getGenreNames(movieObj.genre_ids)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveWatchList(movieObj)}
                      className="text-red-600 hover:text-red-800 font-bold px-3 py-1 rounded hover:bg-red-100 transition-colors"
                    >
                      <i className="fa-solid fa-trash mr-1"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
