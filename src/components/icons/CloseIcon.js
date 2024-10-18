import * as React from "react";
const CloseIcon = ({ width, height, isWhiteIcon }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3926 1L1.39258 13M1.39258 1L13.3926 13"
        stroke={isWhiteIcon ? "#FFFFFF" : "#344054"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
