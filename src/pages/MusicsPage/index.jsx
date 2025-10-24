// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// mui
import { Box, Stack, Typography } from '@mui/material';

// styles
import styles from './styles';

// custom hook
import { useLogic } from './useLogic';

// sections
import MusicsTableSection from '@sections/MusicsPageSections/MusicsTableSection';
import MusicsFiltersSection from '@sections/MusicsPageSections/MusicsFiltersSection';

// components
import AddMusicFormModal from '@components/musics/AddMusicFormModal';
import EditMusicFormModal from '@components/musics/EditMusicFormModal';

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    musics,
    albums,
    loading,
    openAddMusicModal,
    openEditMusicModal,
    pageDetails,
    formValues,
    handleFetchMusics,
    handleFormInputChange,
    handleOpenAddMusicModal,
    handleCloseAddMusicModal,
    handleAudioUpload,
    handleAddNewMusic,
    handleFetchAlbums,
    handleDeleteMusic,
    handleOpenEditMusicModal,
    handleCloseEditMusicModal,
    handleUpdateMusic,
  } = useLogic();

  // Load musics and albums on mount or when query changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';
    const albumId = queryParams.get('albumId') || '';

    handleFetchMusics(currentPage, search, albumId);
    handleFetchAlbums(1, '');
  }, [location.search, handleFetchMusics, handleFetchAlbums]);

  // ✅ Handle filter changes
  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(location.search);

    if (filters.trigger === 'reset') {
      params.delete('search');
      params.delete('albumId');
      params.set('page', 1);
    } else {
      if (filters.search !== undefined) {
        if (filters.search) params.set('search', filters.search);
        else params.delete('search');
      }

      if (filters.albumId !== undefined) {
        if (filters.albumId) params.set('albumId', filters.albumId);
        else params.delete('albumId');
      }

      // Reset to first page when filters change
      if (filters.trigger !== 'manual') params.set('page', 1);
    }

    navigate(`?${params.toString()}`);
  };

  // ✅ Get current filters from URL
  const queryParams = new URLSearchParams(location.search);
  const currentFilters = {
    search: queryParams.get('search') || '',
    albumId: queryParams.get('albumId') || '',
  };

  return (
    <Box sx={styles.container}>
      {/* 🎵 Page Header */}
      <Stack sx={styles.headerWrapper} direction="column" spacing={0.5} mb={3}>
        <Typography variant="h5" sx={styles.pageTitle}>
          Music Management
        </Typography>
        <Typography variant="body2" sx={styles.pageSubtitle}>
          Manage, edit, and organize all uploaded songs and albums in your library.
        </Typography>
      </Stack>

      {/* 🎛 Filters Section */}
      <MusicsFiltersSection
        albums={albums}
        initialFilters={currentFilters}
        onFilterChange={handleFilterChange}
      />

      {/* 🎶 Add Music Modal */}
      <AddMusicFormModal
        open={openAddMusicModal}
        albums={albums}
        onClose={handleCloseAddMusicModal}
        formValues={formValues}
        onInputChange={handleFormInputChange}
        onSubmit={handleAddNewMusic}
        onAudioUpload={handleAudioUpload}
      />

      {/* ✏️ Edit Music Modal */}
      <EditMusicFormModal
        open={openEditMusicModal}
        albums={albums}
        onClose={handleCloseEditMusicModal}
        formValues={formValues}
        onInputChange={handleFormInputChange}
        onSubmit={handleUpdateMusic}
        onAudioUpload={handleAudioUpload}
      />

      {/* 🎧 Musics Table */}
      <MusicsTableSection
        loading={loading}
        musics={musics}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        openAddMusicModal={handleOpenAddMusicModal}
        onDeleteMusic={handleDeleteMusic}
        onOpenEditMusicModal={handleOpenEditMusicModal}
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
