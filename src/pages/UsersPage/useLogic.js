// react
import { useState, useRef, useCallback } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

export const useLogic = (navigate, location) => {
  const dispatch = useDispatch();
  const loadingRef = useRef(false);

  // 🧠 States
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    totalRecords: 0,
    pageIndex: 1,
    totalPages: 0,
  });

  // 🧩 Fetch Users with filters
  const handleFetchUsers = useCallback(
    async (
      pageIndex = 1,
      search = '',
      guestFilter = 'both',
      dateFrom = '',
      dateTo = ''
    ) => {
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

  // 🧠 Handle Filter Changes (moved from Page.jsx)
  const handleFilterChange = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(location.search);
      params.set('page', '1'); // reset to first page

      // Apply filters
      if (newFilters.search) params.set('search', newFilters.search);
      else params.delete('search');

      params.set('guestAccount', newFilters.guestAccount || 'both');

      if (newFilters.dateFrom) params.set('dateFrom', newFilters.dateFrom);
      else params.delete('dateFrom');

      if (newFilters.dateTo) params.set('dateTo', newFilters.dateTo);
      else params.delete('dateTo');

      // Navigate only when triggered properly
      if (
        newFilters.trigger === 'manual' ||
        newFilters.trigger === 'auto' ||
        newFilters.trigger === 'reset'
      ) {
        navigate(`?${params.toString()}`);
      }
    },
    [navigate, location.search]
  );

  return {
    loading,
    users,
    pageDetails,
    handleFetchUsers,
    handleFilterChange,
  };
};
