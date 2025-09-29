// API
import { 
    fetchMusicsService,
    fetchMusicByIdService,
    createMusicService,
    updateMusicService,
    deleteMusicService
} from '@services/api/musics';


// actions
export const fetchMusicsAction = (payload) => async () => {
    try {
        const res = await fetchMusicsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const fetchMusicByIdAction = (payload) => async () => {
    try {
        const res = await fetchMusicByIdService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const createMusicAction = (payload) => async () => {
    try {
        const res = await createMusicService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};
  

export const updateMusicAction = (musicId, payload) => async () => {
    try {
        const res = await updateMusicService(musicId, payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const deleteMusicAction = (payload) => async () => {
    try {
        const res = await deleteMusicService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};