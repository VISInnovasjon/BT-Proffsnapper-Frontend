import React, { useState } from "react";
import { blobHandler } from "./BlobCreator";
import CircularProgress from "@mui/material/CircularProgress";

interface DropboxProps {
  onFileUpdate: (file: File) => void;

  name: string;
  fetchEndpoint: string;
}

const Dropbox: React.FC<DropboxProps> = ({ name }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
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

          const response = await fetch("/api/yearlyreport", {
            method: "POST",
            body: formData,
          });
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

          const response = await fetch("/api/yearlyreport", {
            method: "POST",
            body: formData,
          });
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
  const handleSaveFile = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(updatedFile as Blob);
    link.download = (updatedFile as File).name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteFile = () => {
    setUpdatedFile(null);
    setError(null);
  };

  return (
    <div
      className={`w-full max-w-md mx-auto relative border-solid border-4 p-8 rounded-lg transition-all duration-300 ease-in-out transform ${
        isDragging
          ? "border-[#2e5f65] bg-[#AED9E0] "
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
            <p className="text-[#333333]">Updating database... </p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {updatedFile ? (
              <>
                <p className="text-green-500 text-xl mb-2">Upload completed</p>
                <p className="text-[#333333] my-4 flex justify-center items-center">
                  {updatedFile.name}
                </p>
                <div className="flex justify-center space-x-4 ">
                  <button
                    onClick={handleSaveFile}
                    className="bg-[#2E5F65] text-white py-2 px-4 mt-4 rounded hover:bg-[#3b747b] transition-all duration-300"
                  >
                    Save updated file
                  </button>
                  <button
                    className="bg-[#ac3535] text-white py-1 px-2 mt-4 rounded hover:bg-[#b14c4c]  transition-all duration-300"
                    onClick={() => {
                      if (window.confirm("Delete updated file?"))
                        handleDeleteFile();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
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
                  Choose File
                </label>
                <p className="text-center text-sm mt-2">
                  or drag and drop a file here
                </p>
                <p className="text-center text-sm mt-2">
                  Accepted file types: .xls, .xlsx
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropbox;
