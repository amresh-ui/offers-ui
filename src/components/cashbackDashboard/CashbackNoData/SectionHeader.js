import InfoIcon from '../../../assets/infoIcon.png';

const SectionHeader = ({title, onClick}) => {
  return (
    <div className="flex justify-between items-center w-full -mb-2">
      <div className="flex items-center">
        <h3 className="text-base leading-[22px] font-semibold text-tertiary">
          {title}
        </h3>
      </div>
      <div className="flex items-center">
        <span onClick={onClick}>
          <img src={InfoIcon} alt="info" className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

export default SectionHeader;
