import React from "react";
import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-center ">
      <span className="text-xl lg:font-extrabold text-primary hidden sm:block">
        Style
      </span>
      <img src={logo} alt="logo" className="w-10 h-10 object-cover" />
      <span className="text-xl font-extrabold text-primary hidden sm:block">
        Decor
      </span>
    </div>
  );
};

export default Logo;
