// requests
import { POST } from '@services/requestMainWeb';

export async function sendMessageService(payload) {  
  return POST('/messages/send-text', payload);
};