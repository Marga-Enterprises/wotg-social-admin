// API
import { 
    createChatroomService
} from '@services/api/chatroom'; 


// actions
export const createChatroomAction = (payload) => async () => {
    try {
        const res = await createChatroomService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
}; 