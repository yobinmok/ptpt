import axios from 'axios';

// 엑세스 토큰 요청 함수
export const fetchAccessToken = async (authorizationCode, provider) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/oauth/${provider}`,
      {
        code: authorizationCode,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};
