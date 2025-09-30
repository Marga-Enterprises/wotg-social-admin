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

// components
import AddAlbumFormModal from '@components/albums/AddAlbumFormModal';

// sections
import AlbumsTableSection from '@sections/AlbumsPageSections/AlbumsTableSection';

const Page = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks
    const {
        albums,
        loading,
        openAddAlbumModal,
        pageDetails,
        formValues,
        handleFetchAlbums,
        handleThumbnailUpload,
        handleFormInputChange,
        handleAddNewAlbum,
        handleOpenAddAlbumModal,
        handleCloseAddAlbumModal,
        handleDeleteAlbum,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';
        handleFetchAlbums(currentPage, search);
    }, [location.search, handleFetchAlbums]);

    return (
        <Box sx={styles.container}>
            {/* Add Album Modal */}
            <AddAlbumFormModal
                open={openAddAlbumModal}
                onClose={handleCloseAddAlbumModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleAddNewAlbum}
                onThumbnailUpload={handleThumbnailUpload}
            />

            {/* Albums Table */}
            <AlbumsTableSection
                loading={loading}
                albums={albums}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                openAddAlbumModal={handleOpenAddAlbumModal}
                onDeleteAlbum={handleDeleteAlbum}
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