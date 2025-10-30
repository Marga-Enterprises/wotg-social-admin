// API
import { 
    sendMessageService 
} from '@services/api/message';


// actions
export const sendMessageAction = (payload) => async () => {
    try {
        const res = await sendMessageService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};
