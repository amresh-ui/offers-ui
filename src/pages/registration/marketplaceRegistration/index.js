import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../components/loader";
import { getUserDetailApi, userEnrollApi } from "../../../utils/apiHelper";
import { Button, CheckboxField, Flex, Image } from "../../../components/common";
import {
  CloseIcon,
  MbIcon,
  OnboardImg,
  PopularIcon,
} from "../../../components/icons";
import useAppNavigation from "../../../hooks/useAppNavigation";
import EnrollBackground from "../../../assets/EnrollBackground.png";
import CardWrapper from "../../../components/cardWrapper";
import { privacyPolicy, tncUrl } from "../../../constants/popularBankEnv";
import { AppContext } from "../../../AppProvider";
import MarketingPromotionBottomSheetComponent from "../../../components/Bottomsheets/marketingPromotionsBottomSheet";
import LoaderOverlay from "../../../components/loader/loaderOverlay";
import SplashScreen from "../../../components/splashScreen";

const initState = {
  selectedOption: "",
  isConsentChecked: false,
  isLoading: true,
  loadingEnroll: false,
  accountList: [],
  loadingAccountList: false,
};

const MarketplaceRegistration = () => {
  const navigate = useNavigate();
  const { handleCloseBtnClick } = useAppNavigation();
  const [state, setState] = useState(initState);
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchParams] = useSearchParams();
  const { userDetail, setUserDetail, setFavoriteRecords } =
    useContext(AppContext);
  const btnDisable = state.loadingEnroll || !state.isTncChecked;

  const getUserDetails = async () => {
    try {
      const response = await getUserDetailApi(searchParams.get("cisId"));
      if (response) {
        const { Exceptions, ...rest } = response.data;
        if (Exceptions && Exceptions.Errors.length <= 0) {
          setUserDetail({ ...rest, cisId: searchParams.get("cisId") });
          setFavoriteRecords(rest?.Favorites);
          navigate("/offers");
        }
      }
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    if (searchParams.get("cisId")) {
      getUserDetails();
    }
  }, []);

  const enrollUser = () => {
    const newUuid = uuidv4();
    setState({
      ...state,
      loadingEnroll: true,
    });
    setUserDetail({
      TrackingCode: newUuid,
      cisId: searchParams.get("cisId"),
    });
    userEnrollApi({
      ...userDetail,
      TrackingCode: newUuid,
      CISID: searchParams.get("cisId"),
    })
      .then(() => {
        navigate("/accountSelection");
      })
      .catch(() => {
        setState({
          ...state,
          loadingEnroll: false,
        });
      });
  };

  if (state.isLoading) return <SplashScreen />;

  return (
    <div
      className={`${
        state.loadingEnroll ? "opacity-50" : ""
      } h-screen bg-utility-brand-50 -z-20 absolute w-full`}
    >
      {state.loadingEnroll && <LoaderOverlay />}
      <Image
        className="w-full h-auto !object-contain absolute -z-10"
        src={EnrollBackground}
        alt="brand-logo"
      />
      <div className="flex justify-between p-4 fixed min-h-14 w-full bg-blue-200 z-50">
        <div className="w-6 h-6"></div>
        <div className="flex items-center gap-[4.85px]">
          <MbIcon />
          <PopularIcon />
        </div>
        <div className="flex gap-4 items-center">
          <span
            onClick={handleCloseBtnClick}
            className="w-6 h-6 flex justify-center items-center"
          >
            <CloseIcon width={12} height={12} />
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col gap-2 mx-4 pt-17 mb-3">
            <h3 className="text-[28px] leading-9 font-semibold text-primary-900 text-center">
              Welcome to marketplace
            </h3>
            <p className="text-base leading-[22px] font-normal text-secondary text-center">
              Unlock unbeatable deals from top brands and local gems, to
              kickstart your savings journey.
            </p>
          </div>
          <div className="flex justify-center">
            <OnboardImg />
          </div>
        </div>
        <CardWrapper className="mt-4.5 mx-4 shadow-shadow-xs">
          <div className="flex flex-col gap-6 mb-8">
            <CheckboxField
              label={
                <Flex className="!flex-wrap !gap-1 break-words text-sm leading-5 text-black-30 font-public font-normal">
                  I accept the
                  <a
                    href={privacyPolicy}
                    target="_blank"
                    className="text-black-30 font-normal font-public text-sm leading-5 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  and
                  <a
                    href={tncUrl}
                    target="_blank"
                    className="text-black-30 font-normal font-public text-sm leading-5 underline underline-offset-2"
                  >
                    Terms & Conditions
                  </a>
                </Flex>
              }
              name="tnc"
              checked={state.isTncChecked}
              onChange={(e) =>
                setState({ ...state, isTncChecked: e.target.checked })
              }
            />
            <CheckboxField
              label={
                <Flex className="!flex-wrap !gap-1 text-black-30 break-words leading-5 font-public text-sm">
                  I consent to receive
                  <a
                    href="#"
                    onClick={(e) => {
                      setShowOverlay(true);
                      e.preventDefault();
                    }}
                    className="text-black-30 font-normal font-public text-sm leading-5 underline underline-offset-2"
                  >
                    Marketplace Promotions
                  </a>
                </Flex>
              }
              name="consent"
              checked={state.isConsentChecked}
              onChange={(e) =>
                setState({ ...state, isConsentChecked: e.target.checked })
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full bg-white text-lg leading-6 font-semibold"
              variant="primary"
              disabled={btnDisable}
              onClick={enrollUser}
            >
              Accept and continue
            </Button>
            <Button
              className="w-full bg-white text-lg leading-6 font-semibold text-secondary bg-tertiary hover:bg-tertiary"
              variant="secondary"
              onClick={handleCloseBtnClick}
            >
              Cancel
            </Button>
          </div>
        </CardWrapper>
      </div>
      <MarketingPromotionBottomSheetComponent
        showOverlay={showOverlay}
        onDismiss={() => setShowOverlay(false)}
      />
    </div>
  );
};

export default MarketplaceRegistration;
