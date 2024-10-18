import React from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';
import { MarketingPromoInfoList } from '../../../constants/productTermsConditions';

function MarketingPromotionBottomSheetComponent({ showOverlay, onDismiss }) {
    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.5}
        >
            <h3 className="font-semibold text-md text-dark-blue font-public pb-[4px]">Marketing promotions</h3>
            <p className='text-secondary text-sm font-public'>
                By accepting marketing promotions, you consent to receiving newsletters and other marketing promotion
                emails. You'll gain access to new deals and updates.
            </p>
            <div className="pl-5 pr-4 flex flex-col gp-1 my-4">
                <ul className="list-disc text-sm text-secondary font-public">
                    {MarketingPromoInfoList.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <p className='text-secondary text-sm font-public'>
                Stay connected and elevate your shopping experience with the latest promotions!
            </p>
        </BottomSheetComponentWrapper>
    );
}

export default MarketingPromotionBottomSheetComponent;

