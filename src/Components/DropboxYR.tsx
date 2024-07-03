import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface DropboxProps {
  onFileUpdate: (file: File) => void;

  name: string;
  fetchEndpoint: string;
}

const Dropbox: React.FC<DropboxProps> = ({ onFileUpdate, name }) => {
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    try {
      const fileData = e.dataTransfer.getData("application/json");
      const parsedData = JSON.parse(fileData);
      const file = new File([parsedData.content], parsedData.name, {
        type: parsedData.type,
      });
      if (
        file &&
        (file.type === "text/plain" ||
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      ) {
        handleFileUpdate(file);
      } else {
        setError(
          "Invalid file type. Please try again with a .xls or .xlsx file."
        );
      }
    } catch (error) {
      setError(
        "Invalid file type. Please try again with a .xls or .xlsx file."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "text/plain" ||
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      handleFileUpdate(file);
    } else {
      setError(
        "Invalid file type. Please try again with a .xls or .xlsx file."
      );
    }
  };

  const handleFileUpdate = (file: File) => {
    setIsLoading(true);

    // Simulate file update process
    setTimeout(() => {
      const updatedContent = `${file.name} - updated with new data`;
      const updatedFile = new File([updatedContent], file.name, {
        type: file.type,
      });
      setUpdatedFile(updatedFile);
      onFileUpdate(updatedFile);
      setIsLoading(false);
    }, 2000);
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
            <p className="text-[#333333]">Updating file...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {updatedFile ? (
              <>
                <p className="text-green-500 text-xl mb-2 animate-bounce">
                  Upload completed
                </p>
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
                  className="block text-center bg-[#2E5F65] text-white py-2 px-4 mx-4 rounded hover:bg-[#3b747b] transition-all duration-300 cursor-pointer"
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
