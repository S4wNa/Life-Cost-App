import React, { useState, useEffect, useRef } from "react";

import MenuBar from "./MenuBar";

function NavbarContent({ clicked, handleMenu }) {
  return (
    <div className=" h-[100vh] w-full ">
      <div className="flex justify-center items-center">
        <MenuBar clicked={clicked} handleMenu={handleMenu} />
      </div>
    </div>
  );
}

export default NavbarContent;
