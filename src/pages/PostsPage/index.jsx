// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// sections
import PostsTableSection from '@sections/PostsPageSections/PostsTableSection';

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
        selectedPost,
        addPostModalOpen,
        editPostModalOpen,
        pageDetails,
        formValues,
        handleFetchPosts,
        handleOpenAddPostModal,
        handleCloseAddPostModal,
        handleDeletePost,
        handleOpenEditPostModal,
        handleCloseEditPostModal,
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