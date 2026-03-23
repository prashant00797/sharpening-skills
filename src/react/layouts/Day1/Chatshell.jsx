/**
 *
 *  Week 1 — AI Chat Layouts (Days 1–7)
 *  Basic Chat Shell
 *
 */

const Chatshell = () => {
  return (
    <div id="outerWrapper" className="flex overflow-hidden h-screen">
      <div
        id="sidebar"
        className="w-60 overflow-y-auto h-full bg-gray-900 text-white"
      >
        SIDEBAR
      </div>
      <div id="main-chat" className="flex flex-1 flex-col ">
        <div id="messages" className="flex-1 overflow-y-auto ">
          CHAT AREA
        </div>
        <div id="inputMessage" className="sticky bottom-0 h-20 border-t">
          INPUT MESSAGE
        </div>
      </div>
    </div>
  );
};

export default Chatshell;
