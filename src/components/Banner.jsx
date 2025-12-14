import React from "react";

function Banner() {
  return (
    <div
      className="h-[50vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: "url(https://wallpapercave.com/wp/wp3989440.jpg)",
      }}
    >
      <div className="text-white text-xl bg-yellow-900/70 text-center w-full p-3 hover:bg-yellow-900/90 ">
        BAHUBALI
      </div>
    </div>
  );
}

export default Banner;
