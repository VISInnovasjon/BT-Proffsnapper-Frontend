import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface DropboxProps {
  onFileUpdate: (file: File) => void;
}

const Dropbox: React.FC<DropboxProps> = ({ onFileUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFileContent, setShowFileContent] = useState(false);

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
          "Invalid file type. Please try again with a .txt, .pdf, or .docx file."
        );
      }
    } catch (error) {
      setError(
        "Invalid file type. Please try again with a .txt, .pdf, or .docx file."
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
        "Invalid file type. Please try again with a .txt, .pdf, or .docx file."
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
    setShowFileContent(false);
  };

  return (
    <div
      className={`relative border-dashed border-4 p-8 rounded-lg transition-all duration-300 ease-in-out transform ${
        isDragging
          ? "border-[#2e5f65] bg-[#AED9E0] scale-105"
          : "border-gray-300 bg-white"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <CircularProgress className="mb-4" />
            <p className="text-[#333333]">Updating file...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {updatedFile ? (
              <>
                <p className="text-green-500 text-xl mb-2">Upload completed</p>
                <p className="text-[#333333] my-4 flex justify-center items-center">
                  {updatedFile.name}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete updated file?"))
                        handleDeleteFile();
                    }}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    X
                  </button>
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowFileContent(!showFileContent)}
                    className="bg-[#2e5f65] text-white px-4 py-2 rounded-md hover:bg-[#AED9E0] hover:text-[#060316] transition-all duration-300"
                  >
                    {showFileContent
                      ? "Hide updated file"
                      : "Show updated file"}
                  </button>
                  <button
                    onClick={handleSaveFile}
                    className="bg-[#2e5f65] text-white px-4 py-2 rounded-md hover:bg-[#AED9E0] hover:text-[#060316]  transition-all duration-300"
                  >
                    Save updated file
                  </button>
                </div>
                {showFileContent && (
                  <div className="mt-4 p-4 bg-[#AED9E0] text-[#060316] rounded-md">
                    <p>{`${updatedFile.name} - updated with new data`}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-[#1e2222] font-semibold mb-2">
                  Drop files here or select a file
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Accepted file types: .txt, .pdf, .docx
                </p>
                <div className="text-left mb-4">
                  <p className="text-[#1e2222] text-center text-base">
                    Template for Excel Sheet:
                  </p>
                  <table className="text-[#1e2222] border-collapse border border-gray-400 w-full mt-2">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">A</th>
                        <th className="border border-gray-300 px-4 py-2">B</th>
                        <th className="border border-gray-300 px-4 py-2">C</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Orgnummer
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 2
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 3
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="border border-gray-300 px-4 py-2">
                          Data 4
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 5
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 6
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="border border-gray-300 px-4 py-2">
                          Data 7
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 8
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 9
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-4 mx-auto bg-[#AED9E0] text-[#060316] rounded-md border border-black"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropbox;
