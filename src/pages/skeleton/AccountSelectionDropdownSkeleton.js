import Skeleton from "react-loading-skeleton";

const AccountSelectionDropdownSkeleton = () => {
  return (
    <div className="absolute w-full py-[5px] px-[6px] rounded-lg bg-white-100 border border-secondary shadow-shadow-lg z-50">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="flex gap-2 py-[10px] px-[8px] rounded-md"
        >
          <Skeleton borderRadius="4px" width={122} height={22} />
          <Skeleton borderRadius="4px" width={39} height={20} />
        </div>
      ))}
    </div>
  );
};

export default AccountSelectionDropdownSkeleton;
