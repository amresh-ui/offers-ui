import { useNavigate } from "react-router-dom";
import { Image } from "../../components/common";
import Logo from "../../assets/Logo.png";

import { AppContext } from "../../AppProvider";
import { useContext, useEffect } from "react";
import NavLink from "../../components/navLink";

const FavoriteOffers = () => {
  const navigate = useNavigate();
  const { allData, userDetail, setOfferDetail } = useContext(AppContext);
  const isFavorites = userDetail?.Favorites && userDetail?.Favorites.length > 0;
  const filteredData = allData?.filter(
    (m) => userDetail?.Favorites?.indexOf(m.MerchantId) > -1
  );

  if (isFavorites)
    return (
      <div className="mt-6">
        <NavLink
          label="Stores you follow"
          onClick={() => {
            navigate("/followedStores");
          }}
        />
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {filteredData?.slice(0, 7)?.map((r, index) => {
              const img = r?.Img
                ? r.Img.filter(
                    (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
                  )
                : [];
              return (
                <div
                  key={`fav-` + index}
                  className="flex items-center px-[13.5px] pb-1 min-w-[83px]"
                  onClick={() => {
                    setOfferDetail(r);
                    navigate("/productDetail");
                  }}
                >
                  <Image
                    className="w-14 h-14 rounded-full border border-gray-200 bg-white-100 !object-contain"
                    src={img && img.length > 0 ? img[0].URL : Logo}
                    alt="brand-logo"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  return null;
};
export default FavoriteOffers;
