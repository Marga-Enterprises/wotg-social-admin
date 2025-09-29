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

const BlogsTableSection = ({
  blogs,
  loading,
  page,
  totalPages,
  openAddBlogModal,
  onPageChange,
}) => {
  console.log('Rendering BlogsTableSection', page, totalPages);

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* Header section with Add Blog button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Blog Management</Typography>
        <Button variant="contained" onClick={openAddBlogModal}>
          + Create New Blog
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Thumbnail</TableCell>
              <TableCell sx={styles.tableHeadCell}>Title</TableCell>
              <TableCell sx={styles.tableHeadCell}>Release Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Approved</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <TableRow key={blog.id} hover>
                  <TableCell sx={styles.tableBodyCell}>
                    <Avatar
                      variant="rounded"
                      alt={blog.blog_title}
                      src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${blog.blog_thumbnail}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    <Typography variant="subtitle2">{blog.blog_title}</Typography>
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    {new Date(blog.blog_release_date_and_time).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    <Box
                      sx={{
                        ...styles.statusDot,
                        backgroundColor: blog.blog_approved
                          ? styles.statusDotActive.backgroundColor
                          : styles.statusDotInactive.backgroundColor,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={styles.tableBodyCell}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        component={RouterLink}
                        to={`/blogs/edit/${blog.id}`}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={styles.tableBodyCell}>
                  No blogs found.
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

export default React.memo(BlogsTableSection);
