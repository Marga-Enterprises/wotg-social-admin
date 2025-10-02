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
    const loadingRef = useRef(false);
    const navigate = useNavigate();

    // states
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [editPostModalOpen, setEditPostModalOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    const [mediaUrls, setMediaUrls] = useState([]);

    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    const [formValues, setFormValues] = useState({
        content: '',
        mediaUrls
    });


    // callback functions


    // fetch posts function
    const handleFetchPosts = useCallback((pageIndex) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.post.fetchPostsAction({
            pageIndex,
            pageSize: 10,
            userId: 244
        }))
        .then((res) => {
            if (res.success) {
                setPosts(res.data.posts || []);
                setPageDetails({
                    totalRecords: res.data.totalItems,
                    pageIndex: res.data.currentPage,
                    totalPages: res.data.totalPages,
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


    // funtion to open add post modal
    const handleOpenAddPostModal = () => {
        setFormValues({
            content: '',
            mediaUrls: []
        });
        setMediaUrls([]);
        setAddPostModalOpen(true);
    };


    // function to close add post modal
    const handleCloseAddPostModal = () => {
        setAddPostModalOpen(false);
    };


    // function to open edit post modal
    const handleOpenEditPostModal = (post) => {
        setSelectedPost(post);
        setFormValues({
            content: post.content || '',
            mediaUrls: post.media ? post.media.map(m => m.url) : []
        });
        setMediaUrls(post.media ? post.media.map(m => m.url) : []);
        setEditPostModalOpen(true);
    };


    // function to close edit post modal
    const handleCloseEditPostModal = () => {
        setEditPostModalOpen(false);
        setSelectedPost(null);
    };


    // function to delete post
    const handleDeletePost = useCallback((postId) => {
        // confirm before deleting
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        };

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.post.deletePostAction(postId))
        .then((res) => {
            if (res.success) {
                handleFetchPosts(pageDetails.pageIndex);
                window.location.reload();
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
    }, [dispatch, handleFetchPosts]);

    return {
        loading,
        posts,
        selectedPost,
        addPostModalOpen,
        editPostModalOpen,
        pageDetails,
        formValues,
        handleFetchPosts,
        handleOpenAddPostModal,
        handleCloseAddPostModal,
        handleOpenEditPostModal,
        handleCloseEditPostModal,
        handleDeletePost,
    };
};
