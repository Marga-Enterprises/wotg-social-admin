// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box } from '@mui/material';

// sections
import BlogsTable from '@sections/BlogPageSections/BlogsTable';

// components
import AddBlogFormModal from '@components/blogs/addBlogFormModal';

// styles
import styles from './styles';

const Page = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks
    const {
        blogs,
        loading,
        pageDetails,
        openAddBlogModal,
        formValues,
        handleFetchBlogs,
        handleAddNewBlog,
        handleOpenAddBlogModal,
        handleCloseAddBlogModal,
        handleFormInputChange,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';

        handleFetchBlogs(currentPage, search);
    }, [location.search, handleFetchBlogs]);

    return (
        <Box sx={styles.container}>
            {/* Add Blog Modal */}
            <AddBlogFormModal
                open={openAddBlogModal}
                onClose={handleCloseAddBlogModal}
                formValues={formValues}
                onInputChange={handleFormInputChange}
                onSubmit={handleAddNewBlog}
            />

            {/* Blogs Table */}
            <BlogsTable
                loading={loading}
                blogs={blogs}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                openAddBlogModal={handleOpenAddBlogModal}
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