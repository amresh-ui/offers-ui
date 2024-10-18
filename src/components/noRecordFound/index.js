import React from "react";
import NoRecordFoundPng from "./../../assets/noRecordFound.png";
import AltImage from "../../assets/alt-img.png";

const NoRecordFound = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center w-[60hw] absolute top-1/4">
      <img
        className={`object-contain object-center `}
        src={NoRecordFoundPng}
        onError={(e) => {
          e.target.src = AltImage;
        }}
      />
      <h3 className="text-base font-public font-normal mt-[18px] px-14">
        Oops! It seems we couldn't find any matches.
      </h3>
      <h3 className="text-base font-public font-normal mt-[18px] px-14">
        Give it another shot with different keywords or browse through our
        recommendations!.
      </h3>
    </div>
  );
};

export default NoRecordFound;
