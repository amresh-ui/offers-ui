import { Image } from "../common";
import HeartComponent from "../heartComponent";

const Card = ({
  size,
  img,
  logoImg,
  title,
  desc,
  onClick,
  onFavClick,
  isFavorite,
  classes,
}) => {
  switch (size) {
    case "large":
      return (
        <div
          className="border border-tertiary rounded-lg min-w-[311px] overflow-hidden shadow-shadow-xs"
          onClick={onClick}
        >
          <div className="relative -mt-1 flex justify-center">
            <Image
              className="w-full max-h-fit !object-contain object-top"
              src={img}
              alt="brand-logo"
            />
            <Image
              className="w-[38px] h-[38px] !object-contain rounded-3xl absolute bottom-1 left-3 bg-white-100 border border-gray-200"
              src={logoImg}
              alt="brand-logo"
            />
          </div>
          <div
            className={`px-2 py-3 flex items-center justify-between gap-[5px] border-t-[0.5px] border-secondary ${classes?.descLargeRoot}`}
          >
            <div className="flex flex-col gap-0.5 xxs:max-w-20 xs:max-w-56 md:max-w-full">
              <h3 className="text-base text-primary-900 font-semibold truncate">
                {title}
              </h3>
              <p className="text-xs text-secondary font-normal truncate">
                {desc}
              </p>
            </div>
            <HeartComponent onHeartClick={onFavClick} isFavorite={isFavorite} />
          </div>
        </div>
      );
    case "medium":
      return (
        <div
          className="border border-tertiary rounded-lg w-[146px] h-[144px] overflow-hidden shadow-shadow-xs mb-[1px]"
          onClick={onClick}
        >
          <div className="relative -mt-1">
            <Image
              className="w-[146px] h-auto !object-contain"
              src={img}
              alt="brand-logo"
            />
            <Image
              className="w-8 h-8 rounded-3xl border border-gray-200 absolute -bottom-4 right-3 bg-white-100 !object-contain"
              src={logoImg}
              alt="brand-logo"
            />
          </div>
          <div className="px-2 py-1 flex flex-col gap-0.5 border-t-[0.5px] border-secondary xxs:max-w-20 xs:max-w-56 md:max-w-full">
            <h3 className="text-sm text-primary-900 font-semibold truncate mt-2">
              {title}
            </h3>
            <p className="text-xs text-secondary font-normal truncate">
              {desc}
            </p>
          </div>
        </div>
      );
    case "small":
      return (
        <div
          className={`flex gap-4 justify-between items-center px-2 py-3 border-tertiary ${classes?.smallRoot}`}
          onClick={onClick}
        >
          <div className="flex gap-4 items-center">
            <Image
              className={`w-12 h-12 !object-contain rounded-[100px] border border-tertiary ${classes?.img}`}
              src={logoImg}
              alt="brand-logo"
            />
            <div className={`flex flex-col gap-0.5 xxs:max-w-20 xs:max-w-56 md:max-w-full ${classes?.descSmallRoot}`}>
              <h3 className="text-base text-primary-900 font-semibold truncate">
                {title}
              </h3>
              <p className="text-xs text-secondary font-normal truncate">
                {desc}
              </p>
            </div>
          </div>

          <HeartComponent onHeartClick={onFavClick} isFavorite={isFavorite} />
        </div>
      );
    default:
      return null;
  }
};

export default Card;
