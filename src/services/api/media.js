// requests
import { POST } from '@services/requestAdminWeb';

export async function getPresignedUrlService(payload) {
  return POST('/media/presigned-url', payload);
};

export async function getPresignedUrlForAudiosService(payload) {
  return POST('/media/presigned-url/audios', payload);
};

export async function getPresignedUrlForVideosService(payload) {
  return POST('/media/presigned-url/videos', payload);
};