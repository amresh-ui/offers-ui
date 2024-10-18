import React, { useContext } from "react";

const PercentageDisplay = ({ circleColor, percentage }) => {
  return (
    <div className="border rounded-[9px] border-secondary  py-[3px] w-[80px] mr-2 flex items-center pl-2">
      <div
        className="h-[6px] w-[6px] rounded-[3px] mr-1.5"
        style={{ background: circleColor }}
      />
      <p className="text-sm font-semibold text-secondary">{percentage}%</p>
    </div>
  );
};

const CategoryGrouping = ({ popularCategoryCashback: CATEGORIES }) => {
  return (
    <div className="max-w-[350px] text-sm font-public  w-full space-y-3 mt-4">
      {CATEGORIES?.map((category, index) => (
        <div key={index} className="flex items-center">
          <PercentageDisplay
            circleColor={category.ColorCode}
            percentage={category?.AmountPercentage}
          />
          <p className="text-gray-connected-account text-sm">
            {category.Category}
          </p>
          <p className="text-gray-connected-account text-sm ml-auto">
            +${parseFloat(category.Amount)?.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrouping;
