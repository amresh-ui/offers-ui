import React, { useState } from 'react';
import { TermsAndConditionsList } from '../../../constants/productTermsConditions';
import { IoIosArrowForward } from 'react-icons/io';
import TermsConditionBottomSheetComponent from '../../../components/Bottomsheets/termsConditionBottomSheet';

const TermsAndConditionsListScreen = () => {
    const [tnc, setTnc] = useState(false);
    return (
        <>
            <h2 className="font-semibold font-public text-base text-gray-connected-account mt-[38px] pb-2 ml-4">
                Terms and conditions
            </h2>
            <div className="pl-10 pr-4 flex flex-col gp-4 ">
                <ul className="list-disc text-sm text-gray-connected-account font-public">
                    {TermsAndConditionsList.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-8 flex text-start mt-4  ml-4">
                <div className='flex-row items-center'
                    onClick={(e) => {
                        setTnc(true);
                        e?.preventDefault();
                    }}>
                    <p className="text-gray-connected-account text-xs font-public font-semibold underline underline-offset-2" >
                        Read more terms and conditions
                    </p>
                    <IoIosArrowForward className="text-gray-connected-account w-4 h-4 ml-[6px]" />
                </div>
            </div>
            <TermsConditionBottomSheetComponent
                showOverlay={tnc}
                onDismiss={setTnc}
            />
        </>
    );
};

export default TermsAndConditionsListScreen;