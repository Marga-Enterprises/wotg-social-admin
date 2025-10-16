// react
import { useState, useRef, useCallback } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

export const useLogic = () => {
    // hooks 
    const dispatch = useDispatch();
    const loadingRef = useRef(false);

    // states
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });


    // callback functions 

    // fetch users with filters and pagination
    const handleFetchUsers = useCallback(
        async (pageIndex = 1, search = '', guestFilter = 'both', dateFrom = '', dateTo = '') => {
            if (loadingRef.current) return;
            loadingRef.current = true;
            setLoading(true);

            try {
                const res = await dispatch(
                    marga.user.fetchUsersAction({
                        pageIndex,
                        pageSize: 20,
                        search,
                        guestFilter,
                        dateFrom,
                        dateTo,
                    })
                );

                if (res?.success && res.data) {
                    const { users = [], totalItems, currentPage, totalPages } = res.data;
                    setUsers(users);
                    setPageDetails({
                        totalRecords: totalItems || 0,
                        pageIndex: currentPage || 1,
                        totalPages: totalPages || 0,
                    });
                }
            } catch (err) {
                console.error('❌ Fetch users error:', err);
            } finally {
                loadingRef.current = false;
                setLoading(false);
            }
        },
        [dispatch]
    );

    // return values
    return {
        loading,
        users,
        pageDetails,
        handleFetchUsers,
    }
}