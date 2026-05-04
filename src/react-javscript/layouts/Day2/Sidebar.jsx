import { useState } from "react";

const OverlaySidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 w-full bg-blue-100 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="cursor-pointer text-right p-2 mr-5"
        onClick={() => onClose(false)}
      >
        X
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [openOverlaySidebar, setOpenOverlaySidebar] = useState(false);
  return (
    <div className="h-screen overflow-hidden flex">
      {
        <OverlaySidebar
          isOpen={openOverlaySidebar}
          onClose={setOpenOverlaySidebar}
        />
      }
      <nav className="hidden md:flex md:flex-col h-full overflow-y-auto w-64 shrink-0 border-r ">
        <div className="border-b">HEADER</div>
        <div className="flex flex-col items-cente gap-3 px-4 py-2 group ">
          {[1, 2, 3, 4].map((_, idx) => (
            <span
              className="p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
              key={idx}
            >{`Link${idx + 1}`}</span>
          ))}
        </div>
        <div className="mt-auto border-t">PROFILE</div>
      </nav>

      <div className="flex flex-col flex-1">
        <div className="flex md:hidden shrink-0 h-10 border-b">
          <div
            onClick={() => setOpenOverlaySidebar(true)}
            className="cursor-pointer"
          >
            <img
              src="https://www.clipartmax.com/middle/m2i8i8A0K9A0H7b1_navbar-toggle-icon-menu-hamburger-png-white/"
              alt="hamburger icon"
              className="w-6 h-6"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-blue-100">MAIN CONTENT</div>
        <div className="flex md:hidden  h-20 border-t">INPUT</div>
      </div>
    </div>
  );
};

export default Sidebar;
