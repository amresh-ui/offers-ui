import { useContext, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Image } from "../../components/common";
import Slider from "react-slick";
import { AppContext } from "../../AppProvider";
import { categoryColor } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { categoryColorThemes } from "../../constants/categoryThemes";
import Logo from "../../assets/Logo.png";
import { getFlatOrPercentCashbackAmount } from "../../utils/amountHelper";

const OfferSection = ({ title, data, categoryName }) => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const { userDetail, setCategorySection, setOfferDetail } =
    useContext(AppContext);
  const categoryDetail = userDetail?.PopularCategoryCashback
    ? userDetail?.PopularCategoryCashback?.find(
        (item) => item.Category === categoryColor[title]
      ) || null
    : null;
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    dotsClass: "slick-dots !static !mt-4",
    className: "week-offer",
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
    appendDots: () => (
      <div className="w-full flex items-center">
        <input
          onChange={(e) => {
            sliderRef.slickGoTo(e.target.value);
          }}
          value={slideIndex}
          type="range"
          className="offer-input-slider rounded-lg"
          min={0}
          max={data.length > 7 ? 5 : data.length}
        />
      </div>
    ),
  };

  const offerList = data.slice(0, 7);

  return (
    <div className="mt-4">
      <div
        className="flex justify-between mx-4 cursor-pointer"
        onClick={() => {
          setCategorySection(categoryName);
          navigate("/category");
        }}
      >
        <span className="text-base leading-5 font-semibold text-blue-90">
          {title}
        </span>
        <IoIosArrowForward className="text-blue-10" />
      </div>
      <div className="flex mt-4.5 ml-0">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {offerList.map((item, i) => {
            const img = item?.Img
              ? item.Img.filter(
                  (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
                )
              : [];
            return (
              <div
                key={`${i}-${item.Name}`}
                className="min-w-[130px] xxs:h-[180px]  xs:h-[150px] !flex flex-col items-center align-middle relative rounded-[10px] border border-gray-20 bg-white-100 mr-4 cursor-pointer shadow-lg"
                onClick={() => {
                  setOfferDetail(item);
                  navigate("/productDetail");
                }}
              >
                <Image
                  className="w-16 h-16 top-5 ml-1/2 object-cover absolute  rounded-full border border-gray-200 !bg-white-100 z-50"
                  src={img && img.length > 0 ? img[0].URL : Logo}
                  alt="brand-logo"
                />
                <div
                  className="bg-yellow-30 opacity-30 relative w-full h-15 rounded-b-[25px] rounded-t-lg mb-6"
                  style={{
                    backgroundColor: categoryDetail?.ColorCode
                      ? categoryDetail?.ColorCode
                      : categoryColorThemes[categoryName]
                      ? categoryColorThemes[categoryName]
                      : "",
                  }}
                ></div>
                <span className="text-sm text-black-20 leading-6 font-medium text-center px-4">
                  {getFlatOrPercentCashbackAmount(
                    item?.Kind,
                    item?.CashbackAmount
                  )}
                </span>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default OfferSection;
