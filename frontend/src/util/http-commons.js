import axios from 'axios';

const { VITE_GOOGLE_API_KEY, VITE_GOOGLE_TTS_API_URL } = import.meta.env;

const Axios = axios.create();
// function Axios() {
//   const instance = axios.create({
//     baseURL: VITE_API_URL,
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   });

//   return instance;
// }

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

export { Axios, Google, Google_STT };
