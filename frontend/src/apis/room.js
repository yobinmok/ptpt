import { Axios } from '../util/http-commons';
const { VITE_API_URL } = import.meta.env;
const axios = Axios();

// 엑세스 토큰 요청 함수
// export const fetchAccessToken = async (authorizationCode, provider) => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/oauth/${provider}`,
//       {
//         code: authorizationCode,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//     throw error;
//   }
// };

export const createStudyRoom = async (user, roomInfo) => {
  try {
    const response = await axios.post(`/studyRoom`, {
      studyRoomTitle: roomInfo.roomname,
      studyRoomPw: roomInfo.roompw,
      memberId: user, // 방장 아이디(host)
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
    const response = await axios.get(`/studyRoom/${path}`);
    return response.data;
  } catch (error) {
    console.log('room detail get error : ' + error);
  }
};

export const loadRoomList = async () => {
  try {
    await Axios.post;
    const response = await axios.get(`/studyRoom`);
    return response;
  } catch (error) {
    console.log('list error : ', error);
  }
};

export const searchByStudyRoomName = async (studyRoomTitle) => {
  try {
    const response = axios.get(`/studyRoom/${studyRoomTitle}`);
    return response;
  } catch (error) {
    console.log('searchByStudyRoomTitle error : ' + error);
  }
};

// 비밀번호가 틀렸을 때의 response를 RoomListItem으로 어떻게 가져오지?
export const checkStudyRoomPW = async (studyRoomId, studyRoomPw) => {
  try {
    const response = await axios.post(`/studyRoom/pwCheck`, {
      studyRoomId: studyRoomId,
      studyRoomPw: studyRoomPw,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log('checkPW error : ' + error);
    return error;
  }
};

// 평가 관련 함수
// user oauth id도 입력값으로 받아오기
export const submitEvaluate = async (evaluateInfo, studyRoomId) => {
  try {
    const response = await axios.post(`/evaluation `, {
      delivery: evaluateInfo.delivery,
      expression: evaluateInfo.expression,
      preparation: evaluateInfo.preparation,
      logic: evaluateInfo.logic,
      suitability: evaluateInfo.suitability,
      oauthId: 'G123',
      commentContent: '',
      isAnonymous: evaluateInfo.isAnonymous,
      studyRoomId: studyRoomId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const takeMyEvaluate = async (studyRoomId, userId) => {
  try {
    const response = await axios.post(`/evaluation/feedBack`, {
      studyRoomId: studyRoomId,
      oauthId: 'G123',
    });
    return response;
  } catch (error) {
    console.log('take my evaluate info error : ' + error);
  }
};
