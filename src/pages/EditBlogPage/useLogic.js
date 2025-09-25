// react
import { useState, useRef, useCallback } from 'react';

// react-redux
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
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [formValues, setFormValues] = useState({
        blog_title: '',
        blog_body: '',
        blog_intro: '',
        blog_release_date_and_time: '',
        blog_thumbnail: '',
    });


    // callback functions

    // Function to fetch blog details by ID
    const handleFetchBlogById = useCallback((blogId) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch blog by ID
        dispatch(marga.blog.fetchBlogByIdAction(blogId))
            .then((res) => {
                if (res.success) {
                    setBlogData(res.data || null);
                    setFormValues({
                        blog_title: res.data.blog_title || '',
                        blog_body: res.data.blog_body || '',
                        blog_intro: res.data.blog_intro || '',
                        blog_release_date_and_time: res.data.blog_release_date_and_time || '',
                        blog_thumbnail: res.data.blog_thumbnail || '',
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


    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Function to handle thumbnail upload
    const handleThumbnailUpload = useCallback((file) => {
        setSelectedThumbnail(file);
    }, []);

    // function to update blog
    const handleUpdateBlog = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let thumbnailFileName = '';

        // If a new thumbnail is selected, upload it to Spaces
        if (selectedThumbnail) {
            const uploadResult = await uploadFileToSpaces(selectedThumbnail);
            if (uploadResult.success) {
                thumbnailFileName = uploadResult.fileName;
            } else {
                // Handle upload error
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        // Prepare the updated blog data
        const updatedBlogData = {
            ...formValues,
            blog_thumbnail: thumbnailFileName || formValues.blog_thumbnail,
        };

        // Dispatch the action to update the blog
        dispatch(marga.blog.updateBlogAction(blogData.id, updatedBlogData))
            .then((res) => {
                if (res.success) {
                    // Navigate back to blogs list or show success message
                    // navigate('/blogs');
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
    }, [formValues, selectedThumbnail]);


    return {
        blogData,
        loading,
        formValues,
        selectedThumbnail,
        handleInputChange,
        handleThumbnailUpload,
        handleFetchBlogById,
        handleUpdateBlog,
    };
};