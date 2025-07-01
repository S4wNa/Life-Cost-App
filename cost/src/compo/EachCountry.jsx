import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import MenuBar from "./MenuBar";
import NavbarContent from "./NavbarContent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import butterfly from "../assets/buf.png";

export default function EachCountry() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // état + ref pour l’overlay
  const [clicked, setClicked] = useState(false);
  const navbarFall = useRef(null);

  // 1) Charger les données du pays
  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("countries")
        .select("name, image_path")
        .eq("name", countryName)
        .single();
      if (error) setError(error);
      else setCountry(data);
      setLoading(false);
    }
    load();
  }, [countryName]);

  // 2) Animation “voile qui tombe” avec useGSAP + opacité
  useGSAP(() => {
    const el = navbarFall.current;
    if (!el) return;
    // GSAP context pour cleanup automatique
    const ctx = gsap.context(() => {
      if (clicked) {
        gsap.to(el, {
          clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      } else {
        gsap.to(el, {
          clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
          opacity: 0,
          duration: 0.8,
          ease: "power1.in",
          pointerEvents: "none",
        });
      }
    }, el);
    return () => ctx.revert();
  }, [clicked]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!country) return null;

  // Construire proprement l’URL (sans newline)
  const imgUrl = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/city-images/${country.image_path}`;

  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto ">
        {/* Bouton qui toggle l’overlay */}
        <div className="flex justify-between items-center  pt-10 ">
          <Link to="/">
            <img src={butterfly} alt="logo" className="w-50 h-20 mr-20 " />
          </Link>
          <div
            onClick={() => setClicked((c) => !c)}
            className={`cursor-pointer  `}
          >
            <MenuBar className="" />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="h-140 flex items-center justify-center">
          <h1 className="xl:text-8xl font-bold md:text-7xl text-4xl text-[#faf4ed] drop-shadow flex items-center justify-center  w-90 md:w-full">
            Welcome to {country.name}
          </h1>
        </div>
      </div>

      {/* Overlay “voile” initialement invisible */}
      <div
        ref={navbarFall}
        className="absolute inset-0 z-10 bg-[#0a0a0a] pointer-events-none opacity-0"
        style={{ clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)" }}
      >
        <NavbarContent
          clicked={clicked}
          handleMenu={() => setClicked((c) => !c)}
        />
      </div>
    </div>
  );
}
