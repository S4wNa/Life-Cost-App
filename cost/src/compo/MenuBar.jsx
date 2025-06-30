import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

function MenuBar({ clicked, handleMenu, hideOnOpen = true }) {
  const close = useRef(null);
  const timeClose = useRef(null);

  return (
    <button
      ref={close}
      className="cursor-pointer flex items-center justify-center "
      onClick={handleMenu}
    >
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
    </button>
  );
}

export default MenuBar;
