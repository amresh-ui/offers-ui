import React, { useEffect, useState } from "react";
import { getSeparateIntegerAndDecimal } from "../../../utils/amountHelper";
import CategoryBottomSheet from "../../Bottomsheets/CategoryBottomSheet";
import CategoryGrouping from "../CategoryGroupings";
import "./style.css"; // Custom styles
import { FilterCategoryWiseCommission } from "../../../utils/utils";
import SectionHeader from "../CashbackNoData/SectionHeader";
import CashbackNoData from "../CashbackNoData";

const CircularProgressBar = ({ size, commissionData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedSegmentAmount, setSelectedSegmentAmount] = useState(0);

  const strokeWidth = 22;
  const increasedStrokeWidth = 26; // Stroke width when a segment is selected
  const radius = (size - increasedStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [CategoryWiseCommission, TotalCashbackCategoryAmount] =
    FilterCategoryWiseCommission(commissionData);

  const handleDeselectSegment = () => {
    setSelectedSegment(null);
    setSelectedSegmentAmount(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".circular-progress-container")) return;
      handleDeselectSegment();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDeselectSegment]);

  const calculateSegmentPaths = () => {
    let startOffset = 0;
    return CategoryWiseCommission?.map((segment, index) => {
      const segmentLength =
        (segment.Amount / TotalCashbackCategoryAmount) * circumference;

      const dashArray = `${segmentLength} ${circumference - segmentLength}`;
      const strokeDashoffset = -startOffset;
      startOffset += segmentLength;

      return (
        <circle
          key={index}
          cx={size / 2 + increasedStrokeWidth / 2}
          cy={size / 2 + increasedStrokeWidth / 2}
          r={radius}
          fill="none"
          stroke={segment?.ColorCode}
          strokeWidth={
            selectedSegment === index ? increasedStrokeWidth : strokeWidth
          }
          strokeDasharray={dashArray}
          strokeDashoffset={strokeDashoffset}
          onClick={() => handleCategoryClick(index, segment?.Amount)}
          style={{
            cursor: "pointer",
            transition: "stroke-dashoffset 0.5s ease, strokeWidth 0.5s ease",
            pointerEvents: "auto",
            // filter: 'url(#shadow)', // Ensure events can pass through the circle
          }}
          strokeOpacity={
            selectedSegment !== null && selectedSegment !== index ? 0.4 : 1
          } // Using strokeOpacity
        />
      );
    });
  };

  const handleCategoryClick = (index, Amount) => {
    setSelectedSegment(index);
    setSelectedSegmentAmount(parseFloat(Amount));
  };

  const DisplayOffersRedeemed = () => {
    const OfferedCount =
      CategoryWiseCommission[selectedSegment].TotalOfferesRedeemed;
    return (
      <div className="flex w-full justify-end">
        <p className="text-quaternary font-public text-xs">
          Offers redeemed{" "}
          <span className="text-black-30 font-bold text-base">
            {OfferedCount}
          </span>
        </p>
      </div>
    );
  };


  const newAmount = selectedSegmentAmount
    ? getSeparateIntegerAndDecimal(selectedSegmentAmount)
    : getSeparateIntegerAndDecimal(TotalCashbackCategoryAmount);

  const CircularChartData = () => (
    <div className="circular-progress-card">
      <div className="circular-progress-container">
        <SectionHeader title="Category" onClick={() => setShowPopup(true)} />
        <svg
          width={size + increasedStrokeWidth}
          height={size + increasedStrokeWidth}
          viewBox={`0 0 ${size + increasedStrokeWidth} ${
            size + increasedStrokeWidth
          }`}
          pointerEvents={'none'}>
          {/* Render colored segmented circles */}
          {calculateSegmentPaths()}

          <text
            x="50%"
            y="44%"
            textAnchor="middle"
            dy=".3em"
            fontSize="12px"
            fontWeight={400}
            fill="#667085">
            {selectedSegment != null
              ? CategoryWiseCommission[selectedSegment]?.Category
              : 'Cashback earned'}
          </text>

          {/* Render text element showing total amount */}
          <svg width="100%" height="100%">
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="28px"
              fontWeight="700"
              fill="#1B61A1">
              <tspan className="text-base font-bold" dy="0px">
                $
              </tspan>
              <tspan className="text-[28px] font-bold" dy="6px">
                {newAmount?.integer || 0}
              </tspan>
              <tspan className="text-base font-bold" dy="-7px">
                {' '}
                {newAmount?.decimal || 0}
              </tspan>
            </text>
          </svg>
          {/* Percent amount and background rect */}
          {selectedSegmentAmount ? (
            <svg>
              <rect
                x="40%"
                y="63%"
                width="55"
                height="20"
                rx="9"
                ry="9"
                fill="#F9FAFB"
                stroke="#E4E7EC"
                strokeWidth="1"
                transform="translate(-50%, -50%)"
              />
              <text
                x="50%"
                y="66.7%"
                textAnchor="middle"
                dy=".3em"
                fontSize="12px"
                fontWeight={500}
                fill="#344054">
                {CategoryWiseCommission[selectedSegment]?.AmountPercentage}%
              </text>
            </svg>
          ) : null}
        </svg>
      </div>
      {selectedSegmentAmount ? (
        <DisplayOffersRedeemed />
      ) : (
        <CategoryGrouping popularCategoryCashback={CategoryWiseCommission} />
      )}
    </div>
  );

  return (
    <>
    <div className="mt-4">
      {commissionData.length ? (
        <CircularChartData />
      ) : (
        <CashbackNoData
          title="Category"
          onClick={() => setShowPopup(true)}
        />
      )}
    </div>
      <CategoryBottomSheet
        showOverlay={showPopup}
        onDismiss={() => setShowPopup(false)}
      />
    </>
  );
};

export default CircularProgressBar;
