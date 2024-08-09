import React, { useState } from "react";
import Dropbox from "../Components/Dropbox";
import { blobHandler } from "../Components/BlobCreator";
import { useLanguage } from "../Components/LanguageContext";

const CompanyFlowPage: React.FC = () => {
  const { languageSet } = useLanguage();
  const [view, setView] = useState<
    "Update Company Data Flow" | "dropbox1" | "dropbox2"
  >("Update Company Data Flow");

  // Fetch template based on dropbox
  const handleTemplateFetch = async (dropbox: "dropbox1" | "dropbox2") => {
    const endpoint =
      dropbox === "dropbox1"
        ? import.meta.env.VITE_API_DBUPDATETEMPLATE_URL //sender tilbake en excel fil med rett format, og viser hva data som trengs for å legge til ny data i databasen.
        : import.meta.env.VITE_API_ORGNRTEMPLATE_URL; //sender tilbake en excel fil med format for å vise hvordan man kan slette data basert på organisasjonsnummer i databasen.; //set endpoints
    try {
      const response = await fetch(endpoint);
      await blobHandler(response);
    } catch (error) {
      console.log("Error fetching template.");
    }
  };

  // Handle back button click
  const handleBack = () => {
    setView("Update Company Data Flow");
  };

  return (
    <div className="mx-auto flex flex-col md:pt-16 items-center justify-center min-h-screen text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl ">
      {view === "Update Company Data Flow" && (
        <>
          <h1 className="text-2xl lg:text-3xl md:mt-10 font-bold mb-4 tracking-wide">
            {languageSet.headerCompanyData}
          </h1>
          <div className="flex flex-col sm:flex-row m-10 gap-3 ">
            <button
              className="bg-[#de0505] text-white py-2 px-6 mx-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
              onClick={() => {
                setView("dropbox1");
              }}
            >
              {languageSet.addCompanyData}
            </button>
            <button
              className="bg-[#de0505] text-white py-2 px-6 rounded-full hover:bg-[#e91414] transition-all duration-300"
              onClick={() => {
                setView("dropbox2");
              }}
            >
              {languageSet.deleteCompanyData}
            </button>
          </div>
        </>
      )}

      {view === "dropbox1" && (
        <>
          <h1 className="text-2xl lg:text-3xl md:mt-10 font-bold mb-4 tracking-wide">
            {languageSet.addCompanyData}
          </h1>
          <div className="flex flex-col items-center w-full">
            <Dropbox
              name="Dropbox 1"
              fetchEndpoint={import.meta.env.VITE_API_UPDATEWITHNEWDATA_URL}
            />
            <button
              className="bg-[#de0505] text-white py-2 px-6 mx-4 mt-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
              onClick={() => handleTemplateFetch("dropbox1")}
            >
              {languageSet.gyrPageText2}
            </button>

            <button
              className="bg-gray-700 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
              onClick={handleBack}
            >
              <span className="mr-1">&#8592;</span> {languageSet.dbcfBackButton}
            </button>
          </div>
        </>
      )}

      {view === "dropbox2" && (
        <>
          <h1 className="text-2xl lg:text-3xl md:mt-10 font-bold mb-4 tracking-wide">
            {languageSet.deleteCompanyData}
          </h1>
          <div className="flex flex-col items-center w-full">
            <Dropbox
              name="Dropbox 2"
              fetchEndpoint={import.meta.env.VITE_API_DELETEDATA_URL}
            />
            <button
              className="bg-[#de0505] text-white py-2 px-6 mx-4 mt-4 rounded-full hover:bg-[#e91414] transition-all duration-300"
              onClick={() => handleTemplateFetch("dropbox2")}
            >
              {languageSet.gyrPageText2}
            </button>

            <button
              className="bg-gray-700 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
              onClick={handleBack}
            >
              <span className="mr-1">&#8592;</span> {languageSet.dbcfBackButton}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyFlowPage;
