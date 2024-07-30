import React, { useState } from "react";
import Dropbox from "../Components/dropboxCF";
import { CircularProgress } from "@mui/material";
import { blobHandler } from "../Components/blobCreator";
import { useLanguage } from "../Components/LanguageContext";
import translations from "../Components/translations";

const CompanyFlowPage: React.FC = () => {
  const [view, setView] = useState<
    "Update Company Data Flow" | "dropbox1" | "dropbox2"
  >("Update Company Data Flow");
  const [title, setTitle] = useState("Update Company Data Flow");

  const [isLoading, setIsLoading] = useState(false);

  // Fetch template based on dropbox
  const handleTemplateFetch = async (dropbox: "dropbox1" | "dropbox2") => {
    setIsLoading(true);
    const endpoint =
      dropbox === "dropbox1"
        ? "/api/dbupdatetemplate" //sender tilbake en excel fil med rett format, og viser hva data som trengs for å legge til ny data i databasen.
        : "/api/orgnummertemplate"; //sender tilbake en excel fil med format for å vise hvordan man kan slette data basert på organisasjonsnummer i databasen.; //set endpoints
    try {
      const response = await fetch("http://192.168.9.78:5000" + endpoint);
      await blobHandler(response);
    } catch (error) {
      console.log("Error fetching template.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setView("Update Company Data Flow");
    setTitle("Update Company Data Flow");
  };

  const { language } = useLanguage();

  return (
    <div className="mx-auto flex flex-col md:pt-16 items-center justify-center min-h-screen text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl ">
      <h1 className="text-2xl lg:text-3xl md:mt-10 font-bold mb-4">{title}</h1>
      {view === "Update Company Data Flow" && (
        <div className="flex flex-col sm:flex-row m-10 gap-3 ">
          <button
            className="bg-[#de0505] text-white py-2 px-6 mx-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
            onClick={() => {
              setView("dropbox1");
              setTitle("Add Company Data");
            }}
          >
            {translations[language].addCompanyData}
          </button>
          <button
            className="bg-[#de0505] text-white py-2 px-6 rounded-full hover:bg-[#e91414] transition-all duration-300"
            onClick={() => {
              setView("dropbox2");
              setTitle("Delete Company Data");
            }}
          >
            {translations[language].deleteCompanyData}
          </button>
        </div>
      )}

      {view === "dropbox1" && (
        <div className="flex flex-col items-center w-full">
          <Dropbox name="Dropbox 1" fetchEndpoint="/api/dropbox1" />
          <button
            className="bg-[#de0505] text-white py-2 px-6 mx-4 mt-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
            onClick={() => handleTemplateFetch("dropbox1")}
          >
            {translations[language].gyrPagetext2}
          </button>
          {isLoading && <CircularProgress />}

          <button
            className="bg-gray-500 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
            onClick={handleBack}
          >
            <span className="mr-1">&#8592;</span>{" "}
            {translations[language].dbcfBackButton}
          </button>
        </div>
      )}

      {view === "dropbox2" && (
        <div className="flex flex-col items-center w-full">
          <Dropbox name="Dropbox 2" fetchEndpoint="/api/dropbox2" />
          <button
            className="bg-[#de0505] text-white py-2 px-6 mx-4 mt-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
            onClick={() => handleTemplateFetch("dropbox2")}
          >
            {translations[language].gyrPagetext2}
          </button>
          {isLoading && <CircularProgress />}

          <button
            className="bg-gray-500 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
            onClick={handleBack}
          >
            <span className="mr-1">&#8592;</span>{" "}
            {translations[language].dbcfBackButton}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyFlowPage;
