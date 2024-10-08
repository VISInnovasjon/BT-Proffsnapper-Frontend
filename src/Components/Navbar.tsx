import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myImage from "../Images/LogoWhite.png";
import LanguageDropdown from "./LanguageDropdown";
import { useLanguage } from "./LanguageContext";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const { languageSet } = useLanguage();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const handleLogIn = () => {
    instance.loginPopup();
  };
  const handleLogOut = () => {
    instance.logoutPopup();
  };
  useEffect(() => {
    if (accounts.length === 0) return;
    else {
      const clientId = import.meta.env.VITE_API_AZURE_CLIENT_ID;
      const defaultScope = `api://${clientId}/user_impersonation`;
      instance.acquireTokenSilent({
        scopes: [defaultScope, "User.Read"],
        account: accounts[0],
      });
    }
  }, [instance, accounts]);
  return (
    <nav className="bg-[#de0505] w-full fixed top-0 left-0 right-0 py-4 z-50">
      <div className="max-w-8xl mx-auto px-4 ">
        <div className="flex justify-between h-16 mr-10">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className=" ml-10">
              <div className="flex flex-col items-center ">
                <img
                  src={myImage}
                  style={{
                    objectFit: "contain",
                    width: "100px",
                    height: "50px",
                  }}
                  className="md:block my-2"
                  alt="logo"
                />
              </div>
            </a>
          </div>

          {/* Hamburger menu button for mobile */}
          <div className="flex md:hidden">
            <button
              className="flex bg-transparent items-center justify-center p-3"
              onClick={toggleNavbar}
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navbar links */}
          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="flex text-1vw sm:text-sm md:text-base lg:text-lg font-medium text-white">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="px-3 py-2  hover:underline">
                    {languageSet.home}
                  </Link>
                  <Link to="/rapport" className="px-3 py-2 hover:underline">
                    {languageSet.yearlyRapport}
                  </Link>
                  <Link
                    to="/companyflow"
                    className="px-3 py-2  hover:underline"
                  >
                    {languageSet.companyFlow}
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="px-3 py-2  hover:underline cursor-pointer"
                  >
                    {languageSet.logOutText}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/" className="px-3 py-2  hover:underline">
                    {languageSet.home}
                  </Link>
                  <div
                    onClick={handleLogIn}
                    className="px-3 py-2  hover:underline cursor-pointer"
                  >
                    {languageSet.logInText}
                  </div>
                </>
              )}

              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-300 ease-in-out`}
        onMouseLeave={closeNavbar}
      >
        <div className="flex flex-col justify-center px-2 pt-2 pb-3 mb-10 sm:px-3 text-base font-medium text-white">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
              >
                {languageSet.home}
              </Link>
              <Link
                to="/rapport"
                className="flex justify-center items-center px-3 py-2 rounded-md hover:underline"
              >
                {languageSet.yearlyRapport}
              </Link>
              <Link
                to="/companyflow"
                className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
              >
                {languageSet.companyFlow}
              </Link>
              <div
                onClick={handleLogOut}
                className="flex justify-center items-center px-3 py-2  rounded-md hover:underline cursor-pointer"
              >
                {languageSet.logOutText}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
              >
                {languageSet.home}
              </Link>
              <div
                onClick={handleLogIn}
                className="flex justify-center items-center px-3 py-2  rounded-md hover:underline cursor-pointer"
              >
                {languageSet.logInText}
              </div>
            </>
          )}

          <div className="flex justify-center">
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
