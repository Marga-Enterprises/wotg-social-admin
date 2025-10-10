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
  blogs = [],
  loading = false,
  page = 1,
  totalPages = 1,
  openAddBlogModal,
  onDeleteBlog,
  onPageChange,
}) => {
  // 🔹 Loading state
  if (loading) return <LoadingScreen />;

  // 🔹 Render Blog Rows
  const renderBlogRows = () => {
    if (blogs.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={styles.tableBodyCell}>
            No blogs found.
          </TableCell>
        </TableRow>
      );
    }

    return blogs.map((blog) => {
      const {
        id,
        blog_title,
        blog_thumbnail,
        blog_release_date_and_time,
        blog_approved,
      } = blog;

      const formattedDate = new Date(blog_release_date_and_time).toLocaleDateString(
        'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      );

      const statusColor = blog_approved
        ? styles.statusDotActive.backgroundColor
        : styles.statusDotInactive.backgroundColor;

      return (
        <TableRow key={id} hover sx={styles.tableRowHover}>
          {/* Thumbnail */}
          <TableCell sx={styles.tableBodyCell}>
            <Avatar
              variant="rounded"
              alt={blog_title}
              src={`https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${blog_thumbnail}`}
              sx={{ width: 56, height: 56 }}
            />
          </TableCell>

          {/* Title */}
          <TableCell sx={styles.tableBodyCell}>
            <Typography variant="subtitle2" noWrap>
              {blog_title}
            </Typography>
          </TableCell>

          {/* Release Date */}
          <TableCell sx={styles.tableBodyCell}>{formattedDate}</TableCell>

          {/* Status */}
          <TableCell sx={styles.tableBodyCell}>
            <Box sx={{ ...styles.statusDot, backgroundColor: statusColor }} />
          </TableCell>

          {/* Actions */}
          <TableCell sx={styles.tableBodyCell}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to={`/blogs/edit/${id}`}
                sx={styles.actionButtonEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onDeleteBlog(id)}
                sx={styles.actionButtonDelete}
              >
                Delete
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box sx={styles.root}>
      {/* 🔹 Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" sx={styles.addButton} onClick={openAddBlogModal}>
          + Create New Blog
        </Button>
      </Stack>

      {/* 🔹 Table Section */}
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

          <TableBody>{renderBlogRows()}</TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Pagination Section */}
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
