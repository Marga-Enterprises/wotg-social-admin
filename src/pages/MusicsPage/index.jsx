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

const Page = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks
    const {
        musics,
        loading,
        selectedAudio,
        openAddMusicModal,
        pageDetails,
        formValues,
        handleFetchMusics,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';
        handleFetchMusics(currentPage, search);
    }, [location.search, handleFetchMusics]);

    return (
        <Box sx={styles.container}>
            <div style={styles.container}>MusicsPage</div>
        </Box>
    );
}

export default Page;