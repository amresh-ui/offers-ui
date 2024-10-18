import React from 'react';
import BottomSheetComponentWrapper from '../bottomsheetWrapper';

function TermsConditionBottomSheetComponent({ showOverlay, onDismiss }) {
    return (
        <BottomSheetComponentWrapper
            showOverlay={showOverlay}
            onDismiss={onDismiss}
            maxHeightRatio={0.45}
        >
            <h3 className="font-semibold text-md text-dark-blue font-public pb-[4px]">Terms & Conditions</h3>
            <p className='text-secondary text-sm font-public'>
                Lorem ipsum dolor sit amet consectetur. Amet nisi urna feugiat sed sagittis velit viverra convallis ultricies. Enim ullamcorper velit aliquam nisl. Etiam pharetra adipiscing sed morbi ut amet. Enim nullam magna nisl sociis tortor at sed.
            </p>
            <h3 className="font-semibold text-md text-dark-blue mt-5 font-public pb-[4px]">Eligibility</h3>
            <p className='text-secondary text-sm font-public'>
                Lorem ipsum dolor sit amet consectetur. Amet nisi urna feugiat sed sagittis velit viverra convallis ultricies. Enim ullamcorper velit aliquam nisl. Etiam pharetra adipiscing sed morbi ut amet. Enim nullam magna nisl sociis tortor at sed.
            </p>
        </BottomSheetComponentWrapper>
    );
}

export default TermsConditionBottomSheetComponent;

