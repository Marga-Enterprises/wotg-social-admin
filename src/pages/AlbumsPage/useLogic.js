// react
import { useState, useRef, useCallback } from 'react';

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
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [openAddAlbumModal, setOpenAddAlbumModal] = useState(false);
    const [openEditAlbumModal, setOpenEditAlbumModal] = useState(false);
    const [albumId, setAlbumId] = useState(null);

    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    const [formValues, setFormValues] = useState({
        title: '',
        cover_image: '',
    });


    // callback functions


    // Function to fetch albums based on the page index
    const handleFetchAlbums = useCallback((pageIndex, search) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch albums
        dispatch(marga.album.fetchAlbumsAction({ 
            pageIndex,
            pageSize: 10,
            search: search || '',
        }))
            .then((res) => {
                if (res.success) {
                    setAlbums(res.data.albums || []);
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


    // Function to add a new album
    const handleAddNewAlbum = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let coverImageUrl = '';

        // Upload the thumbnail if selected
        if (selectedThumbnail) {
            const file = selectedThumbnail;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            try {
                const res = await dispatch(marga.media.getPresignedUrlAction({
                    fileName,
                    fileType,
                }));

                if (res.error) {
                    console.error('Failed to get presigned URL:', res.error);
                    setLoading(false);
                    loadingRef.current = false;
                    return;
                } 

                const { data } = res;

                await uploadFileToSpaces(file, data.uploadUrl); // 👈 USE HELPER HERE

                coverImageUrl = fileName;
            } catch (error) {
                console.error('Error uploading file:', error);
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        };

        const payload = {
            ...formValues,
            cover_image: coverImageUrl || formValues.cover_image || '',
        };

        dispatch(marga.album.createAlbumAction(payload))
            .then((res) => {
                if (res.success) {
                    setOpenAddAlbumModal(false);
                    navigate(`/albums?page=${pageDetails.pageIndex}`);
                } else {
                    console.error('Error creating album:', res.error);
                }
            })
            .catch((err) => {
                console.error('Error creating album:', err);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch, formValues, selectedThumbnail, navigate, pageDetails.pageIndex]);


    // Function to handle form input changes
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Function to handle thumbnail upload
    const handleThumbnailUpload = useCallback((file) => {
        setSelectedThumbnail(file);
    }, []);

    
    // Function to open add album modal
    const handleOpenAddAlbumModal = () => {
        setOpenAddAlbumModal(true);
    };


    // Function to close add album modal
    const handleCloseAddAlbumModal = () => {
        setOpenAddAlbumModal(false);
    };


    // Function to open edit album modal
    const handleOpenEditAlbumModal = (albumId) => {
        handleFetchAlbumById(albumId);
        setAlbumId(albumId);
        setOpenEditAlbumModal(true);
    };


    // Function to close edit album modal
    const handleCloseEditAlbumModal = () => {
        setFormValues({
            title: '',
            cover_image: '',
        });
        setAlbumId(null);
        setSelectedThumbnail(null);
        setOpenEditAlbumModal(false);
    };


    // function do delete an album
    const handleDeleteAlbum = useCallback((albumId) => {
        if (!window.confirm("Are you sure you want to delete this album?")) {
            return; // user canceled
        }

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.album.deleteAlbumAction(albumId))
            .then((res) => {
                if (res.success) {
                    window.location.reload();
                } else {
                    console.error('Error deleting album:', res.error);
                }
                setLoading(false);
                loadingRef.current = false;
            })
            .catch((err) => {
                console.error('Error deleting album:', err);
                setLoading(false);
                loadingRef.current = false;
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch, pageDetails.pageIndex]);


    // function to get album by id 
    const handleFetchAlbumById = useCallback((albumId) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.album.fetchAlbumByIdAction(albumId))
            .then((res) => {
                if (res.success) {
                    setFormValues({
                        title: res.data.title || '',
                        cover_image: res.data.cover_image || '',
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


    // Function to update an existing album
    const handleUpdateAlbum = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let coverImageUrl = '';

        // Upload the thumbnail if selected
        if (selectedThumbnail) {
            const file = selectedThumbnail;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            try {
                const res = await dispatch(marga.media.getPresignedUrlAction({
                    fileName,
                    fileType,
                }));

                if (res.error) {
                    console.error('Failed to get presigned URL:', res.error);
                    setLoading(false);
                    loadingRef.current = false;
                    return;
                }

                const { data } = res;

                await uploadFileToSpaces(file, data.uploadUrl); // 👈 USE HELPER HERE

                coverImageUrl = fileName;
            } catch (error) {
                console.error('Error uploading file:', error);
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        };

        const payload = {
            ...formValues,
            cover_image: coverImageUrl || formValues.cover_image || '',
        };

        dispatch(marga.album.updateAlbumAction(albumId, payload))
            .then((res) => {
                if (res.success) {
                    setOpenEditAlbumModal(false);
                    navigate(`/albums?page=${pageDetails.pageIndex}`);
                } else {
                    console.error('Error updating album:', res.error);
                }
            })
            .catch((err) => {
                console.error('Error updating album:', err);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch, formValues, selectedThumbnail, navigate, pageDetails.pageIndex]);

    return {
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
    };
};