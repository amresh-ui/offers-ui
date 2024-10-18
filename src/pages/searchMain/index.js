import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import { useContext, useEffect, useMemo } from "react";
import { Image } from "../../components/common";
import { AppContext } from "../../AppProvider";
import Logo from "../../assets/Logo.png";
import useAppNavigation from "../../hooks/useAppNavigation";
import { CloseIcon } from "../../components/icons";
import { IoIosArrowForward } from "react-icons/io";
import { getFlatOrPercentCashbackAmount } from "../../utils/amountHelper";

const SearchScreen = () => {
  const navigate = useNavigate();
  const { handleCloseBtnClick } = useAppNavigation();
  const { allData, setOfferDetail, offerSearch, setOfferSearch } =
    useContext(AppContext);

  const filteredData = useMemo(() => {
    return allData.filter((item) =>
      item.Name.toLowerCase().includes(offerSearch.toLowerCase())
    );
  }, [allData, offerSearch]);

  const handleNavigate = (selectedItem) => {
    setOfferDetail(selectedItem);
    navigate("/productDetail");
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const renderListItem = () => {
    return (
      <div className="mt-20 mx-4">
        <span className="text-sm font-normal">
          {offerSearch && filteredData.length > 0
            ? `Showing search result for “${offerSearch}”`
            : offerSearch && filteredData.length === 0
              ? ""
              : "Suggestions"}
        </span>
        {filteredData?.length > 0 ? (
          <ul className="mt-4">
            {filteredData.map((r, index) => {
              const img = r?.Img
                ? r.Img.filter(
                  (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
                )
                : [];
              return (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 border-t	border-tertiary"
                >
                  <div
                    className="flex gap-4 w-full justify-between items-center"
                    onClick={() => handleNavigate(r)}
                  >
                    <div className="flex w-full gap-4 items-center ">
                      <div className="w-14 h-14 rounded-full  border border-gray-200 overflow-hidden">
                        <Image
                          className="w-full h-full !object-contain "
                          src={img && img.length > 0 ? img[0].URL : Logo}
                          alt="brand-logo"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 xxs:max-w-20 xs:max-w-56 md:max-w-full">
                        <h3 className="text-base text-primary-900 font-semibold truncate">
                          {r?.Name}
                        </h3>
                        <p className="text-xs text-secondary font-normal truncate">
                          {getFlatOrPercentCashbackAmount(
                            r?.Kind,
                            r?.CashbackAmount
                          )}
                        </p>
                      </div>
                    </div>
                    <IoIosArrowForward className="fill-black-10 text-2xl" />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-5 py-8 shadow-shadow-xs bg-secondary rounded-2xl text-center">
            <h3 className="text-lg font-semibold text-primary-900 mb-1.5">
              No stores found
            </h3>
            <p className="text-sm font-normal text-secondary">
              They might not be available in the marketplace or doesn’t have an
              active offer. Please check the spelling or try search for another
              store.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white-100">
      <Header
        title="Search Results"
        onBack={() => {
          setOfferSearch("");
          navigate(-1);
        }}
        classes={{
          root: "min-h-14 !items-center !p-4 bg-white-100",
          title: "!text-dark-blue !font-normal",
          back: "!text-black-20",
          close: "!text-white-30",
        }}
        onClose={handleCloseBtnClick}
        closeLabel={<CloseIcon height={12} width={12} />}
        isCashbackOrAllOffersHeader={true}
      />
      <SearchBar
        value={offerSearch}
        onChange={(e) => setOfferSearch(e.target.value.trimStart())}
        isDropdown={false}
        defaultFocus
      />
      {renderListItem()}
    </div>
  );
};

export default SearchScreen;
