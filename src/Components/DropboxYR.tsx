import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { blobHandler } from "./blobCreator";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

interface DropboxProps {
  onFileUpdate: (file: File) => void;

  name: string;
  fetchEndpoint: string;
}

const Dropbox: React.FC<DropboxProps> = ({ name }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Ensure hover effect persists while dragging over
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const data = e.dataTransfer.items[0].getAsFile();
    console.log(data);
    const formData = new FormData();
    if (data) {
      try {
        formData.append("file", data);
        console.log(formData.get(data.name));
        if (
          [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(data.type)
        ) {
          setIsLoading(true);
          setError(null);

          const response = await fetch(
            import.meta.env.VITE_API_YEARLYREPORT_URL,
            {
              method: "POST",
              body: formData,
            }
          );
          if (response.status != 200) {
            console.log(response);
            setError(
              `something went wrong during filetransfer, errorcode: ${response.status}.`
            );
            return;
          } else await blobHandler(response);
          setIsLoading(false);
        } else {
          setError("Invalid file type. Please try again with a .xlsx file.");
        }
      } catch (error) {
        setError("Error reading file. Please try again.");
      }
    }
  };

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

          const response = await fetch(
            import.meta.env.VITE_API_YEARLYREPORT_URL,
            {
              method: "POST",
              body: formData,
            }
          );
          if (response.status != 200) {
            console.log(response);
            setError(
              `something went wrong during filetransfer, errorcode: ${response.status}.`
            );
            return;
          } else await blobHandler(response);
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
      className={`w-full h-60 md:h-96 lg:h-[55vh] flex flex-col justify-center max-w-md mx-auto relative border-solid border-4 p-8 mt-6 rounded-lg transition-all duration-300 ease-in-out transform ${
        isDragging
          ? "border-[#1e2222] bg-[#f09999] animate-pulse "
          : "border-gray-300 bg-transparent"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        {isLoading ? (
          <div className="flex flex-col items-center ">
            <CircularProgress className="mb-4" />
            <p className="text-[#1e2222]">
              {" "}
              {translations[language].dbyrText4}
            </p>
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
              className="block text-center bg-[#de0505] rounded-full text-white py-2 px-4 mx-4 hover:bg-[#E91414] transition-all duration-300 cursor-pointer"
            >
              {translations[language].dbyrText1}
            </label>
            <p className="text-center text-sm mt-2">
              {translations[language].dbyrText2}
            </p>
            <p className="text-center text-sm mt-2">
              {translations[language].dbyrText3}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropbox;
