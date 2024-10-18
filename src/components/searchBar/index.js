import { Fragment, useEffect, useRef, useState } from "react";
import { SearchIcon } from "../icons";
import { Button, Image } from "../common";
import Logo from "../../assets/Logo.png";
import useClickOutside from "../../hooks/useClickOutside";

const SearchBar = ({
  value,
  onChange,
  placeholder,
  classes,
  onItemClick,
  data,
  isDropdown,
  onMoreClick,
  handleClickOutside,
  defaultFocus,
}) => {
  const inputRef = useRef(null);
  const clickRef = useRef();

  useEffect(() => {
    if (inputRef.current && defaultFocus) {
      inputRef.current.focus();
    }
  }, []);

  useClickOutside(clickRef, handleClickOutside);

  const DisplayOfferListDropdown = () => {
    return (
      <div className="grid grid-cols-1 gap-3 absolute shadow-lg my-1 bg-white-100 overflow-auto overflow-y-auto xxs:w-[80%] xs:w-[92%] sm:w-[95%] rounded-lg">
        {data.length > 0 ? (
          <div>
            {data.slice(0, 7).map((item) => (
              <Fragment key={item.Name}>
                <div
                  className="flex items-center p-2 w-95"
                  onClick={() => onItemClick(item)}
                >
                  <Image
                    src={
                      item.Img && item.Img.length > 0 ? item.Img[0].URL : Logo
                    }
                    alt={item.Name}
                    className="w-8 h-8 mr-2"
                  />
                  <p>{item.Name}</p>
                </div>
              </Fragment>
            ))}
            {data.length > 7 && (
              <Button
                className="flex items-center justify-center w-full border-t border-gray-40"
                onClick={onMoreClick}
                variant="link"
                type={isDropdown ? "submit" : "button"}
              >
                <span className="text-sm font-medium">{`+${
                  data.length - 7
                } More`}</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center p-2">
            <p className="text-gray-500">No results found.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={clickRef}
      className={`bg-white-100 fixed w-full z-10 px-4 pt-4 pb-2 mt-0 ${classes?.root}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (onMoreClick) {
            onMoreClick();
          }
        }}
      >
        <span className="absolute inset-y-0 left-4 mt-1.5 pl-4 flex items-center">
          <SearchIcon width="15" height="15" />
        </span>
        <input
          type="text"
          className="w-full py-2.5 px-3.5 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black-50"
          placeholder={placeholder || "Search for stores"}
          value={value}
          onChange={onChange}
          spellCheck={false}
          autoCorrect="off"
          ref={inputRef}
        />
        {value?.length && isDropdown ? DisplayOfferListDropdown() : null}
      </form>
    </div>
  );
};
export default SearchBar;
