import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DraggableItem from "../Components/draggableItem";
import Dropbox from "../Components/DropboxYR";

const YearlyReport: React.FC = () => {
  const [isFetchingTemplate, setIsFetchingTemplate] = useState(false);

  // Fetch template based on dropbox
  /*const handleTemplateFetch = async () => {
    const endpoint = ("http://192.168.9.78:5000" + "api/orgnummertemplate");
    try {
      setIsFetchingTemplate(true);
      const response = await fetch(endpoint);
      await blobHandler(response);
      setIsFetchingTemplate(false);
    } catch (error) {
      setIsFetchingTemplate(false);
      console.log("Something went wrong fetching template", error);
    }
  };*/

  const handleFetchTemplate = () => {
    const confirmMessage = "Continue to fetch template?";
    const userConfirmed = window.confirm(confirmMessage);

    if (userConfirmed) {
      setIsFetchingTemplate(true);

      fetch("") // Use your actual endpoint here
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch template.");
          }
          return response.blob(); // Assuming the template is a blob (file)
        })
        .then((blob) => {
          setIsFetchingTemplate(false);

          // Create a URL object from the blob
          const url = URL.createObjectURL(blob);

          // Create a link element
          const link = document.createElement("a");
          link.href = url;
          link.download = "template.xlsx"; // Example filename
          document.body.appendChild(link);

          // Trigger the click event to download the file
          link.click();

          // Clean up
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch((error) => {
          setIsFetchingTemplate(false);
          console.error("Error fetching template:", error);
        });
    } else {
      console.log("Fetch template canceled.");
    }
  };

  const handleFileUpdate = (file: File) => {
    console.log("Updated file:", file);
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
          onClick={handleFetchTemplate}
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
