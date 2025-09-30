// react
import { useState, useRef, useCallback } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

// upload utility
import { uploadFileToSpaces } from '@utils/methods';
import { duration } from '@mui/material';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [openAddMusicModal, setOpenAddMusicModal] = useState(false);

    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    const [formValues, setFormValues] = useState({
        title: '',
        audio_url: '',
        genre: '',
        album_id: null,
        duration: 0,
    });


    // callback functions


    // Function to fetch musics based on the page index
    const handleFetchMusics = useCallback((pageIndex, search) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch musics
        dispatch(marga.music.fetchMusicsAction({ 
            pageIndex,
            pageSize: 10,
            search: search || '',
        }))
            .then((res) => {
                if (res.success) {
                    setMusics(res.data.musics || []);
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.currentPage || 1,
                        totalPages: res.data.totalPages || 0,
                    });
                }
                setLoading(false);
                loadingRef.current = false;
            })
            .catch(() => {
                setLoading(false);
                loadingRef.current = false;
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch]);


    return {
        musics,
        loading,
        selectedAudio,
        openAddMusicModal,
        pageDetails,
        formValues,
        handleFetchMusics,
    }
}