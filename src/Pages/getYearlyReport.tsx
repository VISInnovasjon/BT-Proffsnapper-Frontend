import React from "react";
import DraggableItem from "../Components/draggableItem";
import DropboxYR from "../Components/DropboxYR";
import { blobHandler } from "../Components/BlobCreator";

const YearlyReport: React.FC = () => {
  const handleFileUpdate = (file: File) => {
    console.log("Updated file:", file);
  };

  // Fetch template based on dropbox
  const handleTemplateFetch = async () => {
    const endpoint = "http://192.168.9.78:5000/template/orgnummer"; //set endpoints
    try {
      const response = await fetch(endpoint);
      await blobHandler(response);
    } catch (error) {
      console.log(error);
    }
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
      <button
        className="bg-[#AED9E0] text-[#060316] border-[#2E5F65] border-solid border-2 py-2 px-4 mt-4 rounded hover:bg-[#8ab5bc] transition-all duration-300"
        onClick={() => handleTemplateFetch()}
      >
        Get Template
      </button>
    </div>
  );
};
// Must add a template
export default YearlyReport;
