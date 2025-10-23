// requests
import { POST } from '@services/requestMainWeb';

export async function createChatroomService(payload) {  
  return POST('/chatrooms', payload);
};