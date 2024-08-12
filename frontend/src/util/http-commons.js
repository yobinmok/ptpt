import axios from 'axios';

const {
  VITE_API_URL,
  VITE_GOOGLE_API_KEY,
  VITE_GOOGLE_TTS_API_URL,
  VITE_NODE_API_URL,
} = import.meta.env;

function Axios() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    // withCredentials: true, // 쿠키 기반 인증을 위해 추가된 부분
  });

  return instance;
}

function AxiosMulti() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // withCredentials: true, // 쿠키 기반 인증을 위해 추가된 부분
  });

  return instance;
}

function Google() {
  const instance = axios.create({
    baseURL:
      VITE_GOOGLE_TTS_API_URL + '/text:synthesize?key=' + VITE_GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return instance;
}

function Google_STT() {
  const instance = axios.create({
    baseURL: VITE_GOOGLE_TTS_API_URL + '/?key=' + VITE_GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return instance;
}

function RecordOV() {
  const instance = axios.create({
    baseURL: VITE_NODE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
}

export { Axios, AxiosMulti, Google, Google_STT, RecordOV };

// --------------------------------

// function Axios() {
//   const instance = axios.create({
//     baseURL: VITE_API_URL,
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     withCredentials: true, // 쿠키 기반 인증을 위해 추가된 부분
//   });

//   // 요청 인터셉터: 모든 요청에 대해 특정 작업을 수행하고 싶을 때 사용
//   instance.interceptors.request.use(
//     (config) => {
//       // 예를 들어, 인증 토큰을 모든 요청의 헤더에 추가
//       // const token = 'your_token_here'; // 예: JWT 토큰을 여기서 가져옵니다.
//       // if (token) {
//       //   config.headers.Authorization = `Bearer ${token}`;
//       // }
//       return config;
//     },
//     (error) => {
//       // 요청 오류가 발생한 경우 처리
//       return Promise.reject(error);
//     }
//   );

//   // 응답 인터셉터: 모든 응답에 대해 특정 작업을 수행하고 싶을 때 사용
//   instance.interceptors.response.use(
//     (response) => {
//       // 응답 데이터를 가공하거나 로그를 남길 수 있습니다.
//       return response;
//     },
//     (error) => {
//       // 오류 응답에 대해 처리할 수 있습니다.
//       // 예를 들어, 인증 오류가 발생한 경우 로그아웃 처리를 할 수 있습니다.
//       // if (error.response && error.response.status === 401) {
//       //   // 로그아웃 로직을 여기서 처리
//       // }
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// }

// function AxiosMulti() {
//   const instance = axios.create({
//     baseURL: VITE_API_URL,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     withCredentials: true, // 쿠키 기반 인증을 위해 추가된 부분
//   });

//   return instance;
// }

// --------------------------------
