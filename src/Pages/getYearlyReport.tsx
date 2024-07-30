import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dropbox from "../Components/DropboxYR";
import { blobHandler } from "../Components/BlobCreator";

const YearlyReport: React.FC = () => {
  const [isFetchingTemplate, setIsFetchingTemplate] = useState(false);

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
    <div className="min-h-screen flex flex-col justify-center items-center md:pt-8 mx-auto !text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className=" text-2xl lg:text-3xl md:mt-10 text-[#1e2222] font-bold mb-6">
        Get Yearly Report
      </h1>

      <Dropbox onFileUpdate={() => {}} name={""} fetchEndpoint={""} />
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
