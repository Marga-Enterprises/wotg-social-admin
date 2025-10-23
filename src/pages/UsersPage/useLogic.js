// react
import { useState, useRef, useCallback } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// cookies
import Cookies from 'js-cookie';

export const useLogic = (navigate, location) => {
  const dispatch = useDispatch();
  const loadingRef = useRef(false);

  // ✅ Get logged-in user directly from cookies
  let currentUser = null;
  try {
    const cookieData = Cookies.get('account');
    if (cookieData) currentUser = JSON.parse(cookieData);
  } catch (err) {
    console.error('❌ Failed to parse user cookie:', err);
  }

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

  // 🧠 Handle Filter Changes
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

  // Handle Create Private Chatroom
  const handleCreateChatroom = useCallback(
    async (targetUserId) => {
      if (!currentUser?.id) {
        alert('Please login first.');
        return;
      }

      try {
        const payload = {
          participants: [currentUser.id, targetUserId],
          target_user_id: targetUserId,
        };

        const res = await dispatch(marga.chatroom.createChatroomAction(payload));

        if (res?.success && res?.data?.id) {
          const chatId = res.data.id;
          const baseUrl =
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/chat'
              : 'https://community.wotgonline.com/chat';

          const chatUrl = `${baseUrl}?chat=${chatId}`;
          const tabName = `chat_${chatId}`;

          // ✅ Always try to open new tab (unique per chat)
          const newTab = window.open(chatUrl, tabName, 'noopener,noreferrer');

          // ✅ Popup blocked fallback: open manually without changing admin page
          if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
            // create a temporary link and trigger click (no redirect in admin)
            const tempLink = document.createElement('a');
            tempLink.href = chatUrl;
            tempLink.target = '_blank';
            tempLink.rel = 'noopener noreferrer';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
          }

          // ✅ Just refresh admin page — no URL change
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.error('❌ Create chatroom error:', err);
      }
    },
    [dispatch, currentUser]
  );


  return {
    loading,
    users,
    pageDetails,
    handleFetchUsers,
    handleFilterChange,
    handleCreateChatroom,
  };
};
