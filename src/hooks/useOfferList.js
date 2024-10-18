// useOfferList.js
import { useState, useEffect, useContext } from 'react';
import { getOfferListApi } from '../utils/apiHelper';
import { updateOffersWithFavorites } from '../utils/utils';
import { AppContext } from '../AppProvider';

const useOfferList = () => {
    const [loading, setLoading] = useState(true);
    const {
        allData,
        setAllData,
        setCategoryData,
        categoryData, 
        userDetail,
    } = useContext(AppContext);

    useEffect(() => {
        const fetchOfferList = async () => {
            try {
                const { data } = await getOfferListApi();
                if (data.Offers.length) {
                    const sortData = data.Offers.sort((a, b) => a.MerchantId - b.MerchantId);
                    const bettinaMerchantId = '107370'; // bettina
                    const caribbeanMerchantId = '5509619'; // caribbean

                    const betinaItem = sortData?.filter(item => item.MerchantId === bettinaMerchantId) || [];
                    const caribbeanItem = sortData?.filter(item => item.MerchantId === caribbeanMerchantId) || [];

                    const remainingItems = sortData.filter(item => item.MerchantId !== bettinaMerchantId && item.MerchantId !== caribbeanMerchantId);

                    // Combine the arrays with itemsToMoveToTop at the beginning
                    const sortedData = [...betinaItem, ...caribbeanItem, ...remainingItems];

                    setAllData(sortedData);
                    setCategoryData(updateOffersWithFavorites(sortedData, userDetail));
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching offer list:", err);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        if (allData?.length === 0) {
            fetchOfferList();
        }else{
            setLoading(false);
        }
    }, []);

    return { allData, categoryData, loading };
};

export default useOfferList;