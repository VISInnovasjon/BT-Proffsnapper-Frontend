import React, { useState } from "react";

// Define the Dropbox component
const Dropbox: React.FC = () => {
  // State to track if an item is being dragged over the drop area
  const [dragOver, setDragOver] = useState(false);

  // State to hold the dropped data
  const [droppedData, setDroppedData] = useState<string | null>(null);

  // Function to handle the drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true); // Set the dragOver state to true
  };

  // Function to handle the drag leave event
  const handleDragLeave = () => {
    setDragOver(false); // Set the dragOver state to false
  };

  // Function to handle the drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false); // Reset the dragOver state

    const data = e.dataTransfer.getData("text"); // Get the dropped data
    setDroppedData(data); // Update the droppedData state
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed ${
        dragOver ? "border-blue-500" : "border-gray-300"
      } p-4 text-center bg-white rounded-lg shadow-md`}
    >
      <p className="text-gray-700">Drag and drop the item here</p>
      {droppedData && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="text-gray-700">Dropped Data:</p>
          <pre className="text-left">{droppedData}</pre>
        </div>
      )}
    </div>
  );
};

export default Dropbox;
