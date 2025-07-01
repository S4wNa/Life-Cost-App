import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import mong from "../assets/mongo2.png";
import MenuBar from "./MenuBar";
import NavbarContent from "./NavbarContent";

import butterfly from "../assets/buf.png";

// Enregistrer uniquement les vrais plugins GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Page() {
  const [clicked, setCliked] = useState(false);
  // const revealRef = useRef(null);
  const navbarFall = useRef(null);
  const revealTitle = useRef(null);
  const revealTitle1 = useRef(null);

  useGSAP(() => {
    gsap.delayedCall(0.1, () => {
    let text = SplitText.create(revealTitle.current, {
      type: "lines",
      charClass: "line",
    });
    let logo = SplitText.create(revealTitle1.current, {
      type: "lines",
      charClass: "line",
    });
    gsap.from(text.lines, { y: 100, autoAlpha: 0, stagger: 0.06 });
    gsap.from(logo.lines, { y: 100, autoAlpha: 0, stagger: 0.05 });
      });
  }, []);

  // Menu bar appear when top of screen reach 20% from top  , i set opacity to 1 beacuse opacity to 0 in the div and y to 0 beause i had mooved it from 10 in the div
  // useGSAP(() => {
  //   gsap.to(revealRef.current, {
  //     scrollTrigger: {
  //       trigger: revealRef.current,
  //       start: "top 20%",
  //       once: true,
  //     },
  //     opacity: 1,
  //     y: 0,
  //     duration: 0.8,
  //     ease: "power2.out",
  //   });
  // }, [revealRef]);

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
          className={`w-full relative overflow-hidden font-inter transition-[height] duration-700 ease-in-out  text-[#faf4ed] ${
            clicked ? "h-[100vh] " : " h-[100vh]  md:h-[140vh] lg:h-[165vh] "
          } `}
        >
          <div
            className="bg-cover h-full w-full  "
            style={{ backgroundImage: `url(${mong})` }}
          >
            <div className="container mx-auto h-full flex flex-col ">
              <Link to="/">
                <img
                  src={butterfly}
                  alt="logo"
                  className="w-50 h-20  mr-20 mt-10"
                />
              </Link>
              <div className="flex flex-col w-full  md:mt-85 lg:mt-80 xl:mt-auto">
                <p
                  ref={revealTitle}
                  className=" w-100 md:w-130 xl:w-140 font-normal text-md md:text-xl xl:text-2xl md:pb-60 pt-20 md:pt-0 pl-3 pb-30 "
                >
                  Life Cost is beautifull well design and user-friendly website
                  that will make you stop wasting your time looking for life
                  cost in any Country
                </p>
              </div>
              <div className="flex justify-between ">
                <div className="flex flex-col items-start justify-center mt-auto leading-none  pb-0 lg:pb-30 md:w-100 lg:w-150">
                  <h1
                    ref={revealTitle1}
                    className="text-[70px] font-semibold md:text-[140px] my-4 sm:my-0 lg:text-[180px] xl:text-[220px]"
                  >
                    Digital
                  </h1>
                  <h1 className=" text-[70px]  font-semibold md:text-[140px] my-4 sm:my-0 lg:text-[180px] xl:text-[220px]">
                    Design
                  </h1>
                  <h1 className=" text-[58px]  font-semibold md:text-[140px] my-4 sm:my-0 lg:text-[180px] xl:text-[220px]">
                    Experience
                  </h1>
                </div>
                {/* Cet élément est masqué au départ et révéle au scroll */}
                <div
                  // ref={revealRef}
                  onClick={handleMenu}
                  className="flex items-center justify-center h-20 w-30 cursor-pointer"
                  // opacity-0 translate-y-10
                >
                  <MenuBar clicked={clicked} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={navbarFall}
            className="absolute inset-0 bg-[#0a0a0a] text-[#faf4ed]pointer-events-none z-5"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }} //initialement fermé
          >
            <NavbarContent clicked={clicked} handleMenu={handleMenu} />
          </div>
        </div>
      }
    </>
  );
}
