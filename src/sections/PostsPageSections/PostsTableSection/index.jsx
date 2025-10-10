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
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={styles.headerWrapper}
      >
        <Box>
          <Typography variant="h6" sx={styles.headerTitle}>
            Post Management
          </Typography>
          <Typography variant="body2" sx={styles.headerSubtitle}>
            View, edit, and schedule all community posts and media updates.
          </Typography>
        </Box>

        <Button variant="contained" sx={styles.addButton} onClick={openAddPostModal}>
          + Create New Post
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Media</TableCell>
              <TableCell sx={styles.tableHeadCell}>Caption</TableCell>
              <TableCell sx={styles.tableHeadCell}>Release Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
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

                return (
                  <TableRow key={post.id} hover sx={styles.tableRow}>
                    {/* Media */}
                    <TableCell sx={{ ...styles.tableBodyCell, ...styles.mediaCell }}>
                      {mediaUrl ? (
                        latestMedia.type === 'video' ? (
                          <Box
                            component="video"
                            src={mediaUrl}
                            controls
                            sx={styles.mediaPreview}
                          />
                        ) : (
                          <Box
                            component="img"
                            src={mediaUrl}
                            alt="Post Media"
                            sx={styles.mediaPreview}
                          />
                        )
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No media
                        </Typography>
                      )}
                    </TableCell>

                    {/* Caption */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2" sx={styles.captionText}>
                        {post.content
                          ? post.content.length > 300
                            ? `${post.content.substring(0, 300)}…`
                            : post.content
                          : 'No caption'}
                      </Typography>
                    </TableCell>

                    {/* Release Date */}
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

                    {/* Actions */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Stack direction="row" spacing={1.2}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={styles.editButton}
                          component={RouterLink}
                          onClick={() => onOpenEditPostModal(post.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={styles.deleteButton}
                          onClick={() => onDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={styles.tableBodyCell}>
                  <Typography variant="body2" color="text.secondary">
                    No posts found.
                  </Typography>
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
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(PostsTableSection);
