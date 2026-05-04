import React, { useState } from "react";

const CollapsibleSidebar = () => {
  const [collapse, setCollpase] = useState(false);
  return (
    <div className=" flex h-screen overflow-hidden">
      <div
        className={`h-full flex flex-col overflow-hidden transition-all duration-200 ease-in-out border-r shrink-0 ${collapse ? "w-55" : "w-10"}`}
      >
        <div className="border-b flex gap-3">
          <span className="w-6 h-6 rounded-full bg-gray-600 shrink-0 block" />
          <span
            className={`transition-opacity duration-200
          ${collapse ? "opacity-100" : "opacity-0"}`}
          >
            HEADER
          </span>
        </div>
        <div className="flex flex-col gap-3 px-1 py-2 flex-1 overflow-y-auto hide-scrollbar">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 cursor-pointer
        hover:bg-gray-100 rounded transition-colors whitespace-nowrap"
            >
              <span className="w-6 h-6 rounded-full bg-gray-600 shrink-0 block" />
              <span
                className={`transition-opacity duration-200
          ${collapse ? "opacity-100" : "opacity-0"}`}
              >
                Link {idx + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t flex gap-3">
          <span className="w-6 h-6 rounded-full bg-gray-600 shrink-0 block" />
          <span
            className={`transition-opacity duration-200
          ${collapse ? "opacity-100" : "opacity-0"}`}
          >
            PROFILE
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-20 border-b">
          <button onClick={() => setCollpase(!collapse)}>HAMBURGER</button>
        </div>
        <div className="flex flex-1 overflow-y-auto">CHAT AREA</div>
        <div className="h-20 border-t">INPUT</div>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;
