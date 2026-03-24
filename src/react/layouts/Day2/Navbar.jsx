import React, { useState } from "react";
import IconConfig from "../../utility/Icon";

const navlinks = [
  { id: 1, name: "Dummy" },
  { id: 2, name: "Dummy" },
  { id: 3, name: "Dummy" },
  { id: 4, name: "Dummy" },
];
const Navbar = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden w-60 overflow-y-auto h-full bg-[#212121] md:flex flex-col justify-between">
        <div id="wrapperTop">
          <div id="header" className="flex items-center justify-between p-2">
            <h1 className="text-xl md:6xl text-white">Claude</h1>
            <IconConfig name={"hamburger"} />
          </div>
          <div id="navLinks" className="p-2 flex flex-col gap-4 text-white">
            {navlinks.map((item) => (
              <div
                onClick={() => setActive(item.id)}
                key={item.id}
                className={`${active === item.id && "bg-gray-500"} cursor-pointer p-2 rounded-sm hover:bg-gray-600 transition-colors duration-150`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div
          id="wrapperBottom"
          className="border-t bg-[#5c6370] h-20 flex items-center gap-2 p-2"
        >
          <div className="rounded-full bg-gray-100 w-8 h-8"></div>
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-gray-200">MAIN CONTENT</div>
    </div>
  );
};

export default Navbar;
