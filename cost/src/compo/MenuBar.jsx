import React from "react";

function MenuBar({ clicked, handleMenu }) {
  return (
    <>
      <p className="text-white text-2xl mr-2">{clicked ? "Close" : "Menu"}</p>
      <div className="flex flex-col space-y-1 pt-1">
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            clicked ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
            clicked ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            clicked ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </div>
    </>
  );
}

export default MenuBar;
