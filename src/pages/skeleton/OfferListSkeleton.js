import Skeleton from "react-loading-skeleton";

const CardSectionSkeleton = () => {
  return (
    <>
      <div className="mx-4 mb-4">
        <Skeleton borderRadius="4px" width={131} height={20} />
      </div>
      <div className="mx-4 mb-6">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} borderRadius="8px" width={146} height={136} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
const OfferListSkeleton = () => {
  return (
      <div className="h-screen bg-secondary-10">
        <div className="p-4 mb-4 flex justify-between items-center border-secondary">
          <Skeleton width={24} height={24} />
          <Skeleton width={94} height={20} />
          <Skeleton width={24} height={24} />
        </div>
        <div className="mx-4 mb-12">
          <Skeleton borderRadius="1rem" height={142} />
        </div>
        <CardSectionSkeleton />
        <CardSectionSkeleton />
        <div className="flex justify-between mx-4 mb-4">
          <Skeleton borderRadius="4px" width={131} height={20} />
          <Skeleton borderRadius="16px" width={24} height={24} />
        </div>
        <div className="mx-4 mb-12">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-6">
              {Array.from({ length: 7 }, (_, i) => (
                <Skeleton key={i} borderRadius="32px" width={56} height={56} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-4 mb-4">
          <Skeleton borderRadius="4px" width={131} height={20} />
          <Skeleton borderRadius="16px" width={24} height={24} />
        </div>
        <div className="flex flex-col gap-3 mx-4 mb-6">
          <Skeleton borderRadius="8px" height={42} />
          <Skeleton borderRadius="8px" height={36} />
        </div>
        <div className="mx-4 mb-4">
          <Skeleton borderRadius="8px" height={182} />
        </div>
        <div className="flex flex-col gap-6 mx-4 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Skeleton borderRadius="32px" width={48} height={48} />
                <div className="flex flex-col gap-1">
                  <Skeleton borderRadius="4px" width={159} height={20} />
                  <Skeleton borderRadius="4px" width={131} height={16} />
                </div>
              </div>
              <Skeleton borderRadius="32px" width={32} height={32} />
            </div>
          ))}
        </div>
        <div className="mx-4">
          <Skeleton
            style={{ marginBottom: 16 }}
            borderRadius="8px"
            height={36}
          />
        </div>
      </div>
  );
};

export default OfferListSkeleton;
