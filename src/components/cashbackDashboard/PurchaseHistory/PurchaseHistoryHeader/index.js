
import React, { memo, useCallback } from 'react';
import FilterIcon from '../../../../assets/filterIcon.png';
import { SearchIcon } from "../../../icons";
import Dropdown from '../../Dropdown';
import '../style.css';

const PurchaseHistoryHeader = memo(({ purchases, searchText, setSearchText, selectedFilter, handleSetSelectedFilter, setIsFilterBottomSheetOpen }) => {
    const onChange = useCallback((e) => {
        setSearchText(e.target.value);
    }, [setSearchText]);

    return (
        <div className="header">
            <p className='header-title'>All cashback activity</p>
            {purchases?.length ?
                <div className='flex flex-row items-center'>
                    <span className="absolute flex pl-3 text-black-30 mb-1">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 px-3 h-10 mb-3 rounded-lg placeholder-black-50 border border-gray-40 focus:outline-none text-sm"
                        placeholder={"Search for stores"}
                        value={searchText}
                        onChange={onChange}
                    />
                </div> : null}
            {purchases?.length ? (
                <div className="filters">
                    <Dropdown
                        selectedOption={selectedFilter}
                        setSelectedOption={handleSetSelectedFilter}
                        isDisabled={purchases.length === 0}
                    />
                    <button
                        className="flex-row"
                        disabled={purchases.length === 0}
                        onClick={() => setIsFilterBottomSheetOpen(true)}
                    >
                        Filters
                        <img src={FilterIcon} alt="Filter" className='filterIcon' />
                    </button>
                </div>
            ) : null}
        </div>
    );
});


export default PurchaseHistoryHeader;