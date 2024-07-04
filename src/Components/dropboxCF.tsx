import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface DropboxProps {
  name: string;
  fetchEndpoint: string;
}

const Dropbox: React.FC<DropboxProps> = ({ name, fetchEndpoint }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedFile, setUpdatedFile] = useState<string | null>(null);
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
          if (response.status === 400)
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
          if (response.status === 400)
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

  // Save the updated file
  const handleSaveFile = () => {
    const blob = new Blob([updatedFile || ""], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated-file.txt";
    link.click();
  };

  // Remove the updated file
  const handleRemoveFile = () => {
    setUpdatedFile(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-4 p-4 rounded transition-all duration-300 ${
          isDragging ? "border-[#2E5F65] bg-[#AED9E0]" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          id={`fileInput-${name}`}
          onChange={handleFileChange}
        />
        <label
          htmlFor={`fileInput-${name}`}
          className="block text-center bg-[#3b747b]  text-[white] py-2 px-4 rounded cursor-pointer hover:bg-[#2E5F65]  hover:text-[#FAFFFB] transition-all duration-300"
        >
          Choose File
        </label>
        <p className="text-center text-sm mt-2">or drag and drop a file here</p>
        <p className="text-center text-sm mt-2">
          Accepted file types: .xls, .xlsx
        </p>
        {isLoading && <CircularProgress className="block mx-auto mt-4" />}
        {updatedFile && (
          <div className="mt-4 p-4 bg-white text-center rounded-md shadow-md">
            <p className="text-[#2E5F65] text-xl font-semibold text-center mb-2">
              Upload completed
            </p>
            <p className="mb-2">{updatedFile}</p>
            <button
              className="bg-green-900 text-white py-1 px-2 rounded mr-2"
              onClick={handleSaveFile}
            >
              Save updated file
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => {
                if (window.confirm("Delete updated file?")) handleRemoveFile();
              }}
            >
              X
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Dropbox;
