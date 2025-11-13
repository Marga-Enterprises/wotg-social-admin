// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// mui
import { Box, Stack, Typography } from '@mui/material';

// styles
import styles from './styles';

// custom hook
import { useLogic } from './useLogic';

// sections
import UsersTableSection from '@sections/UsersPageSections/UsersTableSection';
import UsersFiltersSection from '@sections/UsersPageSections/UsersFiltersSection';

// components 
import SendMessageToUserModal from '@components/users/SendMessageToUserModal';

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
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
    handleUpdateUserDGroupStatus,
  } = useLogic(navigate, location);

  // fetch users when query parameters change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    const guestAccount = queryParams.get('guestAccount') || 'both';

    const today = new Date().toISOString().split('T')[0];
    const dateFrom = queryParams.get('dateFrom') || today;
    const dateTo = queryParams.get('dateTo') || today;
    
    const dgroupFilter = queryParams.get('dgroupFilter') || '';

    handleFetchUsers(currentPage, search, guestAccount, dateFrom, dateTo, dgroupFilter);
  }, [location.search, handleFetchUsers]);

  return (
    <Box sx={styles.container}>
      <Stack sx={styles.headerWrapper} direction="column" spacing={0.5} mb={3}>
        <Typography variant="h5" sx={styles.pageTitle}>
          Users Management
        </Typography>
        <Typography variant="body2" sx={styles.pageSubtitle}>
          View and manage all registered users in your system.
        </Typography>
      </Stack>

      <UsersFiltersSection
        onFilterChange={handleFilterChange}
        initialFilters={{
          search: new URLSearchParams(location.search).get('search') || '',
          guestAccount:
            new URLSearchParams(location.search).get('guestAccount') || 'both',
          dateFrom: new URLSearchParams(location.search).get('dateFrom') || '',
          dateTo: new URLSearchParams(location.search).get('dateTo') || '',
          dgroupFilter: new URLSearchParams(location.search).get('dgroupFilter') || '',
        }}
      />

      <UsersTableSection
        loading={loading}
        users={users}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        showMessageModal={handleShowMessageModal}
        onPageChange={(newPage) => {
          const params = new URLSearchParams(location.search);
          params.set('page', newPage);
          navigate(`?${params.toString()}`);
        }}
        onDgroupChange={handleUpdateUserDGroupStatus}
      />

      <SendMessageToUserModal
        userId={selectedUserId}
        open={messageModalOpen}
        onClose={handleCloseMessageModal}
        onSendMessage={handleCreateChatroomAndSendMessage}
      />
    </Box>
  );
};

export default Page;
