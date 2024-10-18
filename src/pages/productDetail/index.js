import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import Logo from "../../assets/Logo.png";
import { Button, Image } from "../../components/common";
import ConfirmationModal from "../../components/confirmationModal";
import Header from "../../components/header";
import HeartComponent from "../../components/heartComponent";
import { CloseIcon, RedeemIcon } from "../../components/icons";
import Toast from "../../components/toast";
import useAppNavigation from "../../hooks/useAppNavigation";
import useFavorite from "../../hooks/useFavorite";
import { getFlatOrPercentCashbackAmount } from "../../utils/amountHelper";
import { getOfferDetailApi } from "../../utils/apiHelper";
import { getPartnerUrl } from "../../utils/wildFireHelper";
import OfferDetailsSection from "./OfferDetailSection";
import TermsAndConditionsListScreen from "./TermsAndCondition";
import CardWrapper from "../../components/cardWrapper";
import ProductDetailSkeleton from "../skeleton/ProductDetailSkeleton";

const ProductDetailScreen = () => {
  const navigate = useNavigate();
  const { offerDetail } = useContext(AppContext);
  const { favoriteRecords, userDetail } = useContext(AppContext);
  const { handleFavoriteClick } = useFavorite();
  const [toastMessage, setToastMessage] = useState("");

  const [state, setState] = useState({
    isLoading: true,
    detailData: [],
    isConfirmationPopupOpen: false,
  });

  const { handleCloseBtnClick } = useAppNavigation();

  const img = offerDetail?.Img
    ? offerDetail.Img.filter(
        (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
      )
    : [];

  const featureImg = offerDetail?.Img
    ? offerDetail.Img.filter((item) => item.Kind === "FEATURED")
    : [];

  const onContinueClick = () => {
    const anchor = document.createElement("a");
    anchor.href = getPartnerUrl(offerDetail.MerchantId, offerDetail.URL);
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setState({
      ...state,
      isConfirmationPopupOpen: false,
    });
  };

  useEffect(() => {
    getOfferDetailApi(offerDetail?.MerchantId)
      .then(({ data }) => {
        setState({
          ...state,
          isLoading: false,
          detailData: data?.OfferDetail ? data.OfferDetail : [],
        });
      })
      .catch(() => {
        setState({ ...state, isLoading: false, detailData: [] });
      });
  }, []);

  const handleShowToast = (message) => {
    setToastMessage(message);
  };

  const StoreLogoAndNameComponent = () => {
    return (
      <div className="flex items-start px-4  mb-[32px]">
        <div className="flex-shrink-0">
          <div className="w-15 h-15 rounded-full bg-white-100 overflow-hidden border border-gray-200">
            <img
              src={img && img.length > 0 ? img[0].URL : Logo}
              alt="Brand Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="ml-[16px] flex-1 flex flex-col w-full overflow-hidden">
          <span className=" text-left text-dark-blue font-semibold text-2xl font-public truncate overflow-hidden whitespace-nowrap">
            {offerDetail?.Name}
          </span>
          <span className="block text-left text-secondary font-normal text-base font-public truncate mt-1.5 overflow-hidden whitespace-nowrap">
            Up to{" "}
            {getFlatOrPercentCashbackAmount(
              offerDetail?.Kind,
              offerDetail?.CashbackAmount
            )}
          </span>
        </div>
        <div className="ml-auto self-start">
          <HeartComponent
            isFavorite={favoriteRecords.indexOf(offerDetail?.MerchantId) > -1}
            isProductDetail={true}
            onHeartClick={() => {
              handleFavoriteClick(offerDetail, handleShowToast);
            }}
          />
        </div>
      </div>
    );
  };

  const handleRedeemOfferClick = () => {
    if (userDetail?.AccountNumber) {
      setState({
        ...state,
        isConfirmationPopupOpen: true,
      });
    } else {
      // pass isComingFromOfferDetail as true to show the account selection screen

      navigate("/accountSelection", {
        state: { isComingFromOfferDetail: true },
      });
    }
  };
  return (
    // <div className="w-full flex-col bg-secondary">
    <div className="w-full flex flex-col bg-secondary h-auto min-h-screen overscroll-none">
      <Header
        title="Offer details"
        onBack={() => {
          navigate(-1);
        }}
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
      <Image
        className="w-full h-[214px] object-cover"
        src={featureImg && featureImg.length > 0 ? featureImg[0].URL : ""}
      />
      <CardWrapper className="z-1 rounded-[16px] mx-4 mb-6 px-0 py-[16px] -mt-[34px]">
        <div>
          <StoreLogoAndNameComponent />
          <div className="mx-4">
            <Button
              className=" flex items-center font-semibold font-public text-lg justify-center py-3 w-full bg-white h-[44px] rounded-[12px] text-white text-center bg-blue-10"
              size="large"
              variant="link"
              onClick={handleRedeemOfferClick}
            >
              Redeem offer
              <span className="ml-[8px]">
                <RedeemIcon className="w-5 h-5 justify-center items-center" />
              </span>
            </Button>
            <p className="text-center text-gray-connected-account font-normal text-sm mt-2">
              Shop from merchant site to redeem offer
            </p>
          </div>
          {state.isConfirmationPopupOpen && (
            <ConfirmationModal
              isOpen={state.isConfirmationPopupOpen}
              onClose={() => {
                setState({
                  ...state,
                  isConfirmationPopupOpen: false,
                });
              }}
              onSubmit={onContinueClick}
            />
          )}
          <div>
            {state?.isLoading ? (
              <ProductDetailSkeleton />
            ) : (
              <OfferDetailsSection state={state} />
            )}
            <TermsAndConditionsListScreen />
          </div>
        </div>
      </CardWrapper>
      {toastMessage.length ? (
        <div className="fixed left-5 right-5 top-[4px] z-1">
          <Toast
            message={toastMessage}
            duration={3000}
            onClose={() => setToastMessage("")}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailScreen;
