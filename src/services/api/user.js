// utils 
import * as methods from '@utils/methods';

// requests
import { POST, GET } from '@services/request';

export async function loginService(payload) {
  return POST('/auth/login', payload);
}

export async function fetchUsersService(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/user?${params}`);
};

export async function fetchUserDetailService(userId) {
  return GET(`/user/${userId}`);
}