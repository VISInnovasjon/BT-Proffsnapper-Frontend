import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DraggableItem from "../Components/draggableItem";
import Dropbox from "../Components/DropboxYR";
import { blobHandler } from "../Components/BlobCreator";

const YearlyReport: React.FC = () => {
  const [isFetchingTemplate, setIsFetchingTemplate] = useState(false);

  const handleFileUpdate = (file: File) => {
    console.log("Updated file:", file);
  };

  // Fetch template based on dropbox
  const handleTemplateFetch = async () => {
    const endpoint = "/api/orgnummertemplate";
    try {
      setIsFetchingTemplate(true);
      const response = await fetch(endpoint);
      await blobHandler(response);
      setIsFetchingTemplate(false);
    } catch (error) {
      setIsFetchingTemplate(false);
      console.log("Something went wrong fetching template", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto justify-center !text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className="text-2xl text-[#1e2222] font-bold mb-6">
        Get Yearly Report
      </h1>
      <div className="m-10 absolute left-1 bottom-1">
        <DraggableItem />
      </div>
      <Dropbox onFileUpdate={handleFileUpdate} name={""} fetchEndpoint={""} />
      <div className="mt-4">
        <button
          onClick={handleTemplateFetch}
          className="bg-[#de0505] text-white py-2 px-6 mt-4 rounded-full hover:bg-[#E91414] transition-all duration-300"
        >
          Get Template
        </button>
      </div>
      {isFetchingTemplate && (
        <CircularProgress className="block mx-auto mt-4" />
      )}
    </div>
  );
};
// Must add a template
export default YearlyReport;
