import { useContext, useEffect } from "react";
import { AppContext } from "../../AppProvider";
import { useNavigate } from "react-router-dom";
import { CloseIcon, SearchIcon } from "../../components/icons";
import OffersTab from "../offerList/OffersTab";
import Header from "../../components/header";
import useAppNavigation from "../../hooks/useAppNavigation";
import { categoriesTabs } from "../../constants/categoriesTabs";

const CategoryMain = () => {
  const navigate = useNavigate();
  const { handleCloseBtnClick } = useAppNavigation();
  const { categorySection, categoryData } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="bg-white-100">
      <Header
        title={
          categorySection
            ? categorySection === categoriesTabs[0].name
              ? "All offers"
              : categorySection
            : "All offers"
        }
        onBack={() => {
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
      <div className="bg-white-100 fixed w-full z-10 px-4 pt-2 pb-2.5 mt-0">
        <div
          className="py-2.5 px-3.5 border border-gray-300 rounded-lg flex items-center cursor-pointer "
          onClick={() => {
            navigate("/productSearch");
          }}
        >
          <span className="w-6 h-6 flex items-center mr-2">
            <SearchIcon />
          </span>
          <span className="text-base font-normal text-quaternary">
            Search for store
          </span>
        </div>
      </div>
      <div className="mx-4 mt-20">
        {categoryData && (
          <OffersTab
            data={categoryData}
            categoryName={categorySection}
            hideViewMore
          />
        )}
      </div>
    </div>
  );
};

export default CategoryMain;
