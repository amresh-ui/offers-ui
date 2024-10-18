import React from 'react';
import NoPurchaseIcon from '../../../../assets/noPurchase.png';
import './style.css';

function NoPurchaseComponent() {
    return (
        <div className='no-purchase-div'>
            <img src={NoPurchaseIcon} alt="Description" className='no-purchase-image' />
            <p className='no-purchase-title'>You haven't made any purchases!</p>
            <p className='no-purchase-subtitle'>Explore Marketplace to make purchases.</p>
        </div>
    );
}

export default NoPurchaseComponent;