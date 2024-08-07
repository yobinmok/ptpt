import { AxiosMulti, Google } from '../util/http-commons';

const axiosMulti = AxiosMulti();
const google = Google();

function textToSpeechApi(param, success, fail) {
  google.post('', param).then(success).catch(fail);
}

function uploadAudioApi(param, success, fail) {
  axiosMulti.post('/voiceModel/audio', param).then(success).catch(fail);
}

export { textToSpeechApi, uploadAudioApi };
