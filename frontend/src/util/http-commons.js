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
    withCredentials: true, // 쿠키를 포함하여 요청
  });

  return instance;
}

function AxiosMulti() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // 쿠키를 포함하여 요청
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
    withCredentials: true, // 쿠키를 포함하여 요청
  });

  return instance;
}

function Google_STT() {
  const instance = axios.create({
    baseURL: VITE_GOOGLE_TTS_API_URL + '/?key=' + VITE_GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true, // 쿠키를 포함하여 요청
  });

  return instance;
}

function RecordOV() {
  const instance = axios.create({
    baseURL: VITE_NODE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키를 포함하여 요청
  });

  return instance;
}

export { Axios, AxiosMulti, Google, Google_STT, RecordOV };
