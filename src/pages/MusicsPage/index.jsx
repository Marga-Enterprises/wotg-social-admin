// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box } from '@mui/material';

// styles
import styles from './styles';

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

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';

        // fetch musics
        handleFetchMusics(currentPage, search);

        // fetch albums always once on mount
        handleFetchAlbums(1, '');
    }, [location.search, handleFetchMusics, handleFetchAlbums]);

    return (
        <Box sx={styles.container}>
            {/* Add Music Modal */}
            <AddMusicFormModal
                open={openAddMusicModal}
                albums={albums}
                onClose={handleCloseAddMusicModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleAddNewMusic}
                onAudioUpload={handleAudioUpload}
            />

            {/* Edit Music Modal */}
            <EditMusicFormModal
                open={openEditMusicModal}
                albums={albums}
                onClose={handleCloseEditMusicModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleUpdateMusic}
                onAudioUpload={handleAudioUpload}
            />

            {/* Musics Table */}
            <MusicsTableSection
                loading={loading}
                musics={musics}
                page={pageDetails.pageIndex}
                openAddMusicModal={handleOpenAddMusicModal}
                onDeleteMusic={handleDeleteMusic}
                onOpenEditMusicModal={handleOpenEditMusicModal}
                totalPages={pageDetails.totalPages}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', newPage);
                    navigate(`?${params.toString()}`);
                }}
            />
        </Box>
    );
}

export default Page;