import React from "react";
import Slider from "react-slick";
import {
  DiscoverFirst,
  DiscoverSecond,
  DiscoverThird,
  DiscoverFourth,
} from "../../components/icons";
import { Button } from "../../components/common";

const EnrollDiscover = ({onClose}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "discover !flex flex-col justify-center h-full",
    dotsClass: "slick-dots !absolute !bottom-4",
    autoplay: true,
    customPaging: (i) => (
      <div className="custom-dot">
        <div className="dot"></div>
      </div>
    ),
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
  };

  const discoverScreens = [
    {
      img: <DiscoverFirst />,
      title: "Earn money back on all selected purchases",
      desc: "Discover the power of cashback! When you shop through our extensive list of partner stores and brands, you earn a percentage of your spending back as cashback.",
      class: "gap-[68px]",
    },
    {
      img: <DiscoverSecond />,
      title: "Keep track on your lifetime savings and transactions",
      desc: "Stay informed about your cashback earningsin one convenient place. View every transaction, including dates, amounts, and sources, ensuring you have a clear picture of your rewards.",
      class: "gap-[50px]",
    },
    {
      img: <DiscoverThird />,
      title: "Follow stores and stay up to date on new offers",
      desc: "Follow you favorite stores for quick access and instant updates, so you never miss out on special offers. Ensuring a seamless and personalized shopping experience every time.",
      class: "gap-[73px]",
    },
    {
      img: <DiscoverFourth />,
      title: "Discover over 100+ exclusive offers",
      desc: "Follow you favorite stores for quick access and instant updates, so you never miss out on special offers. Ensuring a seamless and personalized shopping experience every time.",
      class: "gap-[61px]",
    },
  ];

  return (
    <div className="text-white w-full h-full bg-blue-10 rounded-t-2xl">
     <div className="flex flex-col justify-between h-[90%]">
     <div className={`flex-grow mt-10 relative`}>
        <Slider className="h-full slider-container" {...settings}>
          {discoverScreens.map((item) => (
            <div
              className={`!flex flex-col justify-between items-center px-[30px] h-full ${item.class}`}
              key={item.title}
            >
             <div>{item.img}</div>
              <div className="flex flex-col gap-4">
                <h6 className="text-[28px] tracking-[-0.28px] leading-9 font-semibold font-playfair h-12 text-center">
                  {item.title}
                </h6>
                <p
                  className={`text-base font-normal leading-[22px] flex-grow text-center font-public mt-4`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col gap-4 mx-8">
        <Button
          className="flex justify-center items-center text-lg text-white leading-6 font-semibold rounded-xl bg-transparent hover:bg-transparent h-11 border border-gray-60"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
     </div>
    </div>
  );
};

export default EnrollDiscover;
