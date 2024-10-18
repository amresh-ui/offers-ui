import React, { useEffect } from 'react';
import './style.css';
import CreditIcon from '../../../assets/cashbackCredit.png'; // Make sure to use the correct path to your icon

const CreditPopup = ({ amount, showAnimation, showCreditPopup }) => {

    useEffect(() => {
        // Lock scroll when the popup is displayed
        if (showCreditPopup) {
            document.body.style.overflow = 'hidden';
            // Unlock scroll when the popup is closed
            return () => {
                document.body.style.overflow = 'auto';
            };
        }
    }, [showCreditPopup]);

    if (!showAnimation) {
        return null;
    }
    return (
        <div className={`popup-overlay ${!showCreditPopup ? 'hidden' : ''}`}>
            <div className="credit-popup-content">
                <img src={CreditIcon} alt="Credit Icon" className="credit-popup-icon" />
                <p className="credit-popup-amount">${amount}</p>
                <p className="credit-popup-status">Credited</p>
            </div>
        </div>
    );
};
export default CreditPopup;
