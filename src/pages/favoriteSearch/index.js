import React, { useEffect, useState, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { FavoriteIcon, StarFillIcon } from "../../components/icons";
import NoRecordFound from "./../../components/noRecordFound";
import SearchBar from "../../components/searchBar";
import { AppContext } from "../../AppProvider";
import { Image } from "../../components/common";
import Loader from "../../components/loader";
import { updateUserDetails } from "../../utils/apiHelper";
import Logo from "../../assets/Logo.png";
import useDebounce from "../../hooks/useDebounce";
import { arraysAreEqual } from "../../utils/utils";

const FavoriteSearch = () => {
  const navigate = useNavigate();
  const {
    allData,
    userDetail,
    setUserDetail,
    setOfferDetail,
    favoriteRecords,
    setFavoriteRecords,
  } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [listData, setListData] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [intialFavoriteRecords, setIntialFavoriteRecords] = useState(favoriteRecords);

  useEffect(() => {
    if (searchText) {
      setListData((d) => {
        return allData?.filter(
          (m) =>
            m?.Name?.toLocaleLowerCase()?.indexOf(
              searchText?.toLocaleLowerCase()
            ) > -1
        );
      });
    } else {
      setListData(allData?.length ? [...allData] : []);
    }
  }, [searchText]);

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
          return (
            <li
              key={index}
              className="flex h-20 items-center justify-between px-4 pb-2.5 border-b mt-2.5	border-black-30"
            >
              <div className="flex-shrink-0" onClick={() => handleNavigate(r)}>
                <div className="w-16 h-16 rounded-full  border border-gray-200  overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={img && img.length > 0 ? img[0].URL : Logo}
                    alt="brand-logo"
                  />
                </div>
              </div>
              <span
                className="flex-1 text-left ml-4 text-black-30 font-semibold text-base truncate"
                onClick={() => handleNavigate(r)}
              >
                {r?.Name}
              </span>
              <span
                className="text-gray-500"
                onClick={() => handleFavoriteClick(r)}
              >
                {intialFavoriteRecords.indexOf(r.MerchantId) === -1 ? (
                  <FavoriteIcon height={25} width={27} />
                ) : (
                  <StarFillIcon height={25} width={27} />
                )}
              </span>
            </li>
          );
        })}
      </>
    );
  };

  const saveFavoriteAProduct = async (favRecords) => {
    // Check if favorites have changed
    if (arraysAreEqual(favRecords, favoriteRecords)) {
      return;
    }
    // Trigger the API call in the background
    try {
      setUserDetail({
        ...userDetail,
        Favorites: [...favRecords],
      });
      const response = await updateUserDetails(
        { Favorites: [...favRecords] },
        userDetail.cisId,
        uuidv4()
      );
      if (response) {
        const { Exceptions } = response.data;
        if (Exceptions && Exceptions?.Errors?.length === 0) {
          setFavoriteRecords([...favRecords ]);
        }
      }
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const handleBackBtnClick = () => {
    // Navigate back immediately
    navigate("/offers");
  };

  const handleSave = useCallback((favRecords) => {
    saveFavoriteAProduct(favRecords);
  }, []);

  useDebounce(intialFavoriteRecords, 500, handleSave);

  const handleFavoriteClick = (r) => {
    if (intialFavoriteRecords.indexOf(r.MerchantId) === -1) {
      setIntialFavoriteRecords([...intialFavoriteRecords, r.MerchantId])
    } else {
      setIntialFavoriteRecords(intialFavoriteRecords.filter((m) => m !== r.MerchantId))
    }
  };

  const renderListItem = () => {
    const filterItem = listData.filter((r) =>
      intialFavoriteRecords?.indexOf(r.MerchantId) > -1 ? true : false
    );
    return (
      <>
        <div className="mt-20">
          {intialFavoriteRecords?.length > 0 &&
            listData?.length > 0 &&
            filterItem?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold my-4 mx-5 text-black-30">
                  Added Favorites
                </h2>
                <ul className="mx-4">{listItem(filterItem)}</ul>
              </>
            )}
          {listData?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold my-4  mx-5 text-black-30">
                Recommended Stores
              </h2>
              <ul className="mx-4">
                {listItem(
                  listData.filter((r) =>
                    intialFavoriteRecords?.indexOf(r.MerchantId) > -1 ? false : true
                  )
                )}
              </ul>
            </>
          )}
          {!listData?.length && <NoRecordFound />}
        </div>
      </>
    );
  };

  if (isLoading || pageLoad) return <Loader className="h-screen" />;

  return (
    <div className="w-full flex flex-col">
      <Header
        title="Favorites"
        onBack={handleBackBtnClick}
        classes={{
          root: "bg-gray-20 min-h-14 !items-end pl-5",
          title: "!text-black-30",
          back: "!text-black-30",
        }}
      />
      <div className="flex-grow">
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.trimStart())}
          isDropdown={false}
        />
        {renderListItem()}
      </div>
    </div>
  );
};

export default FavoriteSearch;
