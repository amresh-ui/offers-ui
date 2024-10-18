import React, { useContext, useState } from "react";
import Header from "../../components/header";
import NoRecordFound from "./../../components/noRecordFound";
import { AppContext } from "../../AppProvider";
import { useNavigate } from "react-router-dom";

const CategorySearchScreen = () => {
  const navigate = useNavigate();
  const { categoryData, setCategorySection } = useContext(AppContext);
  // const [searchText, setSearchText] = useState("");
  const categoryList = categoryData ? Object.keys(categoryData) : [];
  const [listData, setListData] = useState(categoryList);
  /** Feature removed for current requirement */
  // useEffect(() => {
  //   if (searchText) {
  //     setListData((d) => {
  //       return categoryList.filter(
  //         (m) =>
  //           m?.toLocaleLowerCase()?.indexOf(searchText?.toLocaleLowerCase()) >
  //           -1
  //       );
  //     });
  //   } else {
  //     setListData(categoryList);
  //   }
  // }, [searchText]);

  const renderItemAtEnd = (val, arr) => {
    const removeItemIndex = arr.indexOf(val);
    if (removeItemIndex !== -1) {
      arr.splice(removeItemIndex, 1);
      arr.push(val);
    }
    return arr;
  };

  return (
    <div className="w-full bg-gray-20 h-screen">
      <Header
        title="Categories"
        onBack={() => {
          navigate(-1);
        }}
        classes={{
          root: "bg-gray-20 min-h-14 !items-end pl-5",
          title: "!text-black-80",
          back: "!text-black-30",
        }}
      />
      <>
        {/* /* Feature removed for current requirement */}
        {/* <SearchBar onChange={(e) => setSearchText(e.target.value)} /> */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold my-4 mx-4  text-black-30">
            All categories
          </h2>
          <div className="container mx-auto py-2">
            <div className="grid grid-cols-2 max-[360px]:grid-cols-1 gap-4">
              {categoryList.length > 0 &&
                renderItemAtEnd("Other", categoryList).map(
                  (item, index) => {
                    const imgCategory = categoryData[item].find(
                      (category) => category.PopularCategoryImageUrl
                    );
                    return (
                      <div
                        key={index}
                        className={`tile bg-no-repeat bg-cover h-[120px] w-auto rounded-lg shadow-lg relative flex items-end cursor-pointer `}
                        style={{
                          backgroundImage: `url(${imgCategory.PopularCategoryImageUrl})`,
                        }}
                        onClick={() => {
                          setCategorySection(item);
                          navigate("/category");
                        }}
                      >
                        <div className=" h-full w-full bg-solid-black-gradient   rounded-lg relative flex items-end p-2">
                          <h2 className="text-sm 	font-semibold text-white text-end leading-[22px] bg-black bg-opacity-50 font-public  rounded">
                            {item}
                          </h2>
                        </div>
                      </div>
                    );
                  }
                )}
              {!listData?.length && <NoRecordFound />}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CategorySearchScreen;
