import React, { useEffect } from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';
import CashbackMilestoneImage from '../../../assets/CashBackMilestone.png';

function MileStoneCashbackBottomSheetComponent({ showOverlay, onDismiss }) {
    let newAmount = {
        integer: 100,
        decimal: 50
    };

    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.7}
            className='bg-blue-10'
            isWhiteIcon={true}
        >

            <div className="flex justify-center item-center -mt-4 ">
                <img src={CashbackMilestoneImage} alt='cashback milestone' />
            </div>

            <div className="flex text-white justify-center mb-4 font-public">
                <span className="align-super text-sm font-bold">$</span>
                <h2 className="text-2xl font-bold leading-[24px]">{newAmount?.integer || 0}</h2>
                <span className="align-super text-sm font-bold">
                    {newAmount?.decimal || 0}
                </span>
            </div>

            <p className='text-white text-base font-public text-center font-regular'>
                Congratulations Maria! You've earned your first cashback.
            </p>
            <p className='text-white text-base font-public text-center font-regular pt-4'>
                View it now or learn more about how to track savings over time.
            </p>

            <div className='flex items-center justify-center bg-white-100 rounded-[8px] py-2 mt-[40px]'>
                <p className='text-base font-public font-semibold text-utility-brand-600'>View more</p>
            </div>
            <div className='flex items-center bg-blue-10 py-2 justify-center rounded-[8px] mt-[6px] border border-white'>
                <p className='text-white text-base font-public font-semibold'>Learn how it works</p>
            </div>
        </BottomSheetComponentWrapper>
    );
}

export default MileStoneCashbackBottomSheetComponent;

