// function animateMenuToggle(isOpening) {
//     const open = document.querySelector("p#menu-opne");
//     const close = document.querySelector("p#menu-close");

//     gsap.to(isOpening ? open : close, {
//       x: isOpening ? -5 : 5,
//       y: isOpening ? -10 : 10,
//       rotation: isOpening ? -5 : 5,
//       opacity: 0,
//       delay: 0.25,
//       duration: 0.5,
//       ease: "power2.out",
//     });

//     gsap.to(isOpening ? close : open, {
//       x: 0,
//       y: 0,
//       rotation: 0,
//       opacity: 1,
//       delay: 0.5,
//       duration: 0.5,
//       ease: "power2.out",
//     });
//     function openMenu() {
//       if (isAnimating || isOpen) return;
//       isAnimating = true;

//       gsap.to(container, {
//         rotation: 10,
//         x: 300,
//         y: 450,
//         scale: 1.5,
//         duration: 1.25,
//         ease: "power4.inOut",
//       });
//     }
//     animateMenuToggle(true);

//     gsap.to(menuContent, {
//       rotation: 0,
//       x: 0,
//       y: 0,
//       scale: 1,
//       opacity: 1,
//       duration: 1.25,
//       ease: "power4.inOut",
//     });
//   }

//   useGSAP(() => {
//     gsap.to(revealRef.current, {
//       scrollTrigger: {
//         trigger: revealRef.current,
//         start: "top 20%",
//         once: true,
//       },
//       opacity: 1,
//       y: 0,
//       duration: 0.8,
//       ease: "power2.out",
//     });
//   }, [revealRef]);

import React, { useState, useRef } from "react";
import mong from "../assets/mongo2.png";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Enregistrer uniquement les vrais plugins GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

function Page() {
  const [clicked, setClicked] = useState(false);
  const revealRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  // ScrollReveal du bouton Menu
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

  // Animation d'ouverture/fermeture de la navbar
  useGSAP(() => {
    if (clicked) {
      // Animation du rideau qui tombe avec clip-path
      gsap.fromTo(
        overlayRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Fermé en haut
          opacity: 1,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Ouvert complètement
          duration: 1.2,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );

      // Animation de la page principale qui suit le même mouvement
      gsap.to(containerRef.current, {
        y: "-15%", // Léger déplacement vers le haut
        scale: 0.95, // Légère réduction
        filter: "blur(2px)", // Flou léger pour l'effet de profondeur
        duration: 1.2,
        ease: "power2.out",
      });
    } else {
      // Fermeture du rideau vers le haut
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power2.in",
        pointerEvents: "none",
      });

      // Retour de la page principale à sa position normale
      gsap.to(containerRef.current, {
        y: "0%",
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.in",
      });
    }
  }, [clicked]);

  function handleMenu() {
    setClicked((prev) => !prev);
  }

  return (
    <div className="relative h-[165vh] w-full overflow-hidden">
      {/* Page principale - toujours présente */}
      <div className="h-full w-full relative" ref={containerRef}>
        <div
          className="bg-cover h-full w-full text-white"
          style={{ backgroundImage: `url(${mong})` }}
        >
          <div className="container mx-auto h-full flex flex-col">
            <div className="flex flex-col w-full mt-auto">
              <p className="w-140 font-normal text-2xl pb-60 pl-4">
                Life Cost is beautifull well design and user-friendly website
                that will make you stop wasting your time looking for life cost
                in any Country
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col items-start justify-center mt-auto leading-none pb-30">
                <h1 className="font-semibold text-[220px]">Digital</h1>
                <h1 className="font-semibold text-[220px]">Design</h1>
                <h1 className="font-semibold text-[220px]">Experience</h1>
              </div>
              {/* Bouton Menu révélé au scroll */}
              <div
                ref={revealRef}
                onClick={handleMenu}
                className="flex items-center justify-center opacity-0 translate-y-10 h-20 w-30 cursor-pointer z-10 relative"
              >
                <p className="text-white text-2xl mr-2">
                  {clicked ? "Close" : "Menu"}
                </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay navbar - rideau qui tombe */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-stone-800 text-white pointer-events-none"
        style={{
          zIndex: 5,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Initial fermé
        }}
      ></div>
    </div>
  );
}

export default Page;
