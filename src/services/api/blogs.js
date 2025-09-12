// utils 
import * as methods from '@utils/methods';

// requests
import { GET, POST, PUT, DELETE } from '@services/request';

export async function fetchBlogsService(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/blog?${params}`);
};

export async function fetchBlogByIdService(blogId) {
  return GET(`/blog/${blogId}`);
};

export async function createBlogService(payload) {
  return POST('/blog', payload);
};

export async function updateBlogService(blogId, payload) {
  return PUT(`/blog/${blogId}`, payload);
};

export async function deleteBlogService(blogId) {
  return DELETE(`/blog/${blogId}`);
};