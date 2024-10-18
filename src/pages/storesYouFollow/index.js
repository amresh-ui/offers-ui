import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import { Image } from "../../components/common";
import Loader from "../../components/loader";
import Logo from "../../assets/Logo.png";
import Toast from "../../components/toast";
import { CloseIcon } from "../../components/icons";
import useFavorite from "../../hooks/useFavorite";
import useAppNavigation from "../../hooks/useAppNavigation";
import NoFavoriteRecordFound from "../../components/noFavoritesFound";
import HeartComponent from "../../components/heartComponent";

const FollowedStores = () => {
  const navigate = useNavigate();
  const { allData, setOfferDetail, favoriteRecords } = useContext(AppContext);
  const { handleCloseBtnClick } = useAppNavigation();
  const [listData, setListData] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const { handleFavoriteClick } = useFavorite();

  useEffect(() => {
    setListData(allData?.length ? [...allData] : []);
    setPageLoad(false);
  }, []);

  const handleNavigate = (selectedItem) => {
    setOfferDetail(selectedItem);
    navigate("/productDetail");
  };

  const listItem = (items) => {
    return (
      <>
        {items.map((r, index) => {
          const img = r?.Img
            ? r.Img.filter(
                (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
              )
            : [];
          const isFavorite = favoriteRecords.indexOf(r.MerchantId) > -1;

          return (
            <li
              key={index}
              className="flex h-17 items-center justify-between px-2 border-b-[0.5px]  border-gray-300 last:border-0"
            >
              <div className="flex-shrink-0" onClick={() => handleNavigate(r)}>
                <div className="w-12 h-12 rounded-full border border-gray-200  overflow-hidden">
                  <Image
                    className="w-full h-full !object-contain"
                    src={img && img.length > 0 ? img[0].URL : Logo}
                    alt="brand-logo"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col w-full overflow-hidden">
                <span
                  className="text-left ml-4 text-black-30 font-semibold text-base truncate text-size-14 overflow-hidden whitespace-nowrap"
                  onClick={() => handleNavigate(r)}
                >
                  {r?.Name}
                </span>
              </div>
              <HeartComponent
                isFavorite={isFavorite}
                onHeartClick={() => {
                  handleFavoriteClick(
                    r,
                    handleShowToast
                  );
                }}
              />
            </li>
          );
        })}
      </>
    );
  };

  const handleBackBtnClick = () => {
    // Navigate back immediately
    navigate("/offers");
  };

  const renderListItem = () => {
    const filterItem = listData.filter((r) =>
      favoriteRecords?.indexOf(r.MerchantId) > -1 ? true : false
    );
    return (
      <>
        <div>
          {favoriteRecords?.length > 0 &&
            listData?.length > 0 &&
            filterItem?.length > 0 && (
              <>
                <ul className="mx-0">{listItem(filterItem)}</ul>
              </>
            )}
          {!filterItem?.length && <NoFavoriteRecordFound />}
        </div>
      </>
    );
  };

  const handleShowToast = (message) => {
    setToastMessage(message);
  };

  if (pageLoad) return <Loader className="h-screen" />;

  return (
    <div className="w-full flex flex-col">
      <Header
        title="Stores you follow"
        onBack={handleBackBtnClick}
        classes={{
          root: "bg-white-100 min-h-14 !items-center !p-4",
          title: "!text-dark-blue !font-normal",
          back: "!text-black-20",
          close: "!text-white-30",
        }}
        zindex={1}
        onClose={handleCloseBtnClick}
        closeLabel={<CloseIcon height={12} width={12} />}
        isCashbackOrAllOffersHeader={true}
      />
      <div className="flex-grow p-[16px]">{renderListItem()}</div>
      {toastMessage.length ? (
        <div className="fixed left-5 right-5 top-[4px]">
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

export default FollowedStores;
