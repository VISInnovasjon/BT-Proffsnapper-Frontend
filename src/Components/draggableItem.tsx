import React from "react";

// Define the DraggableItem component
const DraggableItem: React.FC = () => {
  // Function to handle the drag start event
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const mockData = "Recived Data: 123"; // Define the mock data
    e.dataTransfer.setData("text", mockData); // Set the drag data
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="inline-block p-4 m-4 bg-cyan-900 text-white rounded-lg shadow-md cursor-pointer"
    >
      Drag Me
    </div>
  );
};

export default DraggableItem;
