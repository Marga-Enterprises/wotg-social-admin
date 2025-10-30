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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  // 🧠 Handle Create Private Chatroom + Send Message
  const handleCreateChatroomAndSendMessage = useCallback(
    async (content, targetUserId) => {
      if (!currentUser?.id) {
        alert("Please login first.");
        return;
      }

      try {
        const payload = {
          participants: [currentUser.id, targetUserId],
          target_user_id: targetUserId,
        };

        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/chat"
            : "https://community.wotgonline.com/chat";

        const res = await dispatch(marga.chatroom.createChatroomAction(payload));

        // Chatroom variables
        let chatId, chatUrl, tabName;

        if (res?.success && res?.data?.id) {
          // 🆕 Chatroom successfully created
          chatId = res.data.id;
          console.log("✅ New chatroom created:", chatId);
        } else {
          // ♻️ Chatroom already exists
          chatId = res?.error?.data?.chatroomId;
          console.log("ℹ️ Chatroom already exists:", chatId);
        }

        // 🧠 Construct chat URL + tab name
        chatUrl = `${baseUrl}?chat=${chatId}`;
        tabName = `chat_${chatId}`;

        // ✉️ Send message to chatroom (always)
        await dispatch(
          marga.message.sendMessageAction({
            chatroomId: chatId,
            senderId: currentUser.id,
            content,
            type: "text",
          })
        );

        // 🔗 Open chat in a new tab
        const openChatTab = () => {
          const newTab = window.open(chatUrl, tabName, "noopener,noreferrer");

          if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
            // 🧩 Fallback if popup is blocked
            const tempLink = document.createElement("a");
            tempLink.href = chatUrl;
            tempLink.target = "_blank";
            tempLink.rel = "noopener noreferrer";
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
          }
        };

        openChatTab();

        // reload page to reflect any changes
        // EsetTimeout(() => { window.location.reload();E}, 500);
        console.log("✅ Message sent and chat opened:", chatUrl);
      } catch (err) {
        console.error("❌ Error creating or sending message:", err);
      }
    },
    [dispatch, currentUser]
  );

  // handle show message modal
  const handleShowMessageModal = useCallback((userId) => {
    setSelectedUserId(userId);
    setMessageModalOpen(true);
  }, []);

  // handle close message modal
  const handleCloseMessageModal = useCallback(() => {
    setSelectedUserId(null);
    setMessageModalOpen(false);
  }, []);


  return {
    loading,
    users,
    pageDetails,
    selectedUserId,
    messageModalOpen,
    handleFetchUsers,
    handleFilterChange,
    handleShowMessageModal,
    handleCloseMessageModal,
    handleCreateChatroomAndSendMessage,
  };
};
