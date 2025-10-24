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
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styles from './styles';
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
          onClick={openAddMusicModal}
          fullWidth={isMobile}
        >
          + Add New Music
        </Button>
      </Stack>

      {/* 🎧 Music Table */}
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
              <TableCell sx={styles.tableHeadCell}>Artist</TableCell>
              {!isMobile && <TableCell sx={styles.tableHeadCell}>Genre</TableCell>}
              {!isMobile && (
                <TableCell sx={styles.tableHeadCell} align="center">
                  Duration
                </TableCell>
              )}
              {!isMobile && (
                <TableCell sx={styles.tableHeadCell} align="center">
                  Plays
                </TableCell>
              )}
              <TableCell sx={styles.tableHeadCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {musics.length > 0 ? (
              musics.map((music) => (
                <TableRow key={music.id} hover sx={styles.tableRow}>
                  <TableCell sx={styles.tableBodyCell}>
                    <Avatar
                      variant="rounded"
                      alt={music.title}
                      src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${music.Album.cover_image}`}
                      sx={styles.thumbnail}
                    />
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        ...styles.titleText,
                        fontSize: isMobile ? '0.85rem' : '0.95rem',
                      }}
                    >
                      {music.title}
                    </Typography>
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                    >
                      {music.artist_name || '—'}
                    </Typography>
                  </TableCell>

                  {!isMobile && (
                    <TableCell sx={styles.tableBodyCell}>
                      {music.genre ? (
                        <Chip label={music.genre} size="small" sx={styles.genreChip} />
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          —
                        </Typography>
                      )}
                    </TableCell>
                  )}

                  {!isMobile && (
                    <TableCell sx={styles.tableBodyCell} align="center">
                      {formatDuration(music.duration)}
                    </TableCell>
                  )}

                  {!isMobile && (
                    <TableCell sx={styles.tableBodyCell} align="center">
                      <Typography sx={styles.playCount}>
                        {music.play_count.toLocaleString()}
                      </Typography>
                    </TableCell>
                  )}

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
                        onClick={() => onOpenEditMusicModal(music.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                  >
                    No music tracks found.
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

export default React.memo(MusicsTableSection);
