// Google Cloud 관련 API
import { Google } from '../util/http-commons';

const google = Google();

function textToSpeeachApi(param, success, fail) {
  google.post('', param).then(success).catch(fail);
}

export { textToSpeeachApi };
