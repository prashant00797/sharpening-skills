import React from "react";

const MessageBubble = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="shrink-0 w-64 overflow-y-auto flex flex-col border-r">
        Sidebar
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-4 p-4">
          {[1].map((_, idx) => (
            <div key={idx} className="flex justify-end">
              <div className="w-[75%] rounded-2xl px-4 py-3 bg-amber-50">
                User message
              </div>
            </div>
          ))}

          {[1].map((_, idx) => (
            <div key={idx} className="flex justify-start">
              <div className="w-[75%] rounded-2xl px-4 py-3 bg-red-50">
                AI message
              </div>
            </div>
          ))}
        </div>
        <div className="h-10 border-t">Input</div>
      </div>
    </div>
  );
};

export default MessageBubble;
