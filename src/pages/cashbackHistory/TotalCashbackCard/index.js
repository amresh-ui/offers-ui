import React, { useContext, useState } from "react";
import { InfoCircleIcon } from "../../../components/icons";
import "./style.css";
import { getSeparateIntegerAndDecimal } from "../../../utils/amountHelper";
import CashbackInfoBottomSheetComponent from "../../../components/Bottomsheets/cashbackInfoBottomSheet";
import InsightsForwardIcon from "../../../components/icons/InsightsForwardIcon";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppProvider";

const TotalCashbackCard = ({ totalCashbackAmount }) => {
  const [showCashbackInfoBottomSheet, setshowCashbackInfoBottomSheet] =
    useState(false);
  const { commissionData } = useContext(AppContext);
  const navigate = useNavigate();
  const newAmount = totalCashbackAmount
    ? getSeparateIntegerAndDecimal(totalCashbackAmount)
    : null;

  return (
    <div className="app-content-card bg-orange-10">
      <div className="card-view">
        <div className="flex gap-1 items-center justify-between">
          <div className="flex gap-1 items-center">
            <span className="text-xs text-quaternary text-size-12">
              Total cashback earned
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setshowCashbackInfoBottomSheet(true);
              }}
            >
              <InfoCircleIcon />
            </span>
          </div>
          {commissionData?.length > 0 ? (
            <div
              className="flex items-center"
              onClick={() => navigate("/cashbackInsights")}
            >
              <span className="font-public font-semibold text-sm text-utility-brand-600 underline underline-offset-[4px]">
                Insights
              </span>
              <span className="ml-1 items-center justify-center">
                <InsightsForwardIcon />
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex text-utility-brand-600  mt-[6px]">
          <span className="align-super text-xl font-bold">$</span>
          <h2 className="text-5xl font-bold ">{newAmount?.integer || 0}</h2>
          <span className="align-super text-xl font-bold">
            {newAmount?.decimal || 0}
          </span>
        </div>
        {/* <div className='flex  items-center justify-center'>
                    <img src={CalenderIcon} alt='calender' className='pr-0.5' />
                    <p className='text-size-14 text-gray-connected-account'>YTD: <span className='text-gray-ytd font-bold'>$30.97</span></p>
                </div> */}
      </div>
      <CashbackInfoBottomSheetComponent
        showOverlay={showCashbackInfoBottomSheet}
        onDismiss={setshowCashbackInfoBottomSheet}
      />
    </div>
  );
};

export default TotalCashbackCard;
