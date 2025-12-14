import React from "react";

function MovieCard({
  movieObj,
  poster,
  title,
  handleAddToWatchList,
  handleRemoveWatchList,
  watchlist,
}) {
  function doesContain(movieObj) {
    return watchlist.some((movie) => movie.id === movieObj.id);
  }

  return (
    <div
      className="relative h-[35vh] w-[200px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-105 duration-300 m-1.5 overflow-hidden"
      style={{
        backgroundImage: `url(${poster})`,
      }}
      title={title}
    >
      {/* Add / Remove button */}
      <div
        style={{ fontSize: "20px", backgroundColor: "rgba(0,0,0,0.7)" }}
        className="absolute top-2 left-2 text-6xl h-8 w-8 rounded-lg"
      >
        {doesContain(movieObj) ? (
          <div
            onClick={() => handleRemoveWatchList(movieObj)}
            className="flex justify-center items-center h-8 w-8 hover:cursor-pointer hover:bg-black/100"
          >
            &#9940;
          </div>
        ) : (
          <div
            onClick={() => handleAddToWatchList(movieObj)}
            className="flex justify-center items-center h-8 w-8 hover:cursor-pointer hover:bg-black/100"
          >
            &#128525;
          </div>
        )}
      </div>

      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm text-center p-2 hover:cursor-pointer hover:bg-black/90">
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
