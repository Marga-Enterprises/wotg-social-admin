import React from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
} from '@mui/material';

import styles from './styles';
import LoadingScreen from '@components/common/LoadingScreen';

const UsersTableSection = ({
  users,
  loading,
  page,
  totalPages,
  onPageChange,
  showMessageModal,
  onDgroupChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) return <LoadingScreen />;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'abandoned':
        return { label: 'Abandoned', color: '#d32f2f' };
      case 'no_contact':
        return { label: 'No Contact', color: '#ed6c02' };
      case 'in_contact':
        return { label: 'In Contact', color: '#0288d1' };
      case 'active':
      default:
        return { label: 'Active', color: '#2e7d32' };
    }
  };

  return (
    <Box sx={styles.root}>
      <TableContainer
        component={Paper}
        sx={isMobile ? styles.tableContainerMobile : styles.tableContainer}
      >
        <Table stickyHeader size="small" sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>#</TableCell>
              <TableCell sx={styles.tableHeadCell}>First Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Last Name</TableCell>
              {!isMobile && (
                <TableCell sx={styles.tableHeadCell}>Email</TableCell>
              )}
              <TableCell sx={styles.tableHeadCell}>D-Group Member</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const { label, color } = getStatusStyle(user.guest_status);
                const isAbandoned = user.guest_status === 'abandoned';

                return (
                  <TableRow
                    key={user.id}
                    hover={!isAbandoned}
                    onClick={() => !isAbandoned && showMessageModal(user.id)}
                    sx={isAbandoned ? styles.rowAbandoned : styles.rowActive}
                  >
                    <TableCell sx={styles.tableBodyCell}>
                      {(page - 1) * 10 + (index + 1)}
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography sx={styles.titleText}>
                        {user.user_fname}
                      </Typography>
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography sx={styles.titleText}>
                        {user.user_lname}
                      </Typography>
                    </TableCell>

                    {!isMobile && (
                      <TableCell sx={styles.tableBodyCell}>
                        <Typography color="text.secondary">
                          {user.email}
                        </Typography>
                      </TableCell>
                    )}

                    {/* --- D-GROUP SELECT --- */}
                    <TableCell
                      sx={styles.tableBodyCell}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Select
                        value={user.user_already_a_dgroup_member ? true : false}
                        onChange={(e) => onDgroupChange(user.id, e.target.value)}
                        size="small"
                        sx={styles.dgroupSelect}
                        disabled={
                          user.guest_account === true ||
                          user.guest_status === 'abandoned'
                        }
                      >
                        <MenuItem value={true}>YES</MenuItem>
                        <MenuItem value={false}>NO</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography sx={{ color, fontWeight: 600 }}>
                        {label}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={styles.noDataCell} align="center">
                  <Typography sx={styles.noDataText(isMobile)}>
                    No users found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, v) => onPageChange(v)}
          sx={styles.pagination}
        />
      )}
    </Box>
  );
};

export default React.memo(UsersTableSection);
