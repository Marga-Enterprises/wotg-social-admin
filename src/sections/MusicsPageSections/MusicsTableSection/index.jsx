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
  Chip,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicsTableSection = ({
  musics,
  loading,
  page,
  totalPages,
  openAddMusicModal,
  onOpenEditMusicModal,
  onDeleteMusic,
  onPageChange,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* Header section with Add Music button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Music Management</Typography>
        <Button variant="contained" onClick={openAddMusicModal}>
          + Create New Music
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
              <TableCell sx={styles.tableHeadCell}>Title</TableCell>
              <TableCell sx={styles.tableHeadCell}>Artist</TableCell>
              <TableCell sx={styles.tableHeadCell}>Genre</TableCell>
              <TableCell sx={styles.tableHeadCell}>Duration</TableCell>
              <TableCell sx={styles.tableHeadCell}>Plays</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {musics.length > 0 ? (
              musics.map((music) => (
                <TableRow key={music.id} hover>
                  {/* Thumbnail */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Avatar
                      variant="rounded"
                      alt={music.title}
                      src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${music.Album.cover_image}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Typography variant="subtitle2">{music.title}</Typography>
                  </TableCell>

                  {/* Artist */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Typography variant="body2" color="text.secondary">
                      {music.artist_name}
                    </Typography>
                  </TableCell>

                  {/* Genre */}
                  <TableCell sx={styles.tableBodyCell}>
                    {music.genre || '-'}
                  </TableCell>

                  {/* Duration */}
                  <TableCell sx={styles.tableBodyCell}>
                    {formatDuration(music.duration)}
                  </TableCell>

                  {/* Plays */}
                  <TableCell sx={styles.tableBodyCell}>
                    {music.play_count}
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        component={RouterLink}
                        onClick={() => onOpenEditMusicModal(music.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onDeleteMusic(music.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={styles.tableBodyCell}>
                  No musics found.
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
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(MusicsTableSection);
