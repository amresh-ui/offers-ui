import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import SegmentedCircularProgressBar from "../../components/cashbackDashboard/CircularProgressBar";
import ColumnChart from "../../components/cashbackDashboard/ColumnChart";
import Header from "../../components/header";
import { CloseIcon } from "../../components/icons";
import { CASHBACK_INSIGHTS_TABS } from "../../constants/commission";
import useAppNavigation from "../../hooks/useAppNavigation";
import { GetPeriodWiseCommissionData } from "../../utils/utils";

const CashbackInsights = () => {
  const [currentTab, setCurrentTab] = useState("6");
  const { commissionData } = useContext(AppContext);
  const [periodCashbackData, setPeriodCashbackData] = useState({});

  useEffect(() => {
    if (!periodCashbackData[currentTab]) {
      // filter data based on the selected period (3, 6, 12 months) and Ready or Paid status
      const periodData = GetPeriodWiseCommissionData(
        commissionData,
        currentTab
      );
      // storing the data in the state for the selected period , preventing recalculation on tab change
      setPeriodCashbackData((prevData) => ({
        ...prevData,
        [currentTab]: periodData,
      }));
    }
  }, [currentTab]);

  const navigate = useNavigate();
  const { handleCloseBtnClick } = useAppNavigation();

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const DisplayTabs = () => {
    return (
      <div className="flex w-full border border-solid border-secondary rounded-[8px]">
        {CASHBACK_INSIGHTS_TABS.map((tab) => (
          <div
            key={tab.value}
            className={`flex flex-1 justify-center items-center py-2 ${
              currentTab === tab.value
                ? "bg-white-100 rounded-[8px] border border-solid border-gray-300"
                : "bg-secondary rounded-[8px] border-secondary"
            }`}
          >
            <button
              className="text-quaternary rounded-full font-public font-semibold text-sm"
              onClick={() => {
                setCurrentTab(tab.value);
                // Do something
              }}
            >
              {tab.name}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const tabIndex = parseInt(currentTab);

  return (
    <div className="w-full  bg-secondary h-screen">
      <Header
        title="Cashback insights"
        onBack={handleBackBtnClick}
        classes={{
          root: "min-h-14 !items-center !p-4 bg-secondary",
          title: "!text-dark-blue !font-normal",
          back: "!text-black-20",
          close: "!text-white-30",
        }}
        onClose={handleCloseBtnClick}
        closeLabel={<CloseIcon height={12} width={12} />}
        isCashbackOrAllOffersHeader={true}
      />
      <div className="p-4 bg-secondary  pb-10">
        <DisplayTabs />
        <ColumnChart
          currentTab={currentTab}
          periodCashbackData={periodCashbackData[tabIndex] ?? []}
        />
        <SegmentedCircularProgressBar
          size={250}
          commissionData={periodCashbackData[tabIndex] ?? []}
        />
      </div>
    </div>
  );
};

export default CashbackInsights;
