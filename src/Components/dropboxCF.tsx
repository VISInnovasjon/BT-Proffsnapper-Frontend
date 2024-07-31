import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

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
        if (
          [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(data.type)
        ) {
          setIsLoading(true);
          setError(null);

          const response = await fetch(fetchEndpoint, {
            method: "POST",
            body: formData,
          });
          if (response.status != 200)
            setError(
              `Something went wrong on the server, ${response.statusText}`
            );
          setIsLoading(false);
        } else {
          setError("Invalid file type. Please try again with a .xlsx file.");
        }
      } catch (error) {
        console.log(error);
        setError("Error reading file. Please try again.");
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
        if (
          [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(data.type)
        ) {
          setIsLoading(true);
          setError(null);

          const response = await fetch(fetchEndpoint, {
            method: "POST",
            body: formData,
          });
          if (response.status != 200)
            setError(
              `Something went wrong on the server, ${response.statusText}`
            );
          setIsLoading(false);
        } else {
          setError("Invalid file type. Please try again with a .xlsx file.");
        }
      } catch (error) {
        setError("Error reading file. Please try again.");
      }
    }
  };

  const { language } = useLanguage();

  return (
    <div
      className={`w-full h-60 md:h-96 lg:h-[55vh] flex flex-col justify-center max-w-md mx-auto relative border-solid border-4 p-8 rounded-lg transition-all duration-300 ease-in-out transform ${
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
            <p className="text-[#1e2222]">{translations[language].dbcfText4}</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input
              type="file"
              className="hidden"
              id={`fileInput-${name}`}
              onChange={handleFileChange}
            />
            <label
              htmlFor={`fileInput-${name}`}
              className="block text-center bg-[#de0505] text-white py-2 px-4 mx-4 rounded-full hover:bg-[#E91414] transition-all duration-300 cursor-pointer"
            >
              {translations[language].dbcfText1}
            </label>
            <p className="text-center text-sm mt-2">
              {translations[language].dbcfText2}
            </p>
            <p className="text-center text-sm mt-2">
              {translations[language].dbcfText3}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropbox;
