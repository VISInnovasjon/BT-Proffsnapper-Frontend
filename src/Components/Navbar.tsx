import React, { useState } from "react";
import { Link } from "react-router-dom";
import myImage from "../Images/vis_logo.png";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const fetchFile = async () => {
    try {
      const response = await fetch("");

      const disposition = response.headers.get("Content-Disposition");
      let filename = "FullView";
      if (disposition && disposition.includes("attachment")) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log(error);
    }
  };

  /*  const fetchFile = async () => {
    try {
      const response = await fetch("http://192.168.9.78:5000" + "/api/excelfullview");
      await blobHandler(response);
    } catch (error) {
      console.log(error);
    }
  };
 */

  return (
    <nav className="bg-[#de0505] fixed w-full top-0  backdrop-filter backdrop-blur-lg py-4 mb-0 z-10">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className=" ml-10">
              <div className="flex flex-col items-center ">
                <img
                  src={myImage}
                  style={{
                    objectFit: "contain",
                    width: "100px",
                    height: "80px",
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
              <Link to="/" className="px-3 py-2  hover:underline">
                Home
              </Link>
              <Link to="/rapport" className="px-3 py-2 hover:underline">
                Yearly Rapport
              </Link>
              <Link to="/companyflow" className="px-3 py-2  hover:underline">
                Company Flow
              </Link>

              <Link to="/test" className="px-3 py-2  hover:underline">
                Testside
              </Link>
              <button
                onClick={fetchFile}
                className="px-3 py-2  hover:underline"
              >
                Get full view
              </button>
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
        <div className="flex flex-col justify-center px-2 pt-2 pb-3 sm:px-3 text-base font-medium text-white">
          <Link
            to="/"
            className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
          >
            Hjem
          </Link>
          <Link
            to="/rapport"
            className="flex justify-center items-center px-3 py-2 rounded-md hover:underline"
          >
            Yearly Rapport
          </Link>
          <Link
            to="/companyflow"
            className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
          >
            Company flow
          </Link>
          <Link
            to="/test"
            className="flex justify-center items-center px-3 py-2  rounded-md hover:underline"
          >
            Testside
          </Link>
          <button
            onClick={fetchFile}
            className="px-3 py-2  rounded-md hover:underline"
          >
            Get full view
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
