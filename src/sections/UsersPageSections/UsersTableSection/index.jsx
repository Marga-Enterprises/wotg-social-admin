// react
import React from 'react';

// mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const UsersTableSection = ({ users, loading, page, totalPages, onPageChange }) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* 📋 Users Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>#</TableCell>
              <TableCell sx={styles.tableHeadCell}>First Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Last Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Email</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const status = user.guest_status === 'abandoned' ? 'Abandoned' : 'Active';
                const statusColor =
                  user.guest_status === 'abandoned' ? '#d32f2f' : '#2e7d32';

                return (
                  <TableRow key={user.id} hover sx={styles.tableRow}>
                    {/* Index */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2" color="text.secondary">
                        {(page - 1) * 10 + (index + 1)}
                      </Typography>
                    </TableCell>

                    {/* First Name */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="subtitle2" sx={styles.titleText}>
                        {user.user_fname}
                      </Typography>
                    </TableCell>

                    {/* Last Name */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="subtitle2" sx={styles.titleText}>
                        {user.user_lname}
                      </Typography>
                    </TableCell>

                    {/* Email */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{ color: statusColor, fontWeight: 600 }}
                        >
                          {status}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={styles.noDataCell}>
                  <Typography variant="body2" color="text.secondary">
                    No users found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(UsersTableSection);
