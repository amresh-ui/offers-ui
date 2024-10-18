const today = new Date();

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useCommissionData = (currentTab, periodCashbackData) => {

  const updatedCommissionData = periodCashbackData.reduce((acc, item) => {
    const earnedDate = new Date(item.CashBackEarnedDate);
    const monthName = monthNames[earnedDate.getMonth()];

    if (!acc[monthName]) {
      acc[monthName] = { totalAmount: 0, count: 0 };
    }
    if (!acc["total"]) {
      acc["total"] = 0;
    }
    acc[monthName].totalAmount += parseFloat(item.Amount);
    acc[monthName].count += 1;
    acc["total"] = +item?.Amount + acc.total;

    return acc;
  }, {});

  const prepareLastMonthsArray = (monthsBack) => {
    const resultArray = [["Month", "Amount", { role: "style" }]];
    const color = "color: #2678F2; stroke-width: 0";
    let paidCount = 0;
    let totalAmount = 0;
    const lastMonths = [];
    const currentMonthIndex = today.getMonth();
  
    for (let i = 0; i < monthsBack; i++) {
      const monthIndex = (currentMonthIndex - i + 12) % 12;
      lastMonths.push(monthNames[monthIndex]);
    }
    lastMonths.reverse().forEach((monthName) => {
      const data = updatedCommissionData[monthName];
      const monthAmount = data ? data.totalAmount : 0;
      resultArray.push([monthName, monthAmount, color]);
      totalAmount += monthAmount;
      periodCashbackData.forEach((item) => {
        const itemEarnedDate = new Date(item.CashBackEarnedDate);
        if (
          monthNames[itemEarnedDate.getMonth()] === monthName &&
          item.Status === "PAID"
        ) {
          paidCount++;
        }
      });
    });
  
    return { resultArray, paidCount, totalAmount };
  };
  
  const monthData = prepareLastMonthsArray(currentTab);
  updatedCommissionData[currentTab] = monthData.resultArray;
  updatedCommissionData[`${currentTab}_status`] = monthData.paidCount;
  updatedCommissionData[`${currentTab}_total`] = monthData.totalAmount;

  return {
    updatedCommissionData,
  };
};

export default useCommissionData;
