import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { getFlatOrPercentCashbackAmount } from "../../utils/amountHelper";
import NavLink from "../../components/navLink";
import Card from "../../components/Card";
import { categoriesTabs } from "../../constants/categoriesTabs";

const LocalOffers = () => {
  const { categoryData, setOfferDetail } = useContext(AppContext);
  const navigate = useNavigate();

  const localOffersList = categoryData?.[categoriesTabs[1].name]
    ? categoryData?.[categoriesTabs[1].name]
    : [];
  const showOffers =
    localOffersList.length > 0 ? localOffersList.slice(0, 5) : [];

  if (localOffersList.length === 0) return null;
  return (
    <div className="mt-6">
      <NavLink label="Explore Puerto Rican offers" hideIcon />
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {showOffers.map((item, i) => {
            const img = item?.Img
              ? item.Img.filter(
                  (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
                )
              : [];
            const featureImg = item?.Img
              ? item.Img.filter((item) => item.Kind === "FEATURED")
              : [];
            return (
              <div key={`${i}-${item?.Name}`}>
                <Card
                  img={
                    featureImg && featureImg.length > 0
                      ? featureImg[0].URL
                      : Logo
                  }
                  logoImg={img && img.length > 0 ? img[0].URL : Logo}
                  title={getFlatOrPercentCashbackAmount(
                    item?.Kind,
                    item?.CashbackAmount
                  )}
                  desc={item?.Name}
                  size="medium"
                  onClick={() => {
                    setOfferDetail(item);
                    navigate("/productDetail");
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default LocalOffers;
