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
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [editPostModalOpen, setEditPostModalOpen] = useState(false);
    const [postId, setPostId] = useState(null);


    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    const [formValues, setFormValues] = useState({
        content: '',
        mediaUrl: '',
        release_date: '',
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
            mediaUrls: ''
        });
        setAddPostModalOpen(true);
    };


    // function to close add post modal
    const handleCloseAddPostModal = () => {
        setAddPostModalOpen(false);
    };


    // handle media upload
    const handleMediaUpload = (file) => {
        setSelectedMedia(file);
    };


    // function to open edit post modal
    const handleOpenEditPostModal = (postId) => {
        setPostId(postId);
        setEditPostModalOpen(true);
        handleGetPostDetails(postId);
    };


    // function to close edit post modal
    const handleCloseEditPostModal = () => {
        setEditPostModalOpen(false);
        setPostId(null);
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


    // handle form input change
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // handle add post with media upload
    const handleAddPost = useCallback(async (e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let mediaUploadUrl = '';

        if (selectedMedia) {
            const file = selectedMedia;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            let res;

            try {
                if (fileType.startsWith('image/')) {
                    res = await dispatch(marga.media.getPresignedUrlAction({ fileName, fileType }));
                } else {
                    res = await dispatch(marga.media.getPresignedUrlForVideosAction({ fileName, fileType }));
                }

                const { data } = res;

                await uploadFileToSpaces(file, data.uploadUrl);

                mediaUploadUrl = fileName;
            } catch (error) {
                console.error('Media upload failed:', error);
                alert('Media upload failed. Please try again.');
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        const postData = {
            content: formValues.content,
            release_date: formValues.release_date,
            mediaUrl: mediaUploadUrl,
            mediaType: selectedMedia ? (selectedMedia.type.startsWith('image/') ? 'image' : 'video') : null,
        };

        dispatch(marga.post.createPostAction(postData))
        .then((res) => {
            if (res.success) {
                handleFetchPosts(1);
                window.location.reload();
                setAddPostModalOpen(false);
                setFormValues({
                    content: '',
                    mediaUrl: ''
                });
            } else {
                alert(res.error || 'Failed to add post. Please try again.');
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
    }, [dispatch, formValues, selectedMedia, handleFetchPosts, pageDetails.pageIndex]);


    // handle get post details for editing
    const handleGetPostDetails = useCallback((postId) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.post.fetchPostByIdAction(postId))
        .then((res) => {
            if (res.success) {
                const post = res.data;
                setFormValues({
                    content: post.content || '',
                    release_date: post.release_date ? post.release_date.split('T')[0] : '',
                    mediaUrl: post.media[0].url || '',
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


    // handle edit post with media upload
    const handleEditPost = useCallback(async (e) => {
        e.preventDefault();

        if (!postId) {
            alert('No post selected for editing.');
            return;
        }

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        let mediaUploadUrl = formValues.mediaUrl;

        if (selectedMedia) {
            const file = selectedMedia;
            const fileName = `${Date.now()}_${file.name}`;
            const fileType = file.type;

            let res;

            try {
                if (fileType.startsWith('image/')) {
                    res = await dispatch(marga.media.getPresignedUrlAction({ fileName, fileType }));
                } else {
                    res = await dispatch(marga.media.getPresignedUrlForVideosAction({ fileName, fileType }));
                }

                const { data } = res;

                await uploadFileToSpaces(file, data.uploadUrl);

                mediaUploadUrl = fileName;
            } catch (error) {
                console.error('Media upload failed:', error);
                alert('Media upload failed. Please try again.');
                setLoading(false);
                loadingRef.current = false;
                return;
            }
        }

        const postData = {
            content: formValues.content,
            release_date: formValues.release_date,
            mediaUrl: mediaUploadUrl,
            mediaType: selectedMedia ? (selectedMedia.type.startsWith('image/') ? 'image' : 'video') : (formValues.mediaUrl ? 'image' : null),
        };

        dispatch(marga.post.updatePostAction(postId, postData))
        .then((res) => {
            if (res.success) {
                handleFetchPosts(pageDetails.pageIndex);
                window.location.reload();
                setEditPostModalOpen(false);
                setPostId(null);
                setFormValues({
                    content: '',
                    mediaUrl: ''
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
    }, [dispatch, formValues, selectedMedia, postId, handleFetchPosts, pageDetails.pageIndex]);


    return {
        loading,
        posts,
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
        handleFormInputChange,
        handleAddPost,
        handleMediaUpload,
        handleEditPost,
    };
};
