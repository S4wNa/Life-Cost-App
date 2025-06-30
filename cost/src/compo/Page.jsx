import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import mong from "../assets/mongo2.png";
import MenuBar from "./MenuBar";
import NavbarContent from "./NavbarContent";

// Enregistrer uniquement les vrais plugins GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Page() {
  const [clicked, setCliked] = useState(false);
  const revealRef = useRef(null);
  const navbarFall = useRef(null);

  // Menu bar appear when top of screen reach 20% from top  , i set opacity to 1 beacuse opacity to 0 in the div and y to 0 beause i had mooved it from 10 in the div
  useGSAP(() => {
    gsap.to(revealRef.current, {
      scrollTrigger: {
        trigger: revealRef.current,
        start: "top 20%",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [revealRef]);

  //Menu bar falling if clicked
  useGSAP(() => {
    if (clicked) {
      gsap.fromTo(
        navbarFall.current,
        {
          clipPath: "polygon( 0% 0%, 100% 0% , 100% 0%, 0% 0%)",
          opacity: 1,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) ",
          duration: 1.2,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.to(navbarFall.current, {
        clipPath: "polygon(0% 0%, 100% 0% , 100% 0%, 0% 0%) ",
        duration: 1,
        ease: "power1.in",
        pointerEvents: "none",
      });
    }
  }, [clicked]);

  function handleMenu() {
    setCliked((cli) => !cli);
  }

  return (
    <>
      {
        <div
          className={`w-full relative overflow-hidden font-inter ${
            clicked ? "h-[100vh]" : "h-[165vh]"
          } `}
        >
          <div
            className="bg-cover h-full w-full text-white"
            style={{ backgroundImage: `url(${mong})` }}
          >
            <div className="container mx-auto h-full flex flex-col">
              <div className="flex flex-col w-full mt-auto">
                <p className="w-140 font-normal text-2xl pb-60 pl-4">
                  Life Cost is beautifull well design and user-friendly website
                  that will make you stop wasting your time looking for life
                  cost in any Country
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col items-start justify-center mt-auto leading-none pb-30">
                  <h1 className="font-semibold text-[220px]">Digital</h1>
                  <h1 className="font-semibold text-[220px]">Design</h1>
                  <h1 className="font-semibold text-[220px]">Experience</h1>
                </div>
                {/* Cet élément est masqué au départ et révéle au scroll */}
                <div
                  ref={revealRef}
                  onClick={handleMenu}
                  className="flex items-center justify-center opacity-0 translate-y-10 h-20 w-30 cursor-pointer"
                >
                  <MenuBar clicked={clicked} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={navbarFall}
            className="absolute inset-0 bg-[#0a0a0a] text-white pointer-events-none z-5"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }} //initialement fermé
          >
            <NavbarContent clicked={clicked} handleMenu={handleMenu} />
          </div>
        </div>
      }
    </>
  );
}
