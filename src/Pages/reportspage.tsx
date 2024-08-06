import React, { useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import Dropbox from "../Components/DropboxYR";
import { blobHandler } from "../Components/blobCreator";
import { useLanguage } from "../Components/LanguageContext";
import translations from "../Components/translations";

const Reports: React.FC = () => {
  // Fetch template based on dropbox
  const handleFetchTemplate = async () => {
    const endpoint = import.meta.env.VITE_ORGNRTEMPLATE_URL;
    try {
      const response = await fetch(endpoint);
      await blobHandler(response);
    } catch (error) {
      console.log("Something went wrong fetching template! Try again.", error);
    }
  };

  const [loading, setLoading] = useState(false);
  // For the full view button
  const fetchFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_EXCELFULLVIEW_URL);
      await blobHandler(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { language } = useLanguage();

  return (
    <div className=" pt-32 flex flex-col items-center mx-auto text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className=" my-2 md:my-6 text-2xl md:text-4xl lg:text-4xl font-bold tracking-wide">
        {translations[language].gyrPagetext1}
      </h1>

      <Dropbox onFileUpdate={() => {}} name={""} fetchEndpoint={""} />
      <div className="mt-4 ">
        <Box>
          <Button
            onClick={fetchFile}
            variant="contained"
            color="primary"
            disabled={loading}
            className="!bg-[#de0505] !text-white !py-2 !px-6 !mt-4  !rounded-full !hover:bg-[#E91414] !transition-all !duration-300"
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{ color: "#FAFFFB" }}
                className="mr-2"
              />
            )}
            {loading
              ? translations[language].fetchFullView
              : translations[language].getFullView}

            {fetchFile && (
              <div className="mt-4">{JSON.stringify(fetchFile)}</div>
            )}
          </Button>
        </Box>
      </div>
      <button
        onClick={handleFetchTemplate}
        className="bg-[#de0505] text-white py-2 px-6 mt-4 rounded-full hover:bg-[#E91414] transition-all duration-300"
      >
        {translations[language].gyrPagetext2}
      </button>
    </div>
  );
};

export default Reports;
