// API
import {
    fetchPostsService,
    fetchPostByIdService,
    createPostService,
    updatePostService,
    deletePostService
} from '@services/api/post';


// actions
export const fetchPostsAction = (payload) => async () => {
    try {
        const res = await fetchPostsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const fetchPostByIdAction = (payload) => async () => {
    try {
        const res = await fetchPostByIdService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const createPostAction = (payload) => async () => {
    try {
        const res = await createPostService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const updatePostAction = (postId, payload) => async () => {
    try {
        const res = await updatePostService(postId, payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const deletePostAction = (payload) => async () => {
    try {
        const res = await deletePostService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};