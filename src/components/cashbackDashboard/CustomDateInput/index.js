import React, { useRef } from 'react';
import './style.css';
import { formatDateFilterBottomSheet } from '../../../utils/dateFormat';

function CustomDateInput({ label, value, onChange }) {
    const hiddenDateInputRef = useRef(null);

    const handleWrapperClick = () => {
        if (hiddenDateInputRef?.current) {
            hiddenDateInputRef.current.focus();
        }
    };

    return (
        <div className="custom-date-input">
            <label>{label}</label>
            <div className="date-input-wrapper" onClick={handleWrapperClick}>
                <input
                    type="text"
                    className="date-input"
                    value={value ? formatDateFilterBottomSheet(new Date(value)) : ''}
                    placeholder="Choose a date"
                    readOnly
                />
                <input
                    type="date"
                    ref={hiddenDateInputRef}
                    className="hidden-date-input"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default CustomDateInput;
