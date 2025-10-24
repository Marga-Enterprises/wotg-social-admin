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
} from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// styles
import styles from './styles';

const cdnUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/';

const PostsTableSection = ({
  posts,
  loading,
  page,
  totalPages,
  openAddPostModal,
  onDeletePost,
  onOpenEditPostModal,
  onPageChange,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* 🔹 Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={styles.headerWrapper}
        spacing={1.5}
      >
        <Box>
          <Typography variant="h6" sx={styles.headerTitle}>
            Post Management
          </Typography>
          <Typography variant="body2" sx={styles.headerSubtitle}>
            Manage all your posts, videos, and scheduled updates.
          </Typography>
        </Box>

        <Button variant="contained" sx={styles.addButton} onClick={openAddPostModal}>
          + Create New Post
        </Button>
      </Stack>

      {/* 🔹 Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Media</TableCell>
              <TableCell sx={styles.tableHeadCell}>Caption</TableCell>
              <TableCell sx={styles.tableHeadCell}>Release Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => {
                const latestMedia =
                  post.media && post.media.length > 0
                    ? [...post.media].sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                      )[0]
                    : null;

                let mediaUrl = null;
                if (latestMedia) {
                  const folder =
                    latestMedia.type === 'video'
                      ? 'videos'
                      : latestMedia.type === 'image'
                      ? 'images'
                      : '';
                  mediaUrl = `${cdnUrl}${folder}/${latestMedia.url}`;
                }

                const status = post.status || 'Published';
                const statusColor =
                  status === 'Scheduled'
                    ? '#e67e22'
                    : status === 'Draft'
                    ? '#777'
                    : '#cc0000';

                return (
                  <TableRow key={post.id} hover sx={styles.tableRow}>
                    {/* 🎞️ Media Preview */}
                    <TableCell sx={{ ...styles.tableBodyCell, ...styles.mediaCell }}>
                      {mediaUrl ? (
                        <Box sx={styles.mediaWrapper}>
                          {latestMedia.type === 'video' ? (
                            <>
                              <Box
                                component="video"
                                src={mediaUrl}
                                muted
                                sx={styles.mediaPreview}
                              />
                              <PlayCircleFilledWhiteIcon sx={styles.playIcon} />
                            </>
                          ) : (
                            <Box
                              component="img"
                              src={mediaUrl}
                              alt="Post Media"
                              sx={styles.mediaPreview}
                            />
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No media
                        </Typography>
                      )}
                    </TableCell>

                    {/* ✏️ Caption */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2" sx={styles.captionText}>
                        {post.content
                          ? post.content.length > 250
                            ? `${post.content.substring(0, 250)}…`
                            : post.content
                          : 'No caption'}
                      </Typography>
                    </TableCell>

                    {/* 📅 Release Date */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2" sx={styles.dateText}>
                        {post.release_date
                          ? new Date(post.release_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
                      </Typography>
                    </TableCell>

                    {/* 🏷️ Status */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Box
                        sx={{
                          ...styles.statusChip,
                          backgroundColor: statusColor,
                        }}
                      >
                        {status}
                      </Box>
                    </TableCell>

                    {/* ⚙️ Actions */}
                    <TableCell sx={{ ...styles.tableBodyCell, ...styles.actionsCell }}>
                      <Box sx={styles.actionsWrapper}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={styles.editButton}
                          onClick={() => onOpenEditPostModal(post.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={styles.deleteButton}
                          onClick={() => onDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={styles.tableBodyCell}>
                  <Typography variant="body2" color="text.secondary">
                    No posts found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(PostsTableSection);
