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
      {/* 🎵 Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" sx={styles.addButton} onClick={openAddMusicModal}>
          + Add New Music
        </Button>
      </Stack>

      {/* 🎶 Music Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
              <TableCell sx={styles.tableHeadCell}>Title</TableCell>
              <TableCell sx={styles.tableHeadCell}>Artist</TableCell>
              <TableCell sx={styles.tableHeadCell}>Genre</TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Duration
              </TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Plays
              </TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {musics.length > 0 ? (
              musics.map((music) => (
                <TableRow key={music.id} hover sx={styles.tableRow}>
                  {/* Thumbnail */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Avatar
                      variant="rounded"
                      alt={music.title}
                      src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${music.Album.cover_image}`}
                      sx={styles.thumbnail}
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Typography variant="subtitle2" sx={styles.titleText}>
                      {music.title}
                    </Typography>
                  </TableCell>

                  {/* Artist */}
                  <TableCell sx={styles.tableBodyCell}>
                    <Typography variant="body2" color="text.secondary">
                      {music.artist_name || '—'}
                    </Typography>
                  </TableCell>

                  {/* Genre */}
                  <TableCell sx={styles.tableBodyCell}>
                    {music.genre ? (
                      <Chip
                        label={music.genre}
                        size="small"
                        sx={styles.genreChip}
                      />
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        —
                      </Typography>
                    )}
                  </TableCell>

                  {/* Duration */}
                  <TableCell sx={styles.tableBodyCell} align="center">
                    {formatDuration(music.duration)}
                  </TableCell>

                  {/* Plays */}
                  <TableCell sx={styles.tableBodyCell} align="center">
                    <Typography sx={styles.playCount}>
                      {music.play_count.toLocaleString()}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={styles.tableBodyCell} align="center">
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={styles.editButton}
                        onClick={() => onOpenEditMusicModal(music.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={styles.deleteButton}
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
                <TableCell colSpan={7} align="center" sx={styles.noDataCell}>
                  <Typography variant="body2" color="text.secondary">
                    No music tracks found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🎧 Pagination */}
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
