// utils 
import * as methods from '@utils/methods';

// requests
import { GET, POST, PUT, DELETE } from '@services/requestAdminWeb';

export async function fetchPostsService(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/post?${params}`);
};

export async function fetchPostByIdService(postId) {
  return GET(`/post/${postId}`);
};

export async function createPostService(payload) {
  return POST('/post', payload);
};

export async function updatePostService(postId, payload) {
  return PUT(`/post/${postId}`, payload);
};

export async function deletePostService(postId) {
  return DELETE(`/post/${postId}`);
};

