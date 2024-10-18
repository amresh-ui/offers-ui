import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Flex } from "../common";
import useAppNavigation from "../../hooks/useAppNavigation";

const Header = ({
  title,
  onBack,
  hideBack,
  position,
  onClose,
  closeLabel,
  classes,
  isCashbackOrAllOffersHeader,
  zindex,
}) => {
  const { handleCloseBtnClick } = useAppNavigation();
  // close button should close the webview

  const DisplayTitle = () => {
    if (isCashbackOrAllOffersHeader) {
      return (
        <h6
          className={`text-base leading-[22px] text-white font-public font-regular text-dark-blue ${classes?.title}`}
        >
          {title}
        </h6>
      );
    } else {
      return (
        <h6
          className={`text-lg leading-[22px] text-white font-public font-bold ${classes?.title}`}
        >
          {title}
        </h6>
      );
    }
  };

  return (
    <div className="relative h-[56px] flex items-center justify-between">
      <Flex
        className={`z-${zindex ? zindex : "50"} w-full p-3 items-center ${
          classes?.root ? classes?.root : "bg-blue-50"
        } ${position ? position : "fixed"}`}
      >
        {onBack && !hideBack && (
          <div className={`text-white absolute ${classes?.back}`}>
            <IoIosArrowBack cursor="pointer" onClick={onBack} fontSize="24" />
          </div>
        )}
        <Flex
          className={`justify-center flex-grow flex-shrink basis-full ${classes?.titleContainer}`}
        >
          <DisplayTitle />
        </Flex>
        {onClose && (
          <div
            className={`absolute right-4 cursor-pointer w-6 h-6 flex justify-center items-center ${classes?.close}`}
            onClick={onClose ? onClose : handleCloseBtnClick}
          >
            {closeLabel}
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Header;
