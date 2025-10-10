// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// mui
import { Box, Stack, Typography } from '@mui/material';

// custom hook
import { useLogic } from './useLogic';

// components
import AddAlbumFormModal from '@components/albums/AddAlbumFormModal';
import EditAlbumFormModal from '@components/albums/EditAlbumFormModal';

// sections
import AlbumsTableSection from '@sections/AlbumsPageSections/AlbumsTableSection';

// styles
import styles from './styles';

const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    albums,
    loading,
    openAddAlbumModal,
    openEditAlbumModal,
    pageDetails,
    formValues,
    handleFetchAlbums,
    handleThumbnailUpload,
    handleFormInputChange,
    handleAddNewAlbum,
    handleOpenAddAlbumModal,
    handleCloseAddAlbumModal,
    handleDeleteAlbum,
    handleOpenEditAlbumModal,
    handleCloseEditAlbumModal,
    handleUpdateAlbum,
  } = useLogic();

  // fetch albums based on query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    handleFetchAlbums(currentPage, search);
  }, [location.search, handleFetchAlbums]);

  return (
    <Box sx={styles.container}>
      {/* 🏷️ Page Header */}
      <Stack direction="column" spacing={0.5} sx={styles.headerWrapper}>
        <Typography variant="h5" sx={styles.pageTitle}>
          Albums Management
        </Typography>
        <Typography variant="body2" sx={styles.pageSubtitle}>
          View, edit, and organize all uploaded albums.
        </Typography>
      </Stack>

      {/* ➕ Add Album Modal */}
      <AddAlbumFormModal
        open={openAddAlbumModal}
        onClose={handleCloseAddAlbumModal}
        formValues={formValues}
        onInputChange={handleFormInputChange}
        onSubmit={handleAddNewAlbum}
        onThumbnailUpload={handleThumbnailUpload}
      />

      {/* ✏️ Edit Album Modal */}
      <EditAlbumFormModal
        open={openEditAlbumModal}
        onClose={handleCloseEditAlbumModal}
        formValues={formValues}
        onInputChange={handleFormInputChange}
        onSubmit={handleUpdateAlbum}
        onThumbnailUpload={handleThumbnailUpload}
      />

      {/* 🎵 Albums Table Section */}
      <AlbumsTableSection
        loading={loading}
        albums={albums}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        openAddAlbumModal={handleOpenAddAlbumModal}
        onDeleteAlbum={handleDeleteAlbum}
        onOpenEditAlbumModal={handleOpenEditAlbumModal}
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
