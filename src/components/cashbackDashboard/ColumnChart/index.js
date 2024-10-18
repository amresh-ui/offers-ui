import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import ActivityBottomSheet from "../../Bottomsheets/ActivityBottomSheet";
import { getSeparateIntegerAndDecimal } from "../../../utils/amountHelper";
import useCommissionData from "../../../hooks/useCommissionData";
import SectionHeader from "../CashbackNoData/SectionHeader";
import CashbackNoData from "../CashbackNoData";

const ColumnChart = ({ currentTab, periodCashbackData }) => {
  const chartWrapperRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const { updatedCommissionData } = useCommissionData(
    currentTab,
    periodCashbackData
  );

  const options = useMemo(
    () => ({
      legend: { position: "none" },
      vAxis: { format: "$#,###" },
      chartArea: { width: "80%" },
      tooltip: { trigger: "none" },
    }),
    []
  );

  const handleClickOutside = useCallback((event) => {
    if (
      chartWrapperRef.current &&
      !chartWrapperRef.current.contains(event.target)
    ) {
      setSelectedData(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;

    const [selectedItem] = selection;
    const selectedRow = selectedItem.row;
    const selectedMonth =
      updatedCommissionData[currentTab]?.[selectedRow + 1]?.[0];
    const selectedValue =
      updatedCommissionData[currentTab]?.[selectedRow + 1]?.[1];

    setSelectedData({ month: selectedMonth, value: selectedValue });
  };

  const data = useMemo(() => {
    if (!updatedCommissionData?.[currentTab]?.length) return [];

    return updatedCommissionData[currentTab].map((item, i) => {
      if (i > 0) {
        if (currentTab === "12") item[0] = item[0]?.charAt();
        if (selectedData) {
          if (
            item[0] === selectedData?.month &&
            item[1] === selectedData?.value
          )
            return item;
          item[2] = "color: #2678F2; opacity:0.3; stroke-width: 0";
        }
        return item;
      }
      return item;
    });
  }, [updatedCommissionData, currentTab, selectedData]);

  const newAmount = selectedData
    ? getSeparateIntegerAndDecimal(selectedData.value)
    : getSeparateIntegerAndDecimal(
        updatedCommissionData[`${currentTab}_total`] || 0
      );

  const getRedeemOneYear = () => {
    const keys = Object.keys(updatedCommissionData);
    const dataKey = keys.find(
      (key) =>
        updatedCommissionData[key]?.totalAmount &&
        updatedCommissionData[key]?.totalAmount === selectedData.value &&
        key.charAt() === selectedData.month
    );
    return updatedCommissionData?.[dataKey]?.count;
  };
  
  return (
    <>
      <div className="mt-4">
        {periodCashbackData.length > 1 ? (
          <div className="p-4 rounded-2xl min-h-[300px] shadow-shadow-xs bg-white-100">
            <SectionHeader
              title="All activity"
              onClick={() => setShowPopup(true)}
            />
            <div
              ref={chartWrapperRef}
              className="mt-2"
              role="region"
              aria-label="Commission Data Chart"
            >
              <Chart
                chartType="ColumnChart"
                width="100%"
                data={data}
                options={options}
                chartEvents={[{ eventName: "select", callback: handleSelect }]}
              />
            </div>
            {newAmount && (
              <div className="flex gap-2 justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-quaternary">Total</span>
                  <div className="flex gap-0.5 text-utility-brand-600">
                    <span className="align-super text-base font-bold">$</span>
                    <h2 className="text-[28px] font-bold">
                      {newAmount.integer || 0}
                    </h2>
                    <span className="align-super text-base font-bold">
                      {newAmount.decimal || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-quaternary">
                    Offers redeemed
                  </span>
                  <span className="text-base font-bold text-primary-900">
                    {selectedData
                      ? currentTab === "12"
                        ? getRedeemOneYear()
                        : updatedCommissionData[selectedData.month]?.count
                      : updatedCommissionData[`${currentTab}_status`]}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CashbackNoData
            title="All activity"
            onClick={() => setShowPopup(true)}
          />
        )}
      </div>
      <ActivityBottomSheet showOverlay={showPopup} onDismiss={setShowPopup} />
    </>
  );
};

export default React.memo(ColumnChart);
