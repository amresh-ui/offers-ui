import { IoIosCloseCircle } from "react-icons/io";
import PopularIcon from "../../../assets/popularIcon.png";
import { Flex, Image } from "../../common";

const HeaderBar = ({ onClose }) => {
  return (
    <Flex className="bg-black-20 rounded-3xl justify-center !items-center  text-blue-100">
      <Image
        className="!object-contain w-full h-9"
        alt="popular-icon"
        src={PopularIcon}
      />
      <IoIosCloseCircle onClick={onClose} fontSize="3.5rem" />
    </Flex>
  );
};

export default HeaderBar;
