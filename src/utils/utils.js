import { categoriesTabs } from "../constants/categoriesTabs";

export const arraysAreEqual = (array1, array2) => {
  // Check if arrays are of the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Sort arrays
  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  // Compare sorted arrays
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
};

export const updateOffersWithFavorites = (offers, userData) => {
  const categoryData = {};
  offers.forEach((item) => {
    if (userData && userData?.Favorites?.indexOf(item.MerchantId) > -1) {
      item["isFavorite"] = true;
    }
    if (categoryData[item.PopularCategory]) {
      categoryData[item.PopularCategory].push(item);
    } else {
      categoryData[item.PopularCategory] = [item];
    }
  });
  categoryData[categoriesTabs[0].name] = offers;
  return categoryData;
};

export const filterAccountLists = (AccountData) => {
  const optionList = [];
  AccountData.forEach((item) => {
    if (item?.SectionInd === "S" || item?.SectionInd === "C") {
      //   if (
      //     optionList.findIndex((option) => option.value === item?.AcctId) === -1         commenting out since saving and checking account have same account number in mock data
      //   )
      {
        optionList.push({
          value: item?.AcctId,
          item: item,
          accountDesc: `${
            item?.SectionInd === "S" ? "Savings account" : "Checking account"
          }`,
        });
      }
    }
  });
  return optionList;
};

export const FilterCategoryWiseCommission = (commissionData) => {
  const TotalCashbackCategoryAmount = commissionData.reduce(
    (acc, category) => acc + parseFloat(category.Amount),
    0
  );

  const data = Object.entries(
    commissionData.reduce((acc, category) => {
      if (acc[category.PopularCategory]) {
        acc[category.PopularCategory] = {
          Amount:
            parseFloat(acc[category?.PopularCategory].Amount) +
            parseFloat(category?.Amount),
          ColorCode: category?.ColorCode,
          Category: category.PopularCategory,
          TotalOfferesRedeemed:
            acc[category.PopularCategory].TotalOfferesRedeemed + 1,
        };
        acc[category.PopularCategory].AmountPercentage = (
          (parseFloat(acc[category.PopularCategory].Amount) /
            TotalCashbackCategoryAmount) *
          100
        ).toFixed(2);
      } else {
        acc[category.PopularCategory] = {
          Amount: parseFloat(category.Amount),
          ColorCode: category?.ColorCode,
          Category: category.PopularCategory,
          AmountPercentage: (
            (parseFloat(category.Amount) / TotalCashbackCategoryAmount) *
            100
          ).toFixed(2),
          TotalOfferesRedeemed: 1,
        };
      }

      return acc;
    }, {})
  ).map(([key, value]) => ({
    ...value,
  }));
  data.sort((a, b) => b?.AmountPercentage - a?.AmountPercentage);  
  return [data, TotalCashbackCategoryAmount];
};

export const GetPeriodWiseCommissionData = (commissionData, selectedPeriod) => {
  const filteredCommissionData =
    commissionData?.filter(
      (item) => item?.Status === "READY" || item?.Status === "PAID"
    ) || [];
  let selectedPeriodFrom = "";
  const today = new Date();

  if (selectedPeriod === "3") {
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 3);
    selectedPeriodFrom = oneMonthAgo;
  } else if (selectedPeriod === "6") {
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    selectedPeriodFrom = sixMonthsAgo;
  } else if (selectedPeriod === "12") {
    const twelveMonthsAgo = new Date(today);
    twelveMonthsAgo.setMonth(today.getMonth() - 12);
    selectedPeriodFrom = twelveMonthsAgo;
  }

  return filteredCommissionData?.filter((item) => {
    const cashBackDate = new Date(item?.CashBackEarnedDate);
    return cashBackDate >= selectedPeriodFrom && cashBackDate <= today;
  });
};
