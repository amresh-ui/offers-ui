// src/components/FilterBottomSheetComponent.js

import React, { useEffect, useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import InfoIcon from '../../../assets/infoIconFilterBottomSheet.png';
import './style.css';
import { PERIODS } from '../../../constants/commission';
import CustomDateInput from '../CustomDateInput';

function FilterBottomSheetComponent({
    isFilterBottomSheetOpen,
    handleFilterApply,
    onDismiss,
    selectedPeriod,
    customDateFrom,
    customDateTo,
    setCustomDateFrom,
    setCustomDateTo,
    setSelectedPeriod,
    setSelectedPeriodTo,
    setSelectedPeriodFrom
}) {


    const today = new Date();

    const handleApply = () => {
        // Handle the apply action here
        if (selectedPeriod) {
            let selectedPeriodFrom = '';
            let selectedPeriodTo = formatDate(today);

            if (selectedPeriod === 'last_month') {
                const oneMonthAgo = new Date(today);
                oneMonthAgo.setMonth(today.getMonth() - 1);
                selectedPeriodFrom = formatDate(oneMonthAgo);
            }
            else if (selectedPeriod === 'last_3_months') {
                const threeMonthsAgo = new Date(today);
                threeMonthsAgo.setMonth(today.getMonth() - 3);
                selectedPeriodFrom = formatDate(threeMonthsAgo);
            }
            else if (selectedPeriod === 'last_6_months') {
                const sixMonthsAgo = new Date(today);
                sixMonthsAgo.setMonth(today.getMonth() - 6);
                selectedPeriodFrom = formatDate(sixMonthsAgo);
            }
            handleFilterApply(true, selectedPeriodFrom, selectedPeriodTo);
        } else {
            if (!customDateFrom || !customDateTo) {
                alert('Please select a period or enter custom date range');
            } else {
                handleFilterApply(false, customDateFrom, customDateTo);
            }
        }
    };

    const handleReset = () => {
        setSelectedPeriod('');
        setCustomDateFrom('');
        setCustomDateTo('');
        setSelectedPeriodTo('');
        setSelectedPeriodFrom('');
        handleFilterApply('', '');
    };

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}/${mm}/${dd}`;
    };


    useEffect(() => {

        if (selectedPeriod) {
            setCustomDateFrom('');
            setCustomDateTo('');
        }

    }, [selectedPeriod]);

    return (
        <BottomSheet
            open={isFilterBottomSheetOpen}
            onDismiss={() => onDismiss()}
            snapPoints={({ maxHeight }) => [maxHeight * 0.7]}
        >
            <div className="bottom-sheet-content">
                <div className="bottomsheet-header">
                    <h2>Filters</h2>
                    <button className="close-button" onClick={onDismiss}>✖</button>
                </div>
                <div className="content">
                    <div className="sidebar">
                        <h3>Statement Period</h3>
                    </div>
                    <div className="main-content">
                        <div className='main-content-header'>
                            <img src={InfoIcon} alt="Info Icon" />
                            <p>The period is limited to last 1 year</p>
                        </div>
                        <div className="filter-options">
                            {
                                PERIODS.map(period => (
                                    <label key={period.value}>
                                        <input
                                            type="radio"
                                            value={period.value}
                                            checked={selectedPeriod === period.value}
                                            onChange={(e) => setSelectedPeriod(e.target.value)}
                                        />
                                        {period.label}
                                    </label>
                                ))
                            }
                        </div>
                        <p className='custom-date'>Custom Date</p>
                        <div className="date-inputs">
                            <CustomDateInput
                                label="From"
                                value={customDateFrom}
                                onChange={(e) => {
                                    setCustomDateFrom(e.target.value);
                                    setSelectedPeriod('');
                                    setSelectedPeriodTo('');
                                    setSelectedPeriodFrom('');
                                }}
                            />
                            <CustomDateInput
                                label="To"
                                value={customDateTo}
                                onChange={(e) => {
                                    setCustomDateTo(e.target.value);
                                    setSelectedPeriod('');
                                    setSelectedPeriodTo('');
                                    setSelectedPeriodFrom('');
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button className="apply-button" onClick={handleApply}>Apply</button>
                    <button className="cancel-button" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </BottomSheet>
    );
}

export default FilterBottomSheetComponent;
