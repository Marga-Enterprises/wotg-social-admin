// react
import { useEffect } from 'react';

// router
import { useParams } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box } from '@mui/material';

// sections
import BlogsDetailsForm from '@sections/EditBlogPageSections/BlogsDetailsForm';

// styles
import styles from './styles';

const Page = () => {
  // hooks
  const { id } = useParams();

  // logic hooks
  const {
    loading,
    formValues,
    selectedThumbnail,
    handleInputChange,
    handleThumbnailUpload,
    handleFetchBlogById,
    handleUpdateBlog,
  } = useLogic();

  // use effect
  useEffect(() => {
    if (id) {
      handleFetchBlogById(id);
    }
  }, [id, handleFetchBlogById]);

  return (
    <Box sx={styles.container}>
      <BlogsDetailsForm
        formValues={formValues}
        loading={loading}
        selectedThumbnail={selectedThumbnail}
        onInputChange={handleInputChange}
        onThumbnailUpload={handleThumbnailUpload}
        onSubmit={handleUpdateBlog}
      />
    </Box>
  );
}

export default Page;