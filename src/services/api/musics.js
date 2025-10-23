// utils 
import * as methods from '@utils/methods';

// requests
import { GET, POST, PUT, DELETE } from '@services/requestAdminWeb';

export async function fetchMusicsService(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/music?${params}`);
};

export async function fetchMusicByIdService(musicId) {
  return GET(`/music/${musicId}`);
};

export async function createMusicService(payload) {
  return POST('/music', payload);
};

export async function updateMusicService(musicId, payload) {
  return PUT(`/music/${musicId}`, payload);
};

export async function deleteMusicService(musicId) {
  return DELETE(`/music/${musicId}`);
};