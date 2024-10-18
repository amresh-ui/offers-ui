import Slider from "react-slick";
import { Image } from "../../components/common";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../AppProvider";
import { useNavigate } from "react-router";

const WhatsInMind = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const { categoryData, setCategorySection } = useContext(AppContext);
  let sliderRef = useRef(null);
  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    dotsClass: "slick-dots !static !mt-6 !mb-8",
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
          max={5}
        />
      </div>
    ),
  };

  const categoryList = categoryData ? Object.keys(categoryData) : [];

  if (categoryList.length === 0) return null;

  return (
    <>
      <h6 className="pl-4 text-base leading-5 font-semibold mb-5.5 text-blue-90">
        What’s on your mind?
      </h6>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {categoryList.map((item, i) => (
          <Image
            key={i}
            className="w-24.5 h-24.5 object-cover rounded-[10px] shadow-lg"
            src={categoryData[item][0]?.PopularCategoryIconUrl}
            alt="brand-logo"
            onClick={() => {
              setCategorySection(item);
              navigate("/category");
            }}
          />
        ))}
      </Slider>
    </>
  );
};

export default WhatsInMind;
