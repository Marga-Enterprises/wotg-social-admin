// API
import { 
    fetchBlogsService,
    fetchBlogByIdService,
    createBlogService,
    updateBlogService,
    deleteBlogService
} from '@services/api/blogs';


// actions 
export const fetchBlogsAction = (payload) => async () => {
    try {
        const res = await fetchBlogsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const fetchBlogByIdAction = (payload) => async () => {
    try {
        const res = await fetchBlogByIdService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const createBlogAction = (payload) => async () => {
    try {
        const res = await createBlogService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};
  

export const updateBlogAction = (blogId, payload) => async () => {
    try {
        const res = await updateBlogService(blogId, payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const deleteBlogAction = (payload) => async () => {
    try {
        const res = await deleteBlogService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};