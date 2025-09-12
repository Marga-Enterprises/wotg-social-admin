// react 
import { useState, useRef, useCallback } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });
    const [openAddBlogModal, setOpenAddBlogModal] = useState(false);

    const [formValues, setFormValues] = useState({
        blog_title: '',
        blog_body: '',
        blog_intro: '',
        blog_release_date_and_time: '',
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
    const handleAddNewBlog = useCallback((e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.blog.createBlogAction(formValues))
            .then((res) => {
                if (res.success) {
                    // Navigate to the blogs list page after successful creation
                    setOpenAddBlogModal(false);

                    // reload page
                    window.location.reload();
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
    }, [dispatch, formValues, navigate]);

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
    }
};