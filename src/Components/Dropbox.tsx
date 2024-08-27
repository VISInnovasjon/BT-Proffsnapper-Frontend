import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguage } from "./LanguageContext";
import { blobHandler } from "./blobCreator";

interface DropboxProps {
  name: string;
  fetchEndpoint: string;
}

const Dropbox: React.FC<DropboxProps> = ({ name, fetchEndpoint }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop event
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const data = e.dataTransfer.items[0].getAsFile();
    console.log(data);
    const formData = new FormData();
    if (data) {
      try {
        formData.append("file", data);
        setIsLoading(true);
        setError(null);

        const response = await fetch(fetchEndpoint, {
          method: "POST",
          body: formData,
        });
        setIsLoading(true);
        if (response.status != 200)
          setError(await response.json().then((err) => err.error));

        if (response.headers.get("Content-Disposition") === null)
          return setIsLoading(false);
        await blobHandler(response);
      } catch (error) {
        setError(
          languageSet.dbNoResponse ?? "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle file input change event
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataList = e.target.files;
    if (dataList === null) return;
    const data = dataList[0];
    if (data) {
      try {
        const formData = new FormData();
        formData.append("file", data);
        setIsLoading(true);
        setError(null);

        const response = await fetch(fetchEndpoint, {
          method: "POST",
          body: formData,
        });
        if (response.status != 200)
          setError(await response.json().then((err) => err.error));
        if (response.headers.get("Content-Disposition") === null)
          return setIsLoading(false);
        else await blobHandler(response);
        return setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const { languageSet } = useLanguage();

  return (
    <div
      className={`w-full h-60 md:h-80 lg:h-[50vh] flex flex-col justify-center max-w-md mx-auto relative border-solid border-4 p-8 mt-1 rounded-lg transition-all duration-300 ease-in-out transform ${
        isDragging
          ? "border-[#1e2222] bg-[#f09999] animate-pulse "
          : "border-gray-300 bg-transparent"
      }`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        {isLoading ? (
          <div className="flex flex-col items-center ">
            <CircularProgress className="mb-4" />
            <p className="text-[#1e2222]">{languageSet.dbcfText4}</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-900 mb-10">{error}</p>}

            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              id={`fileInput-${name}`}
              onChange={handleFileChange}
            />
            <label
              htmlFor={`fileInput-${name}`}
              className="block text-center bg-[#de0505] text-white py-2 px-4 mx-4 rounded-full hover:bg-[#E91414] transition-all duration-300 cursor-pointer"
            >
              {languageSet.dbcfText1}
            </label>
            <p className="text-center text-sm mt-2">{languageSet.dbcfText2}</p>
            <p className="text-center text-sm mt-2">{languageSet.dbcfText3}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropbox;
