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

  /*   const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
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
  }; */

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

  /* const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }; */

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
    <div
      className={`w-full max-w-md mx-auto relative border-solid border-4 p-8 rounded-lg transition-all duration-300 ease-in-out transform ${
        isDragging
          ? "border-[#2e5f65] bg-[#AED9E0] "
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
                  {updatedFile}
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
                        handleRemoveFile();
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
