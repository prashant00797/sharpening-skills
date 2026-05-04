import React from "react";

const ChatShell = () => {
  return (
    <div className="flex h-screen overflow">
      <div className="hidden md:flex md:flex-col h-full overflow-y-auto w-64 bg-gray-100 border-r">
        SIDEBAR
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex md:hidden h-20 bg-gray-100">TOPBAR</div>
        <div className="flex-1 overflow-y-auto bg-amber-100">MAIN AREA</div>
        <div className="h-20 bg-blue-100">input</div>
      </div>
    </div>
  );
};

export default ChatShell;
