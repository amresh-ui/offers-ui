import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

const NoFavoriteRecordFound = () => {
  const navigate = useNavigate();

  return (
    <div className='app-content-card-view'>
      <div className='card-view-fav bg-orange-10 justify-center items-center justify-center flex-col'>
        <p className="text-lg font-public font-semibold text-dark-blue">
          Nothing saved yet
        </p>
        <p className="text-sm font-public font-normal mt-[6px] text-center">
          Follow stores you like for easy access to offers and updates
        </p>
        <div className="bg-blue-10 w-full rounded-lg py-2 items-center justify-center flex mt-[20px]"
          onClick={() => {
            navigate("/category");
          }}>
          <p className="text-white font-public font-semibold text-size-14">Browse offers</p>
        </div>
      </div>
    </div>
  );
};

export default NoFavoriteRecordFound;
