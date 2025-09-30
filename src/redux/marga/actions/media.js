// API
import { 
    getPresignedUrlService,
    getPresignedUrlForAudiosService,
    getPresignedUrlForVideosService
} from '@services/api/media';


// actions
export const getPresignedUrlAction = (payload) => async () => {
    try {
        const res = await getPresignedUrlService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const getPresignedUrlForAudiosAction = (payload) => async () => {
    try {
        const res = await getPresignedUrlForAudiosService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const getPresignedUrlForVideosAction = (payload) => async () => {
    try {
        const res = await getPresignedUrlForVideosService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};