import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'Bir hata oluştu',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export async function createUser(username) {
  try {
    const response = await apiClient.post('/api/Users', { username });
    return response.data;
  } catch (error) {
    console.error('Kullanıcı oluşturma hatası:', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await apiClient.get('/api/Users');
    return response.data;
  } catch (error) {
    console.error('Kullanıcıları getirme hatası:', error);
    throw error;
  }
}

export async function getMessages(limit, afterId) {
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (afterId) params.afterId = afterId;
    
    const response = await apiClient.get('/api/Messages', { params });
    return response.data;
  } catch (error) {
    console.error('Mesajları getirme hatası:', error);
    throw error;
  }
}

export async function sendMessage(userId, content) {
  try {
    const response = await apiClient.post('/api/Messages', {
      userId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    throw error;
  }
}

export default apiClient;

