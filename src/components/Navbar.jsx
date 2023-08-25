import React from "react";
import logo from "../assets/querylogo.png";
import { BsQuestionCircle } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full border-b border-black pb-2 md:w-9/12 mb-8">
      <BsQuestionCircle size={24} />
      {/* <img className="w-8" src={logo} alt="" /> */}
      <h1 className="uppercase font-semibold">query</h1>
    </div>
  );
};

export default Navbar;
