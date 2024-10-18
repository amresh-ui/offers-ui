import Skeleton from "react-loading-skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mx-4 mt-8">
      <Skeleton borderRadius="4px" height={24} />
      <Skeleton borderRadius="4px" height={44} />
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-full">
            <Skeleton borderRadius="4px" height={22} />
          </div>
          <Skeleton borderRadius="4px" width={36} height={22} />
        </div>
      ))}
    </div>
  );
};
export default ProductDetailSkeleton;
