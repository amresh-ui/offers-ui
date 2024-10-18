import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { IoIosArrowForward } from "react-icons/io";
import { Button, Image } from "../../components/common";
import DiscoverFirstSmall from "../../assets/DiscoverFirstSmall.png";
import DiscoverSecondSmall from "../../assets/DiscoverSecondSmall.png";
import DiscoverThirdSmall from "../../assets/DiscoverThirdSmall.png";
import DiscoverFourthSmall from "../../assets/DiscoverFourthSmall.png";
import DiscoverFifthSmall from "../../assets/DiscoverFifthSmall.png";

const DiscoverSection = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "discover",
    dotsClass: "slick-dots !static",
    appendDots: (dots) => (
      <div>
        <ul className="mt-1.5 mb-4"> {dots} </ul>
      </div>
    ),
  };
  const discoverScreens = [
    {
      img: DiscoverFirstSmall,
      title: "Discover Exclusive Deals",
    },
    {
      img: DiscoverSecondSmall,
      title: "Shop Smarter, Earn More",
    },
    {
      img: DiscoverThirdSmall,
      title: "Redeem Offers with a Tap",
    },
    {
      img: DiscoverFourthSmall,
      title: "Cashback Rewards in your Pocket",
    },
    {
      img: DiscoverFifthSmall,
      title: "Track Your Savings Over Time",
    },
  ];
  return (
    <Slider className="h-full" {...settings}>
      {discoverScreens.map((item) => (
        <div className="!flex items-center bg-blue-50 max-h-[150px] justify-between" key={item.title}>
          <Image className="xxs:w-[40px] xxs:h-[40px] xs:w-[150px] xs:h-[150px]" alt="discover-icon" src={item.img} />
          <div className="xxs:mx-6 xs:mx-10">
            <span className="xxs:text-sm xs:text-xl leading-6 font-normal text-white">
              {item.title}
            </span>
            <Button
              onClick={() => {
                navigate("/discover");
              }}
              className="flex items-center !text-blue-20 bg-blue-30 rounded-lg mt-3"
            >
              See How it Works
              <IoIosArrowForward className="ml-2" fontSize="16" />
            </Button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default DiscoverSection;
