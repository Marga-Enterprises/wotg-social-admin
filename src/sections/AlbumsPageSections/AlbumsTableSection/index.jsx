// react
import React from 'react';

// react-router-dom
import { Link as RouterLink } from 'react-router-dom';

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

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const AlbumsTableSection = ({
  albums,
  loading,
  page,
  totalPages,
  openAddAlbumModal,
  onDeleteAlbum,
  onPageChange,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* Header section with Add Album button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Album Management</Typography>
        <Button variant="contained" onClick={openAddAlbumModal}>
          + Create New Album
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
                    <TableCell sx={styles.tableHeadCell}>Title</TableCell>
                    <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {albums.length > 0 ? (
                    albums.map((album) => (
                    <TableRow key={album.id} hover>
                        {/* Thumbnail */}
                        <TableCell sx={styles.tableBodyCell}>
                            <Avatar
                                variant="rounded"
                                alt={album.title}
                                src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${album.cover_image}`}
                                sx={{ width: 56, height: 56 }}
                            />
                        </TableCell>

                        {/* Title */}
                        <TableCell sx={styles.tableBodyCell}>
                            <Typography variant="subtitle2">{album.title}</Typography>
                        </TableCell>

                        {/* Actions */}
                        <TableCell sx={styles.tableBodyCell}>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    component={RouterLink}
                                    to={`/albums/edit/${album.id}`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => onDeleteAlbum(album.id)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} align="center" sx={styles.tableBodyCell}>
                            No albums found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </TableContainer>


      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)} // ✅ syncs state + URL
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(AlbumsTableSection);
