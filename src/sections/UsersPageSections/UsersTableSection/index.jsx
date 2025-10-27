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
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styles from './styles';
import LoadingScreen from '@components/common/LoadingScreen';

const UsersTableSection = ({
  users,
  loading,
  page,
  totalPages,
  onPageChange,
  createChatroom,
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
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={2}
        spacing={1.5}
      >
        <Typography variant="h6" sx={styles.headerTitle}>
          Users List
        </Typography>
      </Stack>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          ...styles.tableContainer,
          overflowX: isMobile ? 'auto' : 'visible',
        }}
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
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const { label, color } = getStatusStyle(user.guest_status);
                return (
                  <TableRow key={user.id} hover sx={styles.tableRow}>
                    <TableCell sx={styles.tableBodyCell}>
                      {(page - 1) * 10 + (index + 1)}
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="subtitle2" sx={styles.titleText}>
                        {user.user_fname}
                      </Typography>
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="subtitle2" sx={styles.titleText}>
                        {user.user_lname}
                      </Typography>
                    </TableCell>

                    {!isMobile && (
                      <TableCell sx={styles.tableBodyCell}>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </TableCell>
                    )}

                    <TableCell sx={styles.tableBodyCell}>
                      <Typography
                        variant="body2"
                        sx={{ color, fontWeight: 600 }}
                      >
                        {label}
                      </Typography>
                    </TableCell>

                    <TableCell sx={styles.tableBodyCell} align="center">
                      <Stack
                        direction={isMobile ? 'column' : 'row'}
                        justifyContent="center"
                        alignItems="center"
                        spacing={isMobile ? 1 : 1.5}
                        sx={{
                          width: '100%',
                          '& > button': {
                            flex: 1,
                            minWidth: isMobile ? '100%' : 'auto',
                          },
                        }}
                      >
                        {
                          // Disable chatroom creation for abandoned users
                          user.guest_status === 'abandoned' ? (
                            <Button
                              variant="contained"
                              size="small"
                              sx={styles.disabledButton}
                              disabled
                            >
                              Create Chatroom
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              sx={styles.createButton}
                              onClick={() => createChatroom(user.id)}
                            >
                              Create Chatroom
                            </Button>
                          )
                        }
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={styles.noDataCell}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                  >
                    No users found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          sx={styles.pagination}
        />
      )}
    </Box>
  );
};

export default React.memo(UsersTableSection);
