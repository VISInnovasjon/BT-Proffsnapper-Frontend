import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import Dropbox from "../Components/Dropbox";
import { blobHandler } from "../Components/BlobCreator";
import { useLanguage } from "../Components/LanguageContext";
import UseButton from "../Components/UseButton";
import { LastUpdatedText } from "../Components/LastUpdated";
import { useMsal } from "@azure/msal-react";
import { getToken } from "../Components/GetToken";

const Reports: React.FC = () => {
  // Fetch template based on dropbox
  const [loading, setLoading] = useState({
    button1: false,
    button2: false,
  });
  const [error, setError] = useState<string | null>(null);

  const { instance, accounts } = useMsal();
  const account = accounts[0];

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
      const token = await getToken(instance, account);
      const response = await fetch(import.meta.env.VITE_API_EXCELFULLVIEW_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) await blobHandler(response);
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
    <div className=" pt-32 md:pt-24 flex flex-col items-center mx-auto text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl">
      <h1 className=" my-2 md:my-6 text-2xl md:text-4xl lg:text-4xl font-bold tracking-wide">
        {languageSet.gyrPageText1}
      </h1>
      <LastUpdatedText className="text-1.5xl" />

      <Dropbox
        name={""}
        fetchEndpoint={import.meta.env.VITE_API_YEARLYREPORT_URL}
      />
      <div className="text-red-900 mt-4 mx-2 text-center ">
        {error == null ? "" : <h2>{error}</h2>}
      </div>
      <div className="mt-4 ">
        <UseButton
          onClick={() => fetchFile("button1")}
          variant="contained"
          disabled={loading.button1}
          sx={{ fontWeight: "bold" }}
        >
          {loading.button1 && (
            <CircularProgress
              size={20}
              sx={{ color: "#FAFFFB" }}
              className="mr-2"
            />
          )}
          {loading.button1
            ? languageSet.fetchFullView
            : languageSet.getFullView}
        </UseButton>
      </div>

      <UseButton
        onClick={() => handleFetchTemplate("button2")}
        variant="contained"
        disabled={loading.button2}
      >
        {loading.button2 && (
          <CircularProgress
            size={20}
            style={{ color: "#FAFFFB" }}
            className="mr-2"
          />
        )}
        {languageSet.gyrPageText2}
      </UseButton>
    </div>
  );
};

export default Reports;
