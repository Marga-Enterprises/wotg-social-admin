// react
import { useEffect } from 'react';

// router
import { useParams, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box, Stack, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// sections
import BlogsDetailsForm from '@sections/EditBlogPageSections/BlogsDetailsForm';

// components
import LoadingScreen from '@components/common/LoadingScreen';
import SnackbarAlert from '@components/common/SnackbarAlert';

// styles
import styles from './styles';

const Page = () => {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // logic hooks
  const {
    loading,
    formValues,
    selectedThumbnail,
    openSnackbar,
    message,
    severity,
    setOpenSnackbar,
    handleInputChange,
    handleThumbnailUpload,
    handleFetchBlogById,
    handleUpdateBlog,
  } = useLogic();

  // fetch blog by id
  useEffect(() => {
    if (id) handleFetchBlogById(id);
  }, [id, handleFetchBlogById]);

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.container}>
      {/* 🔙 Back Header */}
      <Stack direction="row" alignItems="center" spacing={1} sx={styles.backHeader}>
        <IconButton onClick={() => navigate(-1)} sx={styles.backButton}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" sx={styles.backTitle}>
          Edit Blog
        </Typography>
      </Stack>

      {/* 📝 Edit Form */}
      <BlogsDetailsForm
        formValues={formValues}
        loading={loading}
        selectedThumbnail={selectedThumbnail}
        onInputChange={handleInputChange}
        onThumbnailUpload={handleThumbnailUpload}
        onSubmit={handleUpdateBlog}
      />

      {/* 🔔 Snackbar */}
      <SnackbarAlert
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={message}
        severity={severity}
        duration={3000}
      />
    </Box>
  );
};

export default Page;
