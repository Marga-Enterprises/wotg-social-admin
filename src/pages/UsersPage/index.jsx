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
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const { users, loading, pageDetails, handleFetchUsers } = useLogic();

  // 🔄 load users on page load or when query changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    const guestAccount = queryParams.get('guestAccount') || 'both';
    const dateFrom = queryParams.get('dateFrom') || '';
    const dateTo = queryParams.get('dateTo') || '';

    handleFetchUsers(currentPage, search, guestAccount, dateFrom, dateTo);
  }, [location.search, handleFetchUsers]);

  // 🧠 handle filters update
  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(location.search);
    params.set('page', 1); // reset to first page
    params.set('search', filters.search || '');
    params.set('guestAccount', filters.guestAccount || 'both');
    params.set('dateFrom', filters.dateFrom || '');
    params.set('dateTo', filters.dateTo || '');
    navigate(`?${params.toString()}`);
  };

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

      {/* 🔍 Filters Section */}
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
