// API
import { 
    fetchAlbumsService,
    fetchAlbumByIdService,
    createAlbumService,
    updateAlbumService,
    deleteAlbumService
} from '@services/api/albums';


// actions
export const fetchAlbumsAction = (payload) => async () => {
    try {
        const res = await fetchAlbumsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const fetchAlbumByIdAction = (payload) => async () => {
    try {
        const res = await fetchAlbumByIdService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


export const createAlbumAction = (payload) => async () => {
    try {
        const res = await createAlbumService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};
  

export const updateAlbumAction = (albumId, payload) => async () => {
    try {
        const res = await updateAlbumService(albumId, payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};

export const deleteAlbumAction = (payload) => async () => {
    try {
        const res = await deleteAlbumService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};