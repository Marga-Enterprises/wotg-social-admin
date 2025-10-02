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

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

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
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Post Management</Typography>
        <Button variant="contained" onClick={openAddPostModal}>
          + Create New Post
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Media</TableCell>
              <TableCell sx={styles.tableHeadCell}>Caption</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => {
                // Pick the most recent media (by created_at)
                let latestMedia = null;
                if (post.media && post.media.length > 0) {
                  latestMedia = [...post.media].sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )[0];
                }

                // Construct CDN URL if media exists
                let mediaUrl = null;
                if (latestMedia) {
                  if (latestMedia.type === 'video') {
                    mediaUrl = `${cdnUrl}videos/${latestMedia.url}`;
                  } else if (latestMedia.type === 'image') {
                    mediaUrl = `${cdnUrl}images/${latestMedia.url}`;
                  }
                }

                return (
                  <TableRow key={post.id} hover>
                    {/* Media */}
                    <TableCell sx={{ ...styles.tableBodyCell, ...styles.mediaCell }}>
                      {latestMedia ? (
                        latestMedia.type === 'video' ? (
                          <Box
                            component="video"
                            src={mediaUrl}
                            controls
                            sx={styles.mediaPreview}   // ⬅️ use central style
                          />
                        ) : (
                          <Box
                            component="img"
                            src={mediaUrl}
                            alt="Post Media"
                            sx={styles.mediaPreview}   // ⬅️ use central style
                          />
                        )
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No media
                        </Typography>
                      )}
                    </TableCell>

                    {/* Content */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Typography variant="body2">
                        {post.content ? post.content.substring(0, 300) : 'No content'}
                        {post.content && post.content.length > 300 ? '...' : ''}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          onClick={() => onOpenEditPostModal(post.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
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
                <TableCell colSpan={3} align="center" sx={styles.tableBodyCell}>
                  No posts found.
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

export default React.memo(PostsTableSection);
