// requests
import { POST } from '@services/request';

export async function getPresignedUrlService(payload) {
  return POST('/media/presigned-url', payload);
};