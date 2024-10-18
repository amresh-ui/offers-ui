import React from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';

function AccountSelectionScreenBottomSheetComponent({ showOverlay, onDismiss, isAccountInfo, isDontSeeAccount }) {

    let title, description1, description2;

    if (isAccountInfo) {
        title = 'Receive cashback straight to your deposit account';
        description1 = "To receive cashback you'll need to connect your deposit account to marketplace.";
        description2 = 'Lorem ipsum dolor sit amet consectetur. Nulla nulla pretium mi metus. Etiam viverra quis arcu enim at venenatis ipsum amet eget.';
    }
    else if (isDontSeeAccount) {
        title = "Don't see your account?";
        description1 = "To receive cashback you'll need to connect your deposit account to marketplace.";
        description2 = 'The account needs to be a deposit account that is in your name. A credit account is not possible to connect.';
    }

    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.33}
        >
            <h3 className="font-semibold text-md text-dark-blue font-public pb-[4px]">{title}</h3>
            <p className='text-secondary text-sm font-public'>
                {description1}
            </p>
            <p className='text-secondary text-sm font-public pt-4'>
                {description2}
            </p>
        </BottomSheetComponentWrapper>
    );
}

export default AccountSelectionScreenBottomSheetComponent;

