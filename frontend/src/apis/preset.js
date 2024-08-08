import { Axios } from '../util/http-commons';

const axios = Axios();

function savePreset(param, success, fail) {
  axios.post('/preset', param).then(success).catch(fail);
}

function getPresetList(param, success, fail) {
  axios.post('/preset/search', param).then(success).catch(fail);
}

export { savePreset, getPresetList };
