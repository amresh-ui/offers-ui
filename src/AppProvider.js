import React, { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recommendedApiData, setRecommendedApiData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [categorySection, setCategorySection] = useState("");
  const [offerSearch, setOfferSearch] = useState("");
  const [offerDetail, setOfferDetail] = useState(null);
  const [favoriteRecords, setFavoriteRecords] = useState([]);
  const [commissionData, setCommissionData] = useState([]);
  const contextValue = useMemo(
    () => ({
      recommendedApiData,
      setRecommendedApiData,
      allData,
      setAllData,
      detailData,
      setDetailData,
      userDetail,
      setUserDetail,
      setAccessToken,
      accessToken,
      setCategoryData,
      categoryData,
      setCategorySection,
      categorySection,
      setOfferDetail,
      offerDetail,
      setOfferSearch,
      offerSearch,
      favoriteRecords,
      setFavoriteRecords,
      commissionData,
      setCommissionData,
    }),
    [
      accessToken,
      recommendedApiData,
      allData,
      detailData,
      userDetail,
      categoryData,
      categorySection,
      offerDetail,
      offerSearch,
      favoriteRecords,
      commissionData,
    ]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
