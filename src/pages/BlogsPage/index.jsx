// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// mui
import { Box, Stack, Typography } from '@mui/material';

// custom hook
import { useLogic } from './useLogic';

// sections
import BlogsTable from '@sections/BlogPageSections/BlogsTable';

// components
import AddBlogFormModal from '@components/blogs/AddBlogFormModal';

// styles
import styles from './styles';

const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    blogs,
    loading,
    pageDetails,
    openAddBlogModal,
    formValues,
    handleFetchBlogs,
    handleAddNewBlog,
    handleOpenAddBlogModal,
    handleCloseAddBlogModal,
    handleFormInputChange,
    handleThumbnailUpload,
    handleDeleteBlog,
  } = useLogic();

  // Fetch blogs on mount or when page/search changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    handleFetchBlogs(currentPage, search);
  }, [location.search, handleFetchBlogs]);

  return (
    <Box sx={styles.container}>
      {/* 📰 Page Header */}
      <Stack sx={styles.headerWrapper} direction="column" spacing={0.5} mb={3}>
        <Typography variant="h5" sx={styles.pageTitle}>
          Blog Management
        </Typography>
        <Typography variant="body2" sx={styles.pageSubtitle}>
          Create, edit, and manage all published blog posts and scheduled releases.
        </Typography>
      </Stack>

      {/* ➕ Add Blog Modal */}
      <AddBlogFormModal
        open={openAddBlogModal}
        onClose={handleCloseAddBlogModal}
        formValues={formValues}
        onInputChange={handleFormInputChange}
        onSubmit={handleAddNewBlog}
        onThumbnailUpload={handleThumbnailUpload}
      />

      {/* 📋 Blogs Table */}
      <BlogsTable
        loading={loading}
        blogs={blogs}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        openAddBlogModal={handleOpenAddBlogModal}
        onDeleteBlog={handleDeleteBlog}
        onPageChange={(newPage) => {
          const params = new URLSearchParams(location.search);
          params.set('page', newPage);
          navigate(`?${params.toString()}`);
        }}
      />
    </Box>
  );
};

export default Page;
