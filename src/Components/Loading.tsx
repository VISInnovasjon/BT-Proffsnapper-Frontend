import React from "react";
import loading from "../Images/LogoWhite.png";
import "../index.css";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center bg-[#de0505] z-50">
      <div className="">
        <svg
          width="350"
          height="250"
          className="mx-auto w-1/2 md:w-1/3 lg:w-1/4"
        >
          <image href={loading} width="100%" height="100%" />
        </svg>
      </div>

      {/*  tekst med animasjon */}
      <div className=" mt-0 md:mt-10 text-md md:text-2xl font-thin text-center custom-letter-spacing text-white">
        <span className="animate-blur">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
