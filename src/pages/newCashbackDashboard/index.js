import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/backIcon.png';
import SegmentedCircularProgressBar from '../../components/cashbackDashboard/CircularProgressBar';
import './style.css'; // Custom styles
import { AppContext } from '../../AppProvider';
import { updateUserDetails } from '../../utils/apiHelper';
import { v4 as uuidv4 } from "uuid";

const NewCashbackDashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { prevCashback, increasedAmount, popularCategoryCashback, totalCashbackAmount, trackingCode } = location.state;


    const [amount, setAmount] = useState(prevCashback);

    const { setUserDetail, userDetail } = useContext(AppContext);

    const [showAnimation, setShowAnimation] = useState(increasedAmount > 0 ? true : false);

    // useEffect(() => {
    //     if (showAnimation) {
    //         handleShowAnimationClick();
    //         const timer = setTimeout(() => {
    //             setShowAnimation(false);
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [showAnimation]);

    useEffect(() => {
        if (showAnimation && increasedAmount > 0) {
            setShowAnimation(true);
            setAmount(prevCashback);

            // Update new cashback amount in API
            resetNewCashbackAmountAPI();

            const timer = setTimeout(() => {
                setShowAnimation(false);
                setAmount(prevAmount => prevAmount + increasedAmount);

                // setUserDetail({
                //     ...userDetail,
                //     NewCashbackAmount: "0"
                // });

            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAnimation, prevCashback, increasedAmount]);

    const handleShowAnimationClick = () => {
        setShowAnimation(true);
        setAmount(prevAmount => prevAmount + increasedAmount);
    };


    const resetNewCashbackAmountAPI = async () => {
        try {
            const response = await updateUserDetails(
                { NewCashbackAmount: "0" },
                userDetail.cisId,
                uuidv4()
            );
            console.log("resetNewCashbackAmountAPI response", response);
            if (response) {
                const { Exceptions, ...rest } = response.data;
                if (Exceptions && Exceptions.Errors.length <= 0) {
                    // Update new cashback amount locally in Context 
                    setUserDetail({
                        ...userDetail,
                        NewCashbackAmount: "0"
                    });
                }
            }
        } catch (error) {
            console.log("resetNewCashbackAmountAPI error", error);
        }
    };

    const HeaderBar = () => (
        <header className="header-div">
            <div className="back-icon" onClick={() => navigate(-1)}>
                <img src={BackIcon} alt="Back Icon" className='back-icon-image' />
            </div>
            <h1 className="title">Dashboard</h1>
        </header>
    );

    return (
        <div className="app-container" >
            <HeaderBar />
            <div className='app-content'>
                <SegmentedCircularProgressBar
                    size={250}
                    currentAmount={amount}
                    totalCashbackAmount={totalCashbackAmount}
                    showAnimation={showAnimation}
                    increasedAmount={increasedAmount?.toFixed(2)}
                    popularCategoryCashback={popularCategoryCashback}
                />
            </div>

        </div>
    );
};

export default NewCashbackDashboard;
