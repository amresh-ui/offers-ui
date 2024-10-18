import React from "react";

const Divider = ({ size = "small", orientation = "horizontal", className }) => {
  let baseClass = "border-gray-50";
  if (orientation === "horizontal") {
    baseClass += ` ${size === "small" ? "border-b": "border-b-2" } w-full`;
  } else if (orientation === "vertical") {
    baseClass += ` ${size === "small" ? "border-l": "border-l-2" } w-0 h-auto`;
  }

  return <hr className={`opacity-60 text-center justify-center relative ${baseClass} ${className}`} />;
};

export default Divider;
