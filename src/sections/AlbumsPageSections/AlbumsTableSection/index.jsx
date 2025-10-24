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
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styles from './styles';
import LoadingScreen from '@components/common/LoadingScreen';

const AlbumsTableSection = ({
  albums,
  loading,
  page,
  totalPages,
  openAddAlbumModal,
  onOpenEditAlbumModal,
  onDeleteAlbum,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* 🎵 Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={2}
        spacing={1.5}
      >
        <Button
          variant="contained"
          sx={styles.addButton}
          onClick={openAddAlbumModal}
          fullWidth={isMobile}
        >
          + Add New Album
        </Button>
      </Stack>

      {/* 💿 Albums Table */}
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
              <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
              <TableCell sx={styles.tableHeadCell}>Title</TableCell>
              {!isMobile && <TableCell sx={styles.tableHeadCell}>Artist</TableCell>}
              {!isMobile && <TableCell sx={styles.tableHeadCell}>Songs</TableCell>}
              <TableCell sx={styles.tableHeadCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {albums.length > 0 ? (
              albums.map((album) => (
                <TableRow key={album.id} hover sx={styles.tableRow}>
                  {/* Thumbnail */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Avatar
                      variant="rounded"
                      alt={album.title}
                      src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${album.cover_image}`}
                      sx={styles.thumbnail}
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        ...styles.titleText,
                        fontSize: isMobile ? '0.85rem' : '0.95rem',
                      }}
                    >
                      {album.title}
                    </Typography>
                  </TableCell>

                  {/* Artist */}
                  {!isMobile && (
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                      >
                        {album.artist_name || '—'}
                      </Typography>
                    </TableCell>
                  )}

                  {/* Song Count */}
                  {!isMobile && (
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                      >
                        {album.song_count ?? 0}
                      </Typography>
                    </TableCell>
                  )}

                  {/* Actions */}
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
                      <Button
                        variant="contained"
                        size="small"
                        sx={styles.editButton}
                        onClick={() => onOpenEditAlbumModal(album.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={styles.deleteButton}
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
                <TableCell colSpan={5} align="center" sx={styles.noDataCell}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                  >
                    No albums found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          color="primary"
          sx={styles.pagination}
        />
      )}
    </Box>
  );
};

export default React.memo(AlbumsTableSection);
