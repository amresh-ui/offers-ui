import React, { useContext, useEffect, useState } from "react";
import { getCashbackApi } from "../../../utils/apiHelper";
import Loader from "../../loader";
import NoPurchaseComponent from "./NoPurchase";
import PurchaseItem from "./PurchaseItem";

import "./style.css";
import CashbackSkeleton from "../../../pages/skeleton/CashbackSkeleton";
import { AppContext } from "../../../AppProvider";

const PurchaseHistory = ({ trackingCode }) => {
  const [loading, setLoading] = useState(true);
  const { setCommissionData, commissionData } = useContext(AppContext);

  useEffect(() => {
    if (commissionData?.length === 0) {
      fetchPurchaseHistoryData();
    } else {
      setLoading(false);
    }
  }, [commissionData.length]);

  const fetchPurchaseHistoryData = () => {
    getCashbackApi(trackingCode)
      .then(({ data }) => {
        const newData = JSON.parse(JSON.stringify(data));
        if (newData?.Commissions?.length) {
          newData.Commissions = newData.Commissions.filter(
            (item) => item.Status !== "DISQUALIFIED"
          );
          newData.Commissions.sort(
            (a, b) => new Date(b.EventDate) - new Date(a.EventDate)
          );
          setCommissionData(newData?.Commissions);
        } else {
          setCommissionData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching purchase history:", err);
        setLoading(false);
      });
  };

  if (loading) return <CashbackSkeleton />;

  return (
    <div className="w-full px-5 pb-5 pt-0 mt-0 bg-secondary font-public">
      <div className="purchase-history">
        <p className="header-title">All cashback activity</p>
        {/* <div className='flex items-center'>
        <p className='text-size-12 text-gray-connected-account'>Connected account: <span className="font-bold">(x1234)</span></p>
      </div> */}
        <div className="purchase-list">
          {loading && <Loader className={"min-ht-200"} />}
          {!loading && !commissionData.length ? (
            <NoPurchaseComponent />
          ) : (
            commissionData?.map((purchase) => (
              <PurchaseItem
                key={purchase?.Id + purchase?.MerchantID}
                purchase={purchase}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
