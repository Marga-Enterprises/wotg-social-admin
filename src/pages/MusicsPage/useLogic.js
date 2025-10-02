// react
import { useState, useRef, useCallback, use } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

// upload utility
import { uploadFileToSpaces } from '@utils/methods';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [musics, setMusics] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [openAddMusicModal, setOpenAddMusicModal] = useState(false);
    const [openEditMusicModal, setOpenEditMusicModal] = useState(false);
    const [musicId, setMusicId] = useState(null);

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
    const handleFetchMusics = useCallback(async (pageIndex, search) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const res = await dispatch(
                marga.music.fetchMusicsAction({
                    pageIndex,
                    pageSize: 10,
                    search: search || '',
                })
            );

            if (res.success) {
                setMusics(res.data.musics || []);
                setPageDetails({
                    totalRecords: res.data.totalRecords || 0,
                    pageIndex: res.data.currentPage || 1,
                    totalPages: res.data.totalPages || 0,
                });
            } else {
                console.error('Failed to fetch musics:', res.error);
            }
        } catch (err) {
            console.error('Error fetching musics:', err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [dispatch]);


    // Function to fetch albums for the dropdown
    const handleFetchAlbums = useCallback(async (pageIndex, search) => {

        try {
            const res = await dispatch(
                marga.album.fetchAlbumsAction({
                    pageIndex,
                    pageSize: 500,
                    search: search || '',
                })
            );

            if (res.success) {
                setAlbums(res.data.albums || []);
                setPageDetails({
                    totalRecords: res.data.totalRecords || 0,
                    pageIndex: res.data.currentPage || 1,
                    totalPages: res.data.totalPages || 0,
                });
            } else {
                console.error('Failed to fetch albums:', res.error);
            }
        } catch (err) {
            console.error('Error fetching albums:', err);
        }
    }, [dispatch]);


    // Function to handle form input changes
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    // Function to open add album modal
    const handleOpenAddMusicModal = () => {
        setOpenAddMusicModal(true);
    };


    // Function to close add album modal
    const handleCloseAddMusicModal = () => {
        setOpenAddMusicModal(false);
    };


    // Function to handle audio upload
    const handleAudioUpload = useCallback((file) => {
        setSelectedAudio(file);
    }, []);


    // Function to add a new music
    const handleAddNewMusic = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let audioUrl = '';
        let duration = 0;

        // Upload audio if a new file is selected
        if (selectedAudio) {
            const file = selectedAudio;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            try {
                const res = await dispatch(
                    marga.media.getPresignedUrlForAudiosAction({
                        fileName,
                        fileType,
                    })
                );

                if (res.error) {
                    console.error('Failed to get presigned URL:', res.error);
                    setLoading(false);
                    loadingRef.current = false;
                    return;
                }

                const { data } = res;

                // ✅ Upload file to Spaces
                await uploadFileToSpaces(file, data.uploadUrl);

                // ✅ Save final URL for DB (your API likely provides it or reconstruct it)
                audioUrl = data.publicUrl || data.fileUrl || fileName;

                // ✅ Detect duration using Audio element
                duration = await new Promise((resolve) => {
                    const audio = document.createElement('audio');
                    audio.src = URL.createObjectURL(file);
                    audio.addEventListener('loadedmetadata', () => {
                    resolve(Math.floor(audio.duration)); // seconds
                    });
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        const payload = {
            ...formValues,
            audio_url: audioUrl,
            duration, // ✅ add duration to payload
        };

        // Dispatch the action to add a new music
        dispatch(marga.music.createMusicAction(payload))
            .then((res) => {
                if (res.success) {
                    handleCloseAddMusicModal();
                    window.location.reload();
                } else {
                    console.error('Failed to add music:', res.error);
                    alert(`Error: ${res.error || 'Failed to add music'}`);
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
    }, [dispatch, formValues, selectedAudio]);


    // Function to delete a music
    const handleDeleteMusic = useCallback((musicId) => {
        if (!window.confirm('Are you sure you want to delete this music?')) return;

        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.music.deleteMusicAction(musicId))
            .then((res) => {
                if (res.success) {
                    handleFetchMusics(pageDetails.pageIndex, ''); // Refresh current page
                    window.location.reload();
                } else {
                    console.error('Failed to delete music:', res.error);
                    alert(`Error: ${res.error || 'Failed to delete music'}`);
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
    }, [dispatch, pageDetails.pageIndex, handleFetchMusics]);


    // Function to get music By ID for editing
    const handleGetMusicById = useCallback((musicId) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.music.fetchMusicByIdAction(musicId))
            .then((res) => {
                if (res.success) {
                    const music = res.data;
                    setFormValues({
                        title: music.title || '',
                        audio_url: music.audio_url || '',
                        genre: music.genre || '',
                        album_id: music.album_id || null,
                        duration: music.duration || 0,
                    });
                } else {
                    console.error('Failed to fetch music:', res.error);
                    alert(`Error: ${res.error || 'Failed to fetch music'}`);
                }
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


    // Function to update music
    const handleUpdateMusic = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let audioUrl = formValues.audio_url;
        let duration = formValues.duration;

        // Upload audio if a new file is selected
        if (selectedAudio) {
            const file = selectedAudio;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;
            try {
                const res = await dispatch(
                    marga.media.getPresignedUrlForAudiosAction({
                        fileName,
                        fileType,
                    })
                );

                if (res.error) {
                    console.error('Failed to get presigned URL:', res.error);
                    setLoading(false);
                    loadingRef.current = false;
                    return;
                }

                const { data } = res;

                // ✅ Upload file to Spaces
                await uploadFileToSpaces(file, data.uploadUrl);

                // ✅ Save final URL for DB (your API likely provides it or reconstruct it)
                audioUrl = data.publicUrl || data.fileUrl || fileName;

                // ✅ Detect duration using Audio element
                duration = await new Promise((resolve) => {
                    const audio = document.createElement('audio');
                    audio.src = URL.createObjectURL(file);
                    audio.addEventListener('loadedmetadata', () => {
                    resolve(Math.floor(audio.duration)); // seconds
                    });
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        const payload = {
            ...formValues,
            audio_url: audioUrl,
            duration, // ✅ add duration to payload
        };

        // Dispatch the action to update the music
        dispatch(marga.music.updateMusicAction(musicId, payload))
            .then((res) => {
                if (res.success) {
                    handleCloseEditMusicModal();
                    window.location.reload();
                    // navigate('/musics?page=1'); // Redirect to musics list
                } else {
                    console.error('Failed to update music:', res.error);
                    alert(`Error: ${res.error || 'Failed to update music'}`);
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
    }, [dispatch, formValues, selectedAudio, musicId]);

    // Function to open edit music modal
    const handleOpenEditMusicModal = (id) => {
        setMusicId(id);
        handleGetMusicById(id);
        setOpenEditMusicModal(true);
    };


    // Function to close edit music modal
    const handleCloseEditMusicModal = () => {
        setOpenEditMusicModal(false);
        setMusicId(null);
        setFormValues({
            title: '',
            audio_url: '',
            genre: '',
            album_id: null,
            duration: 0,
        });
        setSelectedAudio(null);
    };

    return {
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
    }
}