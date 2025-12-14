import React from "react";

function PagiNation({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="bg-gray-400 p-4 m-8 flex justify-center">
      <div
        onClick={handlePrev}
        className="px-8 cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <i className="text-2xl cursor-pointer hover:scale-110">←</i>
      </div>
      <div>{pageNo}</div>
      <div
        onClick={handleNext}
        className="px-8 cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <i className="text-2xl">→</i>
      </div>
    </div>
  );
}

export default PagiNation;
