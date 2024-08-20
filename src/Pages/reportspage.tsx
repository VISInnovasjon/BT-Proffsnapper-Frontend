import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import Dropbox from "../Components/Dropbox";
import { blobHandler } from "../Components/BlobCreator";
import { useLanguage } from "../Components/LanguageContext";

const Reports: React.FC = () => {
  // Fetch template based on dropbox
  const [loading, setLoading] = useState({
    button1: false,
    button2: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleFetchTemplate = async (button: string) => {
    setLoading((prevState) => ({ ...prevState, [button]: true }));
    try {
      setError(null);
      const response = await fetch(import.meta.env.VITE_API_ORGNRTEMPLATE_URL);
      if (response.status != 200) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      await blobHandler(response);
    } catch (Error) {
      setError(
        languageSet.templateErrorText ??
          "Something went wrong fetching template! Try again."
      );
    } finally {
      setLoading((prevState) => ({ ...prevState, [button]: false }));
    }
  };

  // For the full view button
  const fetchFile = async (button: string) => {
    setLoading((prevState) => ({ ...prevState, [button]: true }));
    try {
      setError(null);
      const response = await fetch(import.meta.env.VITE_API_EXCELFULLVIEW_URL);
      await blobHandler(response);
    } catch (error) {
      setError(
        languageSet.fetchAllDataErrorText ??
          "Something went wrong fetching All Data! Try again."
      );
    } finally {
      setLoading((prevState) => ({ ...prevState, [button]: false }));
    }
  };

  const { languageSet } = useLanguage();

  return (
    <div className=" pt-32 flex flex-col items-center mx-auto text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className=" my-2 md:my-6 text-2xl md:text-4xl lg:text-4xl font-bold tracking-wide">
        {languageSet.gyrPageText1}
      </h1>

      <Dropbox
        name={""}
        fetchEndpoint={import.meta.env.VITE_API_YEARLYREPORT_URL}
      />
      <div className="text-red-900 mt-5 ">
        {error == null ? "" : <h2>{error}</h2>}
      </div>
      <div className="mt-4 ">
        <Button
          onClick={() => fetchFile("button1")}
          variant="contained"
          color="primary"
          disabled={loading.button1}
          sx={{
            backgroundColor: "#de0505", // Default background color
            "&:hover": {
              backgroundColor: "#E91414", // Background color on hover
            },
            color: "white",
            paddingY: "0.5rem",
            paddingX: "1.5rem",
            borderRadius: "9999px",
            fontSize: {
              sm: "14px", // Font size for small screens
              md: "16px", // Font size for medium screens
              lg: "16px", // Font size for large screens
              xl: "18px", // Font size for extra large screens
            },
            fontWeight: "bold",
            fontFamily: "Poppins, Arial, sans-serif",
          }}
        >
          {loading.button1 && (
            <CircularProgress
              size={24}
              sx={{ color: "#FAFFFB" }}
              className="mr-2"
            />
          )}
          {loading.button1
            ? languageSet.fetchFullView
            : languageSet.getFullView}

          {/* {fetchFile && <div className="mt-4">{JSON.stringify(fetchFile)}</div>} */}
        </Button>
      </div>

      <Button
        onClick={() => handleFetchTemplate("button2")}
        variant="contained"
        color="primary"
        disabled={loading.button2}
        sx={{
          backgroundColor: "#de0505", // Default background color
          "&:hover": {
            backgroundColor: "#E91414", // Background color on hover
          },
          color: "white",
          paddingY: "0.5rem",
          paddingX: "1.5rem",
          borderRadius: "9999px",
          marginTop: "5px",
          fontSize: {
            sm: "14px", // Font size for small screens
            md: "16px", // Font size for medium screens
            lg: "16px", // Font size for large screens
            xl: "18px", // Font size for extra large screens
          },

          fontFamily: "Poppins, Arial, sans-serif",
        }}
        className="bg-[#de0505] text-white py-2 px-6 mt-4 rounded-full hover:bg-[#E91414] transition-all duration-300"
      >
        {loading.button2 && (
          <CircularProgress
            size={20}
            style={{ color: "#FAFFFB" }}
            className="mr-2"
          />
        )}
        {languageSet.gyrPageText2}
      </Button>
    </div>
  );
};

export default Reports;
