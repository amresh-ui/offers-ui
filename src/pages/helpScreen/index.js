import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import {
  ExportIcon,
  HelpChatIcon,
  HelpIcon,
  PercentIcon,
} from "../../components/icons";
import HelpSection from "./HelpSection";
import { Divider } from "../../components/common";
import { IoIosArrowForward } from "react-icons/io";
import { faqUrl, helpContact, helpEmail } from "../../constants/helpSection";

const HelpScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white-30 h-screen text-black-10">
      <Header
        title="Help Center"
        onBack={() => {
          navigate(-1);
        }}
        classes={{
          root: "bg-white-30 min-h-14 !items-end pl-5 ",
          title: "!text-black-30",
          back: "!text-black-30",
          close: "!text-black-30",
        }}
      />
      <div className="mt-10 mx-4.5">
        <div className="bg-white-100 py-1 px-4 rounded-2xl border border-gray-20">
          <HelpSection
            leftIcon={
              <HelpIcon className="fill-blue-10" width="18" height="18" />
            }
            rightIcon={<ExportIcon />}
            title="FAQs"
            onClick={() => {
              const anchor = document.createElement("a");
              anchor.href = faqUrl;
              anchor.target = "_blank";
              anchor.rel = "noopener noreferrer";
              document.body.appendChild(anchor);
              anchor.click();
              document.body.removeChild(anchor);
            }}
          />
          <Divider />
          <HelpSection
            leftIcon={<PercentIcon />}
            rightIcon={<IoIosArrowForward className="fill-blue-10" />}
            title="Discover Marketplace"
            onClick={() => {
              navigate("/discover");
            }}
          />
        </div>
      </div>
      <div className="mt-11 flex flex-col items-center">
        <span className="text-sm leading-[22px] font-medium mb-2">
          Contact Us
        </span>
        <div className="text-base font-semibold">
          <span>Email:</span>
          <a
            href={`mailto:${helpEmail}`}
            className="text-blue-10 ml-1"
          >
            {helpEmail}
          </a>
        </div>
        <div className="text-base font-semibold">
          <span>Phone:</span>
          <a href={`tel:${helpContact}`} className="text-blue-10 ml-1">
           {helpContact}
          </a>
        </div>
      </div>
      <div className="flex items-center absolute bottom-[10%] right-0 mr-5">
        <span className="text-sm font-normal leading-[16.45px] text-black-60 mr-3.5">
          Give Feedback
        </span>
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex justify-center items-center">
          <HelpChatIcon />
        </div>
      </div>
    </div>
  );
};
export default HelpScreen;
