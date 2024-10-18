import React, { useRef, useState, useEffect } from 'react';
import DropDownIcon from '../../../assets/dropDown.png'; // Ensure you have the icon
import './style.css';
import { COMMISSION_STATUS } from '../../../constants/commission';

const Dropdown = ({ selectedOption, setSelectedOption, isDisabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>

            <button className={`dropdown-toggle flex-row ${isDisabled ? 'disabled' : ''}`} onClick={toggleDropdown} disabled={isDisabled}>
                {selectedOption?.value}
                <img src={DropDownIcon} alt="Dropdown" className='dropDownIcon' />
            </button>

            {
                isOpen && (
                    <ul className="dropdown-menu">
                        {COMMISSION_STATUS.map((option) => (
                            <li key={option.status} onClick={() => handleOptionClick(option)}>
                                {option.value}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div >
    );
};

export default Dropdown;
