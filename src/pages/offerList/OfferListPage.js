import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AwardIcon,
  CloseIcon,
  CoinsIcon,
  InfoCircleIcon,
  MenuIcon,
  SearchIcon,
} from "../../components/icons";
import { IoIosArrowForward } from "react-icons/io";
import { Image } from "../../components/common";
import TopBack from "../../assets/Background.png";
import FavoriteOffers from "./FavoriteOffers";
import { AppContext } from "../../AppProvider";
import { getSeparateIntegerAndDecimal } from "../../utils/amountHelper";
import NavLink from "../../components/navLink";
import CardWrapper from "../../components/cardWrapper";
import OffersTab from "./OffersTab";
import RecommendedOffers from "./RecommendedOffers";
import CashbackInfoBottomSheetComponent from "../../components/Bottomsheets/cashbackInfoBottomSheet";
import useAppNavigation from "../../hooks/useAppNavigation";
import LocalOffers from "./LocalOffers";
import { categoriesTabs } from "../../constants/categoriesTabs";
import useOfferList from "../../hooks/useOfferList";
import OfferListSkeleton from "../skeleton/OfferListSkeleton";
import DiscoverBottomSheet from "../../components/Bottomsheets/DiscoverBottomSheet";

const OfferListPage = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDiscoverOverlay, setShowDiscoverOverlay] = useState(false);
  const { allData, categoryData, loading } = useOfferList();
  const { userDetail, setCategorySection } = useContext(AppContext);

  const { handleCloseBtnClick } = useAppNavigation();

  const onCashbackClick = (e) => {
    e.preventDefault();
    navigate("/cashback", {
      state: {
        trackingCode: userDetail?.TrackingCode,
        totalCashbackAmount: parseFloat(userDetail?.TotalCashbackAmount) ?? 0,
      },
    });
  };

  const newAmount = userDetail?.TotalCashbackAmount
    ? getSeparateIntegerAndDecimal(userDetail?.TotalCashbackAmount)
    : null;

  const isFavorites = userDetail?.Favorites && userDetail?.Favorites.length > 0;

  const isRecommendedOffers =
    allData &&
    allData.find(
      (item) => item.IsRecommended === "true" || item.IsRecommended === true
    );
  const IsLocalOffers =
    categoryData?.[categoriesTabs[1].name] &&
    categoryData?.[categoriesTabs[1].name].length > 0;

  if (loading) return <OfferListSkeleton />;

  return (
    <div className="text-black-10 bg-secondary -z-20 absolute pb-1 w-full">
      <Image
        className="w-full h-auto !object-contain absolute -z-10"
        src={TopBack}
        alt="brand-logo"
      />
      <div className="flex justify-between p-4 fixed min-h-14 w-full bg-blue-200 z-50">
        <MenuIcon />
        <h3 className="text-base font-normal text-primary-900">Marketplace</h3>
        <div className="flex gap-4 items-center">
          <span
            onClick={handleCloseBtnClick}
            className="w-6 h-6 flex justify-center items-center"
          >
            <CloseIcon width={12} height={12} />
          </span>
        </div>
      </div>
      {newAmount && newAmount.integer !== "0" ? (
        <CardWrapper className="cursor-pointer mt-17" onClick={onCashbackClick}>
          <div className="flex justify-between">
            <div className="flex">
              <AwardIcon />
              <span className="text-sm font-semibold ml-2 text-secondary">
                Your cashback activity
              </span>
            </div>
          </div>
          <hr className="border-[0.5px] border-gray-300 my-2.5" />
          <div className="flex justify-between items-center cursor-pointer">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <span className="text-xs text-quaternary">
                  Total cashback earned
                </span>
                <span
                  onClick={(e) => {
                    e?.stopPropagation();
                    setShowOverlay(true);
                  }}
                >
                  <InfoCircleIcon />
                </span>
              </div>
              <div className="flex gap-0.5 text-utility-brand-600">
                <span className="align-super text-xl font-bold">$</span>
                <h2 className="text-5xl font-bold ">
                  {newAmount?.integer || 0}
                </h2>
                <span className="align-super text-xl font-bold">
                  {newAmount?.decimal || 0}
                </span>
              </div>
            </div>
            <IoIosArrowForward className="fill-black-10 text-2xl" />
          </div>
        </CardWrapper>
      ) : (
        <CardWrapper
          className="mt-17 cursor-pointer"
          onClick={() => {
            setShowDiscoverOverlay(true);
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <CoinsIcon />
              <div>
                <h3 className="text-base leading-[22px] text-primary-900 font-medium">
                  Cashback straight in your pocket
                </h3>
                <span className="text-sm font-normal text-gray-connected-account">
                  Redeem offer get cashback straight to your account
                </span>
              </div>
            </div>
            <IoIosArrowForward className="fill-black-10 text-2xl" />
          </div>
        </CardWrapper>
      )}

      {(isFavorites || isRecommendedOffers) && (
        <CardWrapper>
          {isRecommendedOffers && <RecommendedOffers />}
          {IsLocalOffers && <LocalOffers />}
          {isFavorites && <FavoriteOffers />}
        </CardWrapper>
      )}
      <CardWrapper>
        <NavLink
          label="Offers by category"
          onClick={() => {
            setCategorySection(categoriesTabs[0].name);
            navigate("/category");
          }}
        />
        <div
          className="py-2.5 px-3.5 border border-gray-300 rounded-lg flex items-center mb-3 cursor-pointer"
          onClick={() => {
            navigate("/productSearch");
          }}
        >
          <span className="w-6 h-6 flex items-center mr-2">
            <SearchIcon />
          </span>
          <span className="text-base font-normal text-quaternary">
            Search for store
          </span>
        </div>
        {categoryData && <OffersTab data={categoryData} />}
      </CardWrapper>
      <CashbackInfoBottomSheetComponent
        showOverlay={showOverlay}
        onDismiss={setShowOverlay}
      />
      <DiscoverBottomSheet
        showOverlay={showDiscoverOverlay}
        setShowDiscoverOverlay={setShowDiscoverOverlay}
        onDismiss={() => setShowDiscoverOverlay(false)}
      />
    </div>
  );
};

export default OfferListPage;
