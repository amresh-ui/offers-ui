import React from 'react';
import './style.css';
import AltImage from '../../../../assets/shopping.jpg'; // Ensure you have a fallback image
import { formatDateWithFullMonthName } from '../../../../utils/dateFormat';

const PurchaseItem = ({ purchase }) => {
  return (
    <div className="purchase-item">
      <div className="brand-logo-div">
        <img
          className="brand-logo"
          src={purchase?.Logo || AltImage}
          onError={(e) => {
            e.target.src = AltImage;
          }}
          alt={purchase?.Name}
        />
      </div>
      <div className="purchase-info">
        <h3>{purchase?.Name}</h3>
        {purchase?.EventDate && (
          <span className="date font-public">
            {formatDateWithFullMonthName(purchase.EventDate)}
          </span>
        )}
        <p className="amount font-public mt-[4px]">${parseFloat(purchase?.SaleAmount)?.toFixed(2)}</p>
      </div>
      <div className="purchase-details">
        {purchase?.Status === 'PENDING' && <p className="status">Pending</p>}
        <div className="cashback-flex-row items-center"
          style={{ color: purchase?.Status === 'PENDING' ? '#475467' : '#079455' }}
        >
          <p className="align-top font-public" style={{ paddingBottom: 'inherit' }}>+</p>
          <p className="font-public">${parseFloat(purchase?.Amount)?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;
