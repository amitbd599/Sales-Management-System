import React from "react";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa6";
const MasterLayout = (props) => {
  return (
    <section>
      {/* sidebar */}
      <div className="fixed  z-[999] w-[230px] min-h-screen   border-r border-gray-200 bg-white">
        {/* logo */}
        <div className="flex justify-center py-[20px]   border-b border-gray-200">
          <img src="/image/desktop-logo.png" alt="" />
        </div>
        {/* Menu */}
        <nav className="px-[12px]">
          <ul className="py-[30px] grid gap-[10px]">
            <li>
              <Link to="/" className="flex items-center gap-1 font-medium p-2">
                <FaCaretRight /> Create invoice
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 font-medium p-2">
                <FaCaretRight /> All invoice
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 font-medium p-2">
                <FaCaretRight /> Image to pdf
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 font-medium p-2">
                <FaCaretRight /> Setting
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="pl-[230px]">
        {/* top header */}
        <div className="flex justify-center py-[20px] border border-b border-gray-200">
          <h2 className="text-[26px] font-semibold">Lariv Invoice Document</h2>
        </div>
        {/* Inner body */}
        <div className="min-h-screen bg-gray-100">{props.children}</div>
        {/* Footer */}
        <div className="flex py-[14px] justify-center">
          <p>footer</p>
        </div>
      </div>
    </section>
  );
};

export default MasterLayout;
