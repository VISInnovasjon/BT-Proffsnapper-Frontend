import React, { useState } from "react";
import Dropbox from "../Components/dropboxCF";
import { CircularProgress } from "@mui/material";

// Mock files for demonstration purposes
const validMockFile = new File(
  ["This is a valid mock file for testing."],
  "validmockfile.txt",
  { type: "text/plain" }
);
const invalidMockFile = new File(
  ["This is an invalid mock file for testing."],
  "invalidmockfile.jpg",
  { type: "image/jpeg" }
);

const App: React.FC = () => {
  const [view, setView] = useState<
    "Update Company Data Flow" | "dropbox1" | "dropbox2"
  >("Update Company Data Flow");
  const [title, setTitle] = useState("Update Company Data Flow");
  const [template, setTemplate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch template based on dropbox
  const handleTemplateFetch = async (dropbox: "dropbox1" | "dropbox2") => {
    setIsLoading(true);
    const endpoint =
      dropbox === "dropbox1" ? "/api/template1" : "/api/template2"; //set endpoints
    try {
      const response = await fetch(endpoint);
      const data = await response.text();
      setTemplate(data);
    } catch (error) {
      setTemplate("Error fetching template.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setView("Update Company Data Flow");
    setTitle("Update Company Data Flow");
    setTemplate(null);
  };

  // Handle drag start event for mock files
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, file: File) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        name: file.name,
        type: file.type,
        content: file.text(),
      })
    );
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {view === "Update Company Data Flow" && (
        <div className="block items-center justify-center m-10">
          <button
            className="bg-[#2E5F65] text-white py-2 px-4 mx-4 rounded hover:bg-[#3b747b] transition-all duration-300"
            onClick={() => {
              setView("dropbox1");
              setTitle("Add Company Data");
            }}
          >
            Add Company Data
          </button>
          <button
            className="bg-[#2E5F65] text-white py-2 px-4 rounded hover:bg-[#3b747b] transition-all duration-300"
            onClick={() => {
              setView("dropbox2");
              setTitle("Delete Company Data");
            }}
          >
            Delete Company Data
          </button>
        </div>
      )}

      {view === "dropbox1" && (
        <div className="flex flex-col items-center w-full">
          <Dropbox name="Dropbox 1" fetchEndpoint="/api/dropbox1" />
          <button
            className="bg-[#AED9E0] text-[#060316] border-[#2E5F65] border-solid border-2 py-2 px-4 mt-4 rounded hover:bg-[#8ab5bc] transition-all duration-300"
            onClick={() => handleTemplateFetch("dropbox1")}
          >
            Get Template
          </button>
          {isLoading && <CircularProgress />}
          {template && (
            <div className="bg-[#2E5F65] text-[#FAFFFB] p-4 mt-4 rounded shadow-md w-1/2">
              <pre className="whitespace-pre-wrap">{template}</pre>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className=" bg-[#AED9E0]  text-[#060316] py-2 px-4 rounded mt-2 hover:bg-[#8ab5bc] transition-all duration-300"
                  onClick={() => {
                    const blob = new Blob([template], { type: "text/plain" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "template.txt";
                    link.click();
                  }}
                >
                  Save Template
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition-all duration-300"
                  onClick={() => setTemplate(null)}
                >
                  Remove Template
                </button>
              </div>
            </div>
          )}
          <button
            className="bg-gray-500 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
            onClick={handleBack}
          >
            <span className="mr-1">&#8592;</span> Back
          </button>
          <div
            className="mt-8 p-4 bg-white rounded shadow-md cursor-pointer border border-gray-400 hover:border-blue-400 transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, validMockFile)}
          >
            Drag valid file to Dropbox 1
          </div>
          <div
            className="mt-4 p-4 bg-white rounded shadow-md cursor-pointer border border-gray-400 hover:border-red-400 transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, invalidMockFile)}
          >
            Drag invalid file to Dropbox 1
          </div>
        </div>
      )}

      {view === "dropbox2" && (
        <div className="flex flex-col items-center w-full">
          <Dropbox name="Dropbox 2" fetchEndpoint="/api/dropbox2" />
          <button
            className="bg-[#AED9E0] text-[#060316] border-[#2E5F65] border-solid border-2 py-2 px-4 mt-4 rounded hover:bg-[#8ab5bc] transition-all duration-300"
            onClick={() => handleTemplateFetch("dropbox2")}
          >
            Get Template
          </button>
          {isLoading && <CircularProgress />}
          {template && (
            <div className="bg-[#2E5F65] text-[#FAFFFB] p-4 mt-4 rounded shadow-md w-1/2">
              <pre className="whitespace-pre-wrap">{template}</pre>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="bg-[#AED9E0]  text-[#060316] py-2 px-4 rounded mt-2 hover:bg-[#8ab5bc] transition-all duration-300"
                  onClick={() => {
                    const blob = new Blob([template], { type: "text/plain" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "template.txt";
                    link.click();
                  }}
                >
                  Save Template
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition-all duration-300"
                  onClick={() => setTemplate(null)}
                >
                  Remove Template
                </button>
              </div>
            </div>
          )}
          <button
            className="bg-gray-500 text-white py-1 px-2 rounded mt-4 hover:bg-gray-600 transition-all duration-300"
            onClick={handleBack}
          >
            <span className="mr-1">&#8592;</span> Back
          </button>
          <div
            className="mt-8 p-4 bg-white rounded shadow-md cursor-pointer border border-gray-400 hover:border-blue-400 transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, validMockFile)}
          >
            Drag valid file to Dropbox 2
          </div>
          <div
            className="mt-4 p-4 bg-white rounded shadow-md cursor-pointer border border-gray-400 hover:border-red-400 transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, invalidMockFile)}
          >
            Drag invalid file to Dropbox 2
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
