// API
import { 
    getPresignedUrlService
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