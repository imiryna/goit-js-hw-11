export { alertError, alertImgSuccess };

import { Notify } from 'notiflix';

function alertError(text) {
  Notify.failure(text);
}

function alertImgSuccess(data) {
  Notify.success(`Hooray! We found ${data} images.`);
}
