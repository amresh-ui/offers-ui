import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { maskAccountNumber } from "../../utils/maskedAccount";
import AccountSelectedCheckIcon from "./AccountSelectedCheck";
import AccountSelectionDropdownSkeleton from "../../pages/skeleton/AccountSelectionDropdownSkeleton";

const SelectField = ({
  options,
  value,
  onChange,
  disabled,
  accountDesc,
  isApiLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const DropDownComponent = () => {
    return (
      <div className="absolute w-full mt-1.5 px-[6px] py-[5px] border border-secondary bg-white-100 rounded-[8px] shadow-sm max-h-[36vh] min-h-[140px] overflow-y-auto z-50">
        {options.map((option) => (
          <div
            key={option.value+option.accountDesc}
            className={`px-[8px] py-[10px] cursor-pointer focus:ring-blue-10 focus:border-blue-10 rounded-[6px] text-primary-900 
          font-public text-base leading-[22px] font-semibold 
          ${
            maskAccountNumber(option.value) === value
              ? "bg-tertiary"
              : "bg-white-100 hover:bg-blue-30"
          }`}
            onClick={() => handleOptionClick(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center max-w-[15rem] overflow-hidden">
                <span className="truncate">{option.accountDesc}</span>
                <span className="text-gray-connected-account font-normal pl-2 text-sm flex-shrink-0">
                  {maskAccountNumber(option.item?.AcctId)}
                </span>
              </div>
              <div className="ml-2">
                {maskAccountNumber(option.value) === value ? (
                  <AccountSelectedCheckIcon />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`w-full px-3.5 py-2.5 flex justify-between items-center ${
          disabled ? "bg-gray-10" : "bg-white-100"
        } 
        ${
          isOpen ? "border-2 border-blue-10" : "border-1 border border-gray-300"
        }
        text-quaternary text-left focus:outline-none border  rounded-[8px] shadow-sm`}
        disabled={disabled}
      >
        {!value ? (
          <span
            className={`text-base leading-[22px] font-normal text-quaternary`}
          >
            Select deposit account
          </span>
        ) : (
          <div className="flex items-center max-w-[16rem] overflow-hidden text-primary-900 font-public text-base leading-[22px] font-semibold">
            <span className="truncate">{`${accountDesc}`}</span>
            <span className="text-gray-connected-account font-normal pl-2 text-sm flex-shrink-0">
              {value}
            </span>
          </div>
        )}
        <IoIosArrowDown className="text-quaternary" />
      </button>
      {isOpen &&
        (isApiLoading ? (
          <div className="mt-1.5">
            <AccountSelectionDropdownSkeleton />
          </div>
        ) : (
          <DropDownComponent />
        ))}
    </div>
  );
};

export default SelectField;
