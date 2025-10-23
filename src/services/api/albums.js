// utils 
import * as methods from '@utils/methods';

// requests
import { GET, POST, PUT, DELETE } from '@services/requestAdminWeb';

export async function fetchAlbumsService(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/album?${params}`);
};

export async function fetchAlbumByIdService(albumId) {
  return GET(`/album/${albumId}`);
}

export async function createAlbumService(payload) {
  return POST('/album', payload);
};

export async function updateAlbumService(albumId, payload) {
  return PUT(`/album/${albumId}`, payload);
};

export async function deleteAlbumService(albumId) {
  return DELETE(`/album/${albumId}`);
};