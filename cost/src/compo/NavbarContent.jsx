import React, { useState, useEffect, useRef } from "react";
import paris from "../assets/paris.jpg";

import MenuBar from "./MenuBar";

function NavbarContent({ clicked, handleMenu }) {
  return (
    <div className="h-[100vh] w-full ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>ICON</div>
          <MenuBar
            clicked={clicked}
            handleMenu={handleMenu}
            hideOnOpen={false}
          />
        </div>
        <div className="items-center justify-center flex">
          <img src={paris} className="w-90 h-140" />
          <div className="grid grid-cols-3">
            <h2 className="">France</h2>
            <h2>France</h2>
            <h2>France</h2>
            <h2>France</h2>
            <h2>France</h2>
            <h2>France</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarContent;
