import SectionHeader from "./SectionHeader";

const CashbackNoData = ({title, onClick}) => {
  return (
    <div className="p-4 rounded-2xl shadow-shadow-xs bg-white-100">
      <div className="flex flex-col gap-4">
        <SectionHeader title={title} onClick={onClick} />
        <div className="flex flex-col gap-1.5 items-center">
          <h4 className="text-base leading-[22px] font-semibold text-primary-900">No data available yet</h4>
          <span className="text-sm font-normal text-secondary">Redeem offers</span>
        </div>
      </div>
    </div>
  );
};

export default CashbackNoData