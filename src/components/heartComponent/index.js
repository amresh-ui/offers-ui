import { HeartIcon } from "../icons";

const HeartComponent = ({ isFavorite, onHeartClick, isProductDetail }) => {
    return (
        <div
            className={`${isProductDetail ? 'w-10 h-10' : 'w-8 h-8'} rounded-lg bg-secondary flex justify-center items-center z-1`}
            onClick={(e) => {
                e?.stopPropagation();
                onHeartClick()
            }}
        >
            <HeartIcon color={isFavorite ? "#2278C9" : ""} isProductDetail={isProductDetail}/>
        </div>
    );
};

export default HeartComponent;
