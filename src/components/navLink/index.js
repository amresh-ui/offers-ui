import { IoIosArrowForward } from "react-icons/io";

const NavLink = ({ label, onClick, hideIcon }) => {
  return (
    <div
      className="flex items-center justify-between mb-4 cursor-pointer"
      onClick={onClick}
    >
      <h6 className="text-base font-semibold text-utility-brand-700">{label}</h6>
      {!hideIcon && <IoIosArrowForward className="fill-black-10 text-2xl" />}
    </div>
  );
};

export default NavLink;
