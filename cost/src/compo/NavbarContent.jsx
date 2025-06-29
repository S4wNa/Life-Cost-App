import React, { useState, useEffect, useRef } from "react";

import MenuBar from "./MenuBar";

function NavbarContent({ clicked, handleMenu }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <MenuBar clicked={clicked} onClick={handleMenu} />
      </div>
    </>
  );
}

export default NavbarContent;
