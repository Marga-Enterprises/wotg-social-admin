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
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import LoadingScreen from '@components/common/LoadingScreen';

const BlogsTableSection = ({
  blogs = [],
  loading = false,
  page = 1,
  totalPages = 1,
  openAddBlogModal,
  onDeleteBlog,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* 📰 Header */}
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
          onClick={openAddBlogModal}
          fullWidth={isMobile}
        >
          + Create New Blog
        </Button>
      </Stack>

      {/* 🧾 Blogs Table */}
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
              {!isMobile && (
                <TableCell sx={styles.tableHeadCell}>Release Date</TableCell>
              )}
              <TableCell sx={styles.tableHeadCell}>Approved</TableCell>
              <TableCell sx={styles.tableHeadCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                const {
                  id,
                  blog_title,
                  blog_thumbnail,
                  blog_release_date_and_time,
                  blog_approved,
                } = blog;

                const formattedDate = new Date(
                  blog_release_date_and_time
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <TableRow key={id} hover sx={styles.tableRow}>
                    {/* Thumbnail */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Avatar
                        variant="rounded"
                        alt={blog_title}
                        src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${blog_thumbnail}`}
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
                        noWrap
                      >
                        {blog_title}
                      </Typography>
                    </TableCell>

                    {/* Release Date */}
                    {!isMobile && (
                      <TableCell sx={styles.tableBodyCell}>
                        {formattedDate}
                      </TableCell>
                    )}

                    {/* Approved */}
                    <TableCell sx={styles.tableBodyCell}>
                      <Box
                        sx={{
                          ...styles.statusDot,
                          backgroundColor: blog_approved
                            ? styles.statusDotActive.backgroundColor
                            : styles.statusDotInactive.backgroundColor,
                        }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={styles.tableBodyCell} align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1.2}
                        sx={{
                          flexWrap: 'wrap',
                          '@media (max-width: 600px)': {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: '8px',
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={styles.editButton}
                          onClick={() => onOpenEditBlogModal(blog.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={styles.deleteButton}
                          onClick={() => onDeleteBlog(blog.id)}
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
                <TableCell colSpan={5} align="center" sx={styles.noDataCell}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                  >
                    No blogs found.
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
          sx={styles.pagination}
        />
      )}
    </Box>
  );
};

export default React.memo(BlogsTableSection);
