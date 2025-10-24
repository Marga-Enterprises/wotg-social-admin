// react
import { useEffect, useCallback } from 'react';

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
import AlbumFiltersSection from '@sections/AlbumsPageSections/AlbumsFiltersSection';

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

  // 🧭 Extract URL params (for sync)
  const getQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get('page')) || 1,
      search: queryParams.get('search') || '',
    };
  }, [location.search]);

  // 🧠 Fetch albums whenever params change
  useEffect(() => {
    const { page, search } = getQueryParams();
    handleFetchAlbums(page, search);
  }, [getQueryParams, handleFetchAlbums]);

  // 🔍 Handle filter changes (search)
  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(location.search);
    const { search, trigger } = filters;

    if (trigger === 'reset') {
      params.delete('search');
      params.set('page', 1);
    } else if (trigger === 'manual') {
      params.set('search', search.trim());
      params.set('page', 1);
    }

    navigate(`?${params.toString()}`);
  };

  // 🔢 Handle page change
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage);
    navigate(`?${params.toString()}`);
  };

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

      {/* 🔍 Search Filter Section */}
      <AlbumFiltersSection
        initialFilters={{ search: getQueryParams().search }}
        onFilterChange={handleFilterChange}
      />

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
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Page;
