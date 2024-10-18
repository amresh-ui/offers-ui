const HelpSection = ({ leftIcon, rightIcon, title, onClick }) => {
  return (
    <div className="flex justify-between items-center py-5 cursor-pointer" onClick={onClick}>
      <div className="p-2 rounded-[40px] bg-white-100 border border-gray-20 mr-4.5">
        {leftIcon}
      </div>
      <h4 className="w-full text-base font-semibold leading-[22px]">{title}</h4>
      {rightIcon}
    </div>
  );
};

export default HelpSection;
