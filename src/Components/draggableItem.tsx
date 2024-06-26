import React from "react";

const DraggableItem: React.FC = () => {
  const handleDragStart = (e: React.DragEvent) => {
    const mockFile = new File(["Sample content"], "mockfile.txt", {
      type: "text/plain",
    });
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        name: mockFile.name,
        type: mockFile.type,
        content: "Sample content",
      })
    );
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-4 bg-[#AED9E0] text-[#060316] rounded-md shadow-md cursor-pointer hover:bg-[#2e5f65] hover:text-[#FAFFFB] transition-all duration-300 ease-in-out transform"
    >
      Drag Me (mockfile.txt)
    </div>
  );
};

export default DraggableItem;
