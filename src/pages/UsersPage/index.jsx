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

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // pass navigate + location into logic
  const {
    users,
    loading,
    pageDetails,
    handleFetchUsers,
    handleFilterChange,
  } = useLogic(navigate, location);

  // 🔄 Fetch users when query params change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    const guestAccount = queryParams.get('guestAccount') || 'both';

    // 🗓 Default date = today (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    const dateFrom = queryParams.get('dateFrom') || today;
    const dateTo = queryParams.get('dateTo') || today;

    handleFetchUsers(currentPage, search, guestAccount, dateFrom, dateTo);
  }, [location.search, handleFetchUsers]);

  return (
    <Box sx={styles.container}>
      {/* 👥 Page Header */}
      <Stack sx={styles.headerWrapper} direction="column" spacing={0.5} mb={3}>
        <Typography variant="h5" sx={styles.pageTitle}>
          Users Management
        </Typography>
        <Typography variant="body2" sx={styles.pageSubtitle}>
          View and manage all registered users in your system.
        </Typography>
      </Stack>

      {/* 🔍 Filters */}
      <UsersFiltersSection
        onFilterChange={handleFilterChange}
        initialFilters={{
          search: new URLSearchParams(location.search).get('search') || '',
          guestAccount:
            new URLSearchParams(location.search).get('guestAccount') || 'both',
          dateFrom: new URLSearchParams(location.search).get('dateFrom') || '',
          dateTo: new URLSearchParams(location.search).get('dateTo') || '',
        }}
      />

      {/* 📋 Users Table */}
      <UsersTableSection
        loading={loading}
        users={users}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        onPageChange={(newPage) => {
          const params = new URLSearchParams(location.search);
          params.set('page', newPage);
          navigate(`?${params.toString()}`);
        }}
      />
    </Box>
  );
};

export default Page;
