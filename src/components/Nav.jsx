import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [login, setLogin] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    // Check if the user is logged in

    setLogin(isLoggedIn === "true");
  }, [login, isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    location.reload();
    setLogin(false); // Update login state on logout
  };

  return (
    <div className="sticky top-0 bg-white navbar items-center">
      <div className="flex px-8 py-5 items-center justify-between">
        <Link to="/">
          <span className="cursor-pointer uppercase">
            <span className="text-2xl font-bold">Pet </span>
            <span className="text-darkGreen text-2xl">FINDER </span>
            <span className="text-2xl font-bold">Foundation</span>
          </span>
        </Link>
        <ul className="flex flex-wrap justify-between gap-x-5 font-semibold sm:hidden">
          <Link to="/">
            <li className="cursor-pointer menu-item">Home</li>
          </Link>
          <Link to="/About-us">
            <li className="cursor-pointer menu-item">About us</li>
          </Link>
          <Link to="/Pets">
            <li className="cursor-pointer menu-item">Pets</li>
          </Link>
          <Link to="/Contact">
            <li className="cursor-pointer menu-item">Contact us</li>
          </Link>
        </ul>

        <div className="flex items-center justify-center gap-x-4 my-auto">
          <Link to="/Pets">
            <button className="bg-green rounded-xl px-5 py-2 text-black font-semibold hover:bg-darkGreen transition ease-linear hover:scale-95 mb-4">
              Find Pet
            </button>
          </Link>
          <span className="flex items-center gap-x-2 mb-3">
            <Link to="/Account">
              <i className="ri-account-pin-circle-line text-darkBlue text-2xl cursor-pointer"></i>
            </Link>
            {login && (
              <i
                onClick={logout}
                className="ri-logout-circle-line text-red text-2xl cursor-pointer"></i>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
