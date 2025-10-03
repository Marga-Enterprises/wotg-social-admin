// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// sections
import PostsTableSection from '@sections/PostsPageSections/PostsTableSection';

// components
import AddPostFormModal from '@components/posts/AddPostFormModal';
import EditPostFormModal from '@components/posts/EditPostFormModal';

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
    } = useLogic();


    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';
        handleFetchPosts(currentPage, search);
    }, [location.search, handleFetchPosts]);

    return (
        <Box sx={styles.container}>
            {/* Add Post Modal */}
            <AddPostFormModal
                open={addPostModalOpen}
                onClose={handleCloseAddPostModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleAddPost}
                onMediaUpload={handleMediaUpload}
            />

            {/* Edit Post Modal */}
            <EditPostFormModal
                open={editPostModalOpen}
                onClose={handleCloseEditPostModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleEditPost}
                onMediaUpload={handleMediaUpload}
            />

            {/* Posts Table */}
            <PostsTableSection
                loading={loading}
                posts={posts}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                openAddPostModal={handleOpenAddPostModal}
                onDeletePost={handleDeletePost}
                onOpenEditPostModal={handleOpenEditPostModal}
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