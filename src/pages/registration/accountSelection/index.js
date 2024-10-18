import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../../AppProvider";
import AccountSelectionScreenBottomSheetComponent from "../../../components/Bottomsheets/AccountSelectionBottomSheet";
import { Flex, SelectField } from "../../../components/common";
import Header from "../../../components/header";
import { CloseIcon } from "../../../components/icons";
import AccountInfoCircleIcon from "../../../components/icons/AccountInfoCircleIcon";
import { MockAccounts } from "../../../constants/mockAccount";
import useAppNavigation from "../../../hooks/useAppNavigation";
import {
  getAccountsApi,
  getTokenApi,
  updateUserDetails,
} from "../../../utils/apiHelper";
import { maskAccountNumber } from "../../../utils/maskedAccount";
import { filterAccountLists } from "../../../utils/utils";
import AccountRedeemIcon from "../../../components/icons/RedeemAccount";
import LoaderOverlay from "../../../components/loader/loaderOverlay";

const MarketplaceRegistrationAccountSelection = () => {
  const initState = {
    selectedOption: "",
    accountDesc: "",
    isConsentChecked: false,
    loadingAccountNumber: false,
    accountList: [],
    loadingAccountList: true,
  };
  const [state, setState] = useState(initState);
  const [isBottomsheetOpen, setIsBottomsheetOpen] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const { setUserDetail, userDetail } = useContext(AppContext);

  const navigate = useNavigate();
  const { handleCloseBtnClick } = useAppNavigation();

  // get param passed from previous screen
  const location = useLocation();
  const isComingFromOfferDetail = location.state?.isComingFromOfferDetail;

  const handleBottomSheetOpen = (content) => {
    setIsBottomsheetOpen(true);
    setBottomSheetContent(content);
  };

  const handleBottomSheetDismiss = () => {
    setIsBottomsheetOpen(false);
    setBottomSheetContent(null);
  };

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const LoadSampleData = () => {
    const AccountData = MockAccounts;
    setTimeout(() => {
      setState({
        ...state,
        accountList: filterAccountLists(AccountData),
        loadingAccountList: false,
        selectedOption: "",
        accountDesc: "",
      });
    }, 3000); // mocking api behavior by adding timeout to see the skeleton loader
  };

  useEffect(() => {
    LoadSampleData();
    //getAccountList();
  }, []);

  const getAccountList = () => {
    getTokenApi()
      .then(({ data }) => {
        getAccountsApi(data?.access_token, userDetail?.cisId)
          .then(({ data }) => {
            const AccountData = data.RelatedAcct;
            setState({
              ...state,
              accountList: filterAccountLists(AccountData),
              loadingAccountList: false,
              selectedOption: "",
              accountDesc: "",
            });
          })
          .catch((err) => {
            setState({
              ...state,
              loadingAccountList: false,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          loadingAccountList: false,
        });
      });
  };

  const updateAccountNumber = async () => {
    const accountNumber = state.selectedOption;
    const newUuid = uuidv4();

    setState({
      ...state,
      loadingAccountNumber: true,
    });

    try {
      const response = await updateUserDetails(
        { AccountNumber: accountNumber },
        userDetail.cisId,
        newUuid
      );
      if (response) {
        const { Exceptions } = response.data;
        if (Exceptions && Exceptions?.Errors?.length === 0) {
          setUserDetail({
            ...userDetail,
            TrackingCode: newUuid,
            AccountNumber: accountNumber,
          });

          isComingFromOfferDetail ? navigate(-1) : navigate("/offers");
        }
      }
      setState({
        ...state,
        loadingAccountNumber: false,
      });
    } catch (error) {
      console.error("Failed to update account number:", error);

      setState({
        ...state,
        loadingAccountNumber: false,
      });
    }
  };

  const DisplayScreenTitle = () => {
    return (
      <div className="mt-[32px]">
        <p className="font-public font-semibold text-2xl text-dark-blue">
          Select account to receive your cashback
          <span
            className="inline-block  px-1.5"
            onClick={() => handleBottomSheetOpen("accountInfo")}
          >
            <AccountInfoCircleIcon />
          </span>
        </p>
      </div>
    );
  };

  const DisplayButtons = ({ isDisabled }) => {
    return (
      <div className="mx-6 mb-6">
        <div
          className={`flex items-center justify-center rounded-[12px] py-2.5 gap-2
        ${
          isDisabled
            ? "bg-gray-20 text-gray cursor-not-allowed"
            : "bg-blue-10 text-white cursor-pointer"
        }`}
          onClick={isDisabled ? null : updateAccountNumber}
        >
          <p
            className={`text-lg font-public font-semibold ${
              isDisabled ? "text-button-disable-gray" : "text-white"
            }`}
          >
            {isComingFromOfferDetail
              ? "Add and redeem"
              : "Continue to marketplace"}
          </p>
          {isComingFromOfferDetail ? (
            <AccountRedeemIcon isDisabled={isDisabled} />
          ) : null}
        </div>
        <div
          className="flex items-center bg-tertiary py-2.5 justify-center rounded-[12px] mt-[16px]"
          onClick={() => {
            isComingFromOfferDetail ? navigate(-1) : navigate("/offers");
          }}
        >
          <p className="text-tertiary text-lg font-public font-semibold">
            Skip
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${state.loadingAccountNumber ? "opacity-50" : ""}
          flex flex-col w-full min-h-screen bg-white-100 relative`}
    >
      <Header
        title={isComingFromOfferDetail ? "Select deposit account" : ""}
        onBack={handleBackBtnClick}
        classes={{
          root: "min-h-14 !items-center !p-4 bg-white-100",
          title: "!text-dark-blue !font-normal",
          back: "!text-black-20",
          close: "!text-white-30",
        }}
        zindex={1}
        onClose={handleCloseBtnClick}
        closeLabel={<CloseIcon height={12} width={12} />}
        isCashbackOrAllOffersHeader={true}
      />
      <div className="px-6 flex-grow">
        <DisplayScreenTitle />
        <div className="mt-6">
          <p className="font-medium font-public text-sm text-secondary">
            Deposit account
          </p>

          <div className="flex flex-col flex-grow bg-transparent mt-[6px] mb-[8px]">
            <Flex className="flex-col !items-center">
              <SelectField
                options={state.accountList.length ? state.accountList : []}
                isApiLoading={state.loadingAccountList}
                value={
                  state.selectedOption !== ""
                    ? maskAccountNumber(state.selectedOption)
                    : ""
                }
                accountDesc={state.accountDesc}
                onChange={(option) => {
                  setState({
                    ...state,
                    selectedOption: option.value,
                    accountDesc: option.accountDesc,
                  });
                }}
                disabled={
                  state.accountList.length === 0 && !state.loadingAccountList
                }
              />
            </Flex>
          </div>
          <div onClick={() => handleBottomSheetOpen("dontSeeAccount")}>
            <p className="font-semibold font-public text-xs text-gray-connected-account underline underline-offset-2">
              Don't see your account?
            </p>
          </div>
        </div>
      </div>
      <DisplayButtons isDisabled={state.selectedOption.length === 0} />
      <AccountSelectionScreenBottomSheetComponent
        isAccountInfo={bottomSheetContent == "accountInfo"}
        isDontSeeAccount={bottomSheetContent == "dontSeeAccount"}
        showOverlay={isBottomsheetOpen}
        onDismiss={handleBottomSheetDismiss}
      />
      {state.loadingAccountNumber && <LoaderOverlay />}
    </div>
  );
};

export default MarketplaceRegistrationAccountSelection;
