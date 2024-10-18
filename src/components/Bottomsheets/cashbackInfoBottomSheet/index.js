import React from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';

function CashbackInfoBottomSheetComponent({ showOverlay, onDismiss }) {
    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.25}
        >
            <h3 className="font-semibold text-md text-dark-blue font-public pb-[4px]">Total cashback </h3>
            <p className='text-secondary text-sm font-public'>
                Total cashback is the total of all cashback you're received over the
                time you've been enrolled with Marketplace
            </p>
        </BottomSheetComponentWrapper>
    );
}

export default CashbackInfoBottomSheetComponent;

