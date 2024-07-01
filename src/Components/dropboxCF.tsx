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
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      try {
        const fileData = JSON.parse(data);
        if (
          ["text/plain", "application/pdf", "application/msword"].includes(
            fileData.type
          )
        ) {
          setIsLoading(true);
          setError(null);

          const response = await fetch(fetchEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: fileData.content }),
          });
          const result = await response.text();

          setUpdatedFile(`${fileData.name}\n${result}`);
          setIsLoading(false);
        } else {
          setError(
            "Invalid file type. Please try again with a .xls, .xlsx file."
          );
        }
      } catch (error) {
        setError("Error reading file. Please try again.");
      }
    }
  };

  // Handle file input change event
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        ["text/plain", "application/pdf", "application/msword"].includes(
          file.type
        )
      ) {
        setIsLoading(true);
        setError(null);

        const content = await file.text();
        const response = await fetch(fetchEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        const result = await response.text();

        setUpdatedFile(`${file.name}\n${result}`);
        setIsLoading(false);
      } else {
        setError(
          "Invalid file type. Please try again with a .xls, .xlsx file."
        );
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
