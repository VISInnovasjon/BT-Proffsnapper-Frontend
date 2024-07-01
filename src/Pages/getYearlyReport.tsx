import React from "react";
import DraggableItem from "../Components/draggableItem";
import DropboxYR from "../Components/DropboxYR";

const YearlyReport: React.FC = () => {
  const handleFileUpdate = (file: File) => {
    console.log("Updated file:", file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center !text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className="text-2xl text-[#1e2222] font-bold mb-6">
        Get Yearly Report
      </h1>
      <div className="m-10 absolute left-1 bottom-1">
        <DraggableItem />
      </div>
      <DropboxYR onFileUpdate={handleFileUpdate} name={""} fetchEndpoint={""} />
    </div>
  );
};
// Must add a template
export default YearlyReport;
