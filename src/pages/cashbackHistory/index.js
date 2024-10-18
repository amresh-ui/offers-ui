import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PurchaseHistory from "../../components/cashbackDashboard/PurchaseHistory";
import Header from "../../components/header";
import { CloseIcon } from "../../components/icons";
import useAppNavigation from "../../hooks/useAppNavigation";
import "./style.css"; // Custom styles
import TotalCashbackCard from "./TotalCashbackCard";

const CashbackHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCloseBtnClick } = useAppNavigation();

  const { totalCashbackAmount, trackingCode } = location.state;

  const handleBackBtnClick = () => {
    // Navigate back immediately
    navigate(-1);
  };

  return (
    <div className="app-container-cashback h-screen bg-secondary">
      <Header
        title="Cashback activity"
        onBack={handleBackBtnClick}
        classes={{
          root: "min-h-14 !items-center !p-4 bg-secondary",
          title: "!text-dark-blue !font-normal",
          back: "!text-black-20",
          close: "!text-white-30",
        }}
        zindex={1}
        onClose={handleCloseBtnClick}
        closeLabel={<CloseIcon height={12} width={12} />}
        isCashbackOrAllOffersHeader={true}
      />
      <TotalCashbackCard totalCashbackAmount={totalCashbackAmount} />
      <PurchaseHistory trackingCode={trackingCode} />
    </div>
  );
};

export default CashbackHistory;
