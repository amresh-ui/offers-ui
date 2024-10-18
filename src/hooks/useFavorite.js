import { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { updateUserDetails } from "../utils/apiHelper";
import { arraysAreEqual } from "../utils/utils";
import { AppContext } from "../AppProvider";
import { categoriesTabs } from "../constants/categoriesTabs";
import useDebounce from "./useDebounce";
const useFavorite = () => {
  const {
    userDetail,
    setUserDetail,
    favoriteRecords,
    setFavoriteRecords,
    categoryData,
    setCategoryData,
  } = useContext(AppContext);
  const [intialFavoriteRecords, setIntialFavoriteRecords] =
    useState(favoriteRecords);
  const saveFavoriteProduct = async (favRecords) => {
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
          setFavoriteRecords([...favRecords]);
        }
      }
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const categoryFavUpdate = (item) => {
    const index = categoryData[item?.PopularCategory].findIndex(
      (r) => r.MerchantId === item?.MerchantId
    );
    handleUpdateCategoryFavorite(item?.PopularCategory, index);
  };

  const handleFavoriteClick = (item, handleShowToast) => {
    categoryFavUpdate(item);
    const isFavorite = intialFavoriteRecords.includes(item.MerchantId);    
    if (!isFavorite) {
      setIntialFavoriteRecords(prev => [...prev, item.MerchantId]);
      handleShowToast(`Following ${item?.Name}`);
    } else {
      setIntialFavoriteRecords(prev => prev.filter(m => m !== item.MerchantId));
      handleShowToast(`Unfollowing ${item?.Name}`);
    }
  };

  const handleFavSave = useCallback((favRecords) => {
    saveFavoriteProduct(favRecords);
  }, [intialFavoriteRecords]);

  useDebounce(intialFavoriteRecords, 500, handleFavSave);

  const handleUpdateCategoryFavorite = (category, itemIndex) => {
    const newCategoryData = JSON.parse(JSON.stringify(categoryData));
    const currentItem = newCategoryData[category][itemIndex];
    if (currentItem) {
      currentItem["isFavorite"] = !currentItem["isFavorite"];
      const allCategoryItemIndex = categoryData[
        categoriesTabs[0].name
      ].findIndex((item) => item.MerchantId === currentItem.MerchantId);
      if (allCategoryItemIndex !== -1) {
        categoryData[categoriesTabs[0].name][allCategoryItemIndex][
          "isFavorite"
        ] =
          !categoryData[categoriesTabs[0].name][allCategoryItemIndex][
            "isFavorite"
          ];
      }
      setCategoryData({
        ...categoryData,
        [category]: categoryData[category],
        [categoriesTabs[0].name]: categoryData[categoriesTabs[0].name],
      });
    }
  };
  return { handleFavoriteClick, handleFavSave, handleUpdateCategoryFavorite };
};

export default useFavorite;
