import React, { useState, useEffect, useRef } from "react";

import MenuBar from "./MenuBar";

function NavbarContent({ clicked, handleMenu }) {
  return (
    <div className="h-[100vh] w-full ">
      <div className="flex justify-center">
        <MenuBar clicked={clicked} handleMenu={handleMenu} hideOnOpen={false} />
      </div>
    </div>
  );
}

export default NavbarContent;
