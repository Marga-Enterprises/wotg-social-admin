// react 
import { useState, useRef, useCallback } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

// custom hook for managing blogs page logic
import { uploadFileToSpaces } from '@utils/methods';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [openAddBlogModal, setOpenAddBlogModal] = useState(false);

    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    const [formValues, setFormValues] = useState({
        blog_title: '',
        blog_body: '',
        blog_intro: '',
        blog_release_date_and_time: '',
        blog_thumbnail: '',
    });


    // callback functions

    // Function to fetch blogs based on the page index
    const handleFetchBlogs = useCallback((pageIndex, search) => {
        console.log('Fetching blogs for page:', pageIndex, 'with search:', search);

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch blogs
        dispatch(marga.blog.fetchBlogsAction({ 
            pageIndex, 
            pageSize: 10,
            search: search || '',
        }))
            .then((res) => {
                if (res.success) {
                    setBlogs(res.data.blogs || []);
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.pageIndex || 1,
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


    // Function to open the add blog modal
    const handleOpenAddBlogModal = useCallback(() => {
        setOpenAddBlogModal(true);
    }, []);


    // Function to close the add blog modal
    const handleCloseAddBlogModal = useCallback(() => {
        setOpenAddBlogModal(false);
    }, []);


    // Functon to handle form input changes
    const handleFormInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);


    // Function to add a new blog
    const handleAddNewBlog = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let thumbnailFileName = '';

        // Upload thumbnail if selected
        if (selectedThumbnail) {
            console.log('[[[[[Uploading thumbnail:]]]]]', selectedThumbnail);

            const file = selectedThumbnail;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            console.log('Generated fileName for thumbnail:', fileName);
            console.log('File type:', fileType);

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

                thumbnailFileName = fileName;

            } catch (err) {
                console.error('Thumbnail upload failed:', err);
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        const payload = {
            ...formValues,
            blog_thumbnail: thumbnailFileName || formValues.blog_thumbnail || '',
        };

        dispatch(marga.blog.createBlogAction(payload))
            .then((res) => {
                if (res.success) {
                    setOpenAddBlogModal(false);
                    // window.location.reload();
                } else {
                    console.error('Error creating blog:', res.error);
                }
            })
            .catch((err) => {
                console.error('Error creating blog:', err);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch, formValues, navigate, selectedThumbnail]);


    // Function to handle thumbnail upload
    const handleThumbnailUpload = useCallback((file) => {
        setSelectedThumbnail(file);
    }, []);


    return {
        blogs,
        loading,
        openAddBlogModal,
        pageDetails,
        formValues,
        handleFetchBlogs,
        handleAddNewBlog,
        handleOpenAddBlogModal,
        handleCloseAddBlogModal,
        handleFormInputChange,
        handleThumbnailUpload,
    }
};