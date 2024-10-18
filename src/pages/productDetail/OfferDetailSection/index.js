import React from 'react';
import { getFlatOrPercentAmount } from '../../../utils/amountHelper';
import Loader from '../../../components/loader';


const OfferDetailsSection = ({ state }) => {
  return (
    <div className='mx-4'>
      {state.isLoading || state?.detailData?.length ? <p className="font-semibold font-public text-[18px] text-dark-blue mt-8 pb-4">
        Offer details
      </p> : null}

      {state?.detailData?.length ? <p className='pb-4 text-secondary font-public text-base'>
        Visit site and shop from any of below categories to claim the offer.
      </p> : null}

      <div className="flex h-auto flex-col gap-[12px] left-16 top-547 w-358 h-172">
        {state.isLoading ? (
          <Loader />
        ) : (
          state?.detailData?.map((item, i) =>
            parseFloat(item?.Amount) === 0 ? null : (
              <div
                key={`product-` + i}
                className="flex justify-between gap-2"
              >
                <span className="text-base font-normal font-public text-secondary w-[85vw] leading-17 ">
                  {item?.Name}
                </span>
                <span className="text-sm font-public font-bold flex-grow leading-17 text-rightflex-shrink-0">
                  {getFlatOrPercentAmount(item?.Kind, item?.Amount)}
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default OfferDetailsSection;