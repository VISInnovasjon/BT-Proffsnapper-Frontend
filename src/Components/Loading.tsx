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
      <div className=" mt-0 md:mt-10  text-xs md:text-sm font-thin text-center custom-letter-spacing text-white">
        <span className="animate-blur">
          <span>TENK</span>
          &nbsp;
          <span>STORT</span>
          <span>. </span>
          &nbsp;
          <span>START </span>
          &nbsp;
          <span>SMÅTT</span>
          <span>. </span>
          &nbsp;
          <span>LÆR</span>
          &nbsp;
          <span>FORT</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
