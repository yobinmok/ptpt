import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

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

export const createStudyRoom = async (user, roomInfo) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/studyRoom`, {
      studyRoomTitle: roomInfo.roomname,
      studyRoomPw: roomInfo.roompw,
      memberId: 1234567, // 방장 아이디(host)
      isPublic: roomInfo.roomopen,
      presentationTime: roomInfo.roomtime,
      subject: roomInfo.roomtopic,
      description: roomInfo.roomcomment,
      anonymity: roomInfo.roomhidden,
      entryList: [0], // 사용자 추가
    });
    // response.data == roomId
    return response.data;
  } catch (error) {
    console.log('create study room error : ' + error);
  }
};

export const detailStudyRoom = async (path) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/studyRoom/${path}`);
    return response.data;
  } catch (error) {
    console.log('room detail get error : ' + error);
  }
};

export const loadRoomList = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/studyRoom`);
    return response;
  } catch (error) {
    console.log('list error : ', error);
  }
};

export const searchByStudyRoomName = async (studyRoomTitle) => {
  try {
    axios.get(`${VITE_API_URL}/studyRoom/${studyRoomTitle}`);
    return response;
  } catch (error) {
    console.log('searchByStudyRoomTitle error : ' + error);
  }
};
