// Google Cloud 관련 API
import { Google } from '../util/http-commons';

const google = Google();

function textToSpeechApi(param, success, fail) {
  google.post('', param).then(success).catch(fail);
}

export { textToSpeechApi };
