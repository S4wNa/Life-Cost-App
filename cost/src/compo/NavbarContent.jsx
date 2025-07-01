import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import paris from "../assets/paris.jpg";
import { Link } from "react-router-dom";
import butterfly from "../assets/buf.png";
import MenuBar from "./MenuBar";

function NavbarContent({ clicked, handleMenu }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase.from("countries").select("name");

      if (error) {
        setError(error);
      } else {
        setCountries(data);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="h-[100vh] w-full  text-[#faf4ed]   ">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center m-8 mb-12 ">
          <Link to="/">
            <div>
              <img src={butterfly} alt="logo" className="w-50 h-20  mr-20 " />
            </div>
          </Link>
          <MenuBar
            clicked={clicked}
            handleMenu={handleMenu}
            hideOnOpen={false}
          />
        </div>
        <div className="items-center justify-center flex md:flex-row flex-col    h-160 md:p-4 ">
          <img
            src={paris}
            className="xl:w-100 xl:h-140 md:w-80 md:h-120 w-50 h-60 md:mr-10 lg:mr-20 my-1"
          />

          <div className="grid  md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-4 lg:h-60 md:h-80 lg:mb-0 md:mb-30 ">
            {countries.map((cnt) => (
              <Link to={`/country/${cnt.name}`}>
                <div
                  key={cnt.id}
                  className="md:text-4xl lg:text-5xl text-3xl font-medium cursor-pointer py-1 "
                >
                  {cnt.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarContent;
