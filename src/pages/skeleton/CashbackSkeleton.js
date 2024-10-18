import Skeleton from "react-loading-skeleton";
import CardWrapper from "../../components/cardWrapper";
const CashbackSkeleton = () => {
  return (
      <CardWrapper className="shadow-shadow-xs rounded-2xl">
        <div className="flex justify-start mb-4">
          <Skeleton borderRadius="4px" width={163} height={22} />
        </div>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex justify-between items-center py-2.5">
            <div className="flex gap-4 items-center mr-4">
              <Skeleton circle width={48} height={48} />
              <div className="flex flex-col items-start gap-1">
                <Skeleton borderRadius="4px" width={99} height={16} />
                <Skeleton borderRadius="4px" width={90} height={12} />
                <Skeleton
                  borderRadius="4px"
                  style={{ marginTop: 4 }}
                  width={41}
                  height={12}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <Skeleton borderRadius="4px" width={70} height={24} />
              <Skeleton borderRadius="4px" width={53} height={16} />
            </div>
          </div>
        ))}
      </CardWrapper>
  );
};
export default CashbackSkeleton;
