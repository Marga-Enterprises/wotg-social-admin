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
  Button,
  Avatar,
} from '@mui/material';

// react-router
import { Link as RouterLink } from 'react-router-dom';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// styles
import styles from './styles';

const AlbumsTableSection = ({
  albums = [],
  loading = false,
  page = 1,
  totalPages = 1,
  openAddAlbumModal,
  onDeleteAlbum,
  onOpenEditAlbumModal,
  onPageChange,
}) => {
  // 🔹 Show loader if fetching
  if (loading) return <LoadingScreen />;

  // 🔹 Render table rows
  const renderTableRows = () => {
    if (albums.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} align="center" sx={styles.tableBodyCell}>
            No albums found.
          </TableCell>
        </TableRow>
      );
    }

    return albums.map(({ id, title, cover_image }) => (
      <TableRow key={id} hover sx={styles.tableRowHover}>
        {/* Thumbnail */}
        <TableCell sx={styles.tableBodyCell}>
          <Avatar
            variant="rounded"
            alt={title}
            src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${cover_image}`}
            sx={{ width: 56, height: 56 }}
          />
        </TableCell>

        {/* Title */}
        <TableCell sx={styles.tableBodyCell}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </TableCell>

        {/* Actions */}
        <TableCell sx={styles.tableBodyCell}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              sx={styles.actionButtonEdit}
              onClick={() => onOpenEditAlbumModal(id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={styles.actionButtonDelete}
              onClick={() => onDeleteAlbum(id)}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={styles.root}>
      {/* 🔹 Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={styles.header}
      >
        <Button
          variant="contained"
          onClick={openAddAlbumModal}
          sx={styles.addButton}
        >
          + Create New Album
        </Button>
      </Stack>

      {/* 🔹 Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
              <TableCell sx={styles.tableHeadCell}>Title</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Pagination */}
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

export default React.memo(AlbumsTableSection);
