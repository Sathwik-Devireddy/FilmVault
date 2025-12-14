import React from "react";
import logo from "../logo2g.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="flex border space-x-10 items-center sticky top-0 bg-white shadow-md p-1 z-3">
        <img src={logo} className="w-[50px]" alt="logo"></img>
        <Link to="/" className="text-blue-800 text-2xl font-bold">
          Home
        </Link>
        <Link to="/watchlist" className="text-blue text-2xl font-bold">
          WatchList
        </Link>
      </div>
    </>
  );
}

export default Navbar;
