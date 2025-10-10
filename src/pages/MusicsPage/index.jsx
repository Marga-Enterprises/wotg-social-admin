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

// components
import AddMusicFormModal from '@components/musics/AddMusicFormModal';
import EditMusicFormModal from '@components/musics/EditMusicFormModal';

const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
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

  // load music and albums
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const search = queryParams.get('search') || '';

    handleFetchMusics(currentPage, search);
    handleFetchAlbums(1, '');
  }, [location.search, handleFetchMusics, handleFetchAlbums]);

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
