import React from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';
import FirstCashbackImage from '../../../assets/FirstCashback.png';

function FirstCashbackBottomSheetComponent({ showOverlay, onDismiss }) {
    let newAmount = {
        integer: 1,
        decimal: 50
    };

    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.7}
        >

            <div className="flex justify-center item-center">
                <img src={FirstCashbackImage} alt='cashback milestone' height={113} width={158}/>
            </div>

            <div className="flex text-utility-brand-600 justify-center mb-4 mt-6 font-public">
                <span className="align-super text-sm font-bold">$</span>
                <h2 className="text-2xl font-bold leading-[24px]">{newAmount?.integer || 0}</h2>
                <span className="align-super text-sm font-bold">
                    {newAmount?.decimal || 0}
                </span>
            </div>

            <p className='text-black-30 text-base font-public text-center font-regular'>
                Congratulations Maria! You've earned your first cashback.
            </p>
            <p className='text-black-30 text-base font-public text-center font-regular pt-4'>
                View it now or learn more about how to track savings over time.
            </p>

            <div className='flex items-center justify-center bg-blue-10 rounded-[8px] py-2 mt-[40px]'>
                <p className='text-base font-public font-semibold text-white'>View more</p>
            </div>
            <div className='flex items-center bg-secondary py-2 justify-center rounded-[8px] mt-[6px]'>
                <p className='text-secondary text-base font-public font-semibold'>Learn how it works</p>
            </div>
        </BottomSheetComponentWrapper>
    );
}

export default FirstCashbackBottomSheetComponent;

