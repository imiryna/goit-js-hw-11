import axios from 'axios';
export { fetchPics };
import { showLoader, hiddenLoader } from './refs';
import { alertError } from './utils';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38926038-9764a0475e6c51ddc0f5eb34a';

async function fetchPics(_q, p = 1, per_p = 40) {
  try {
    const urlParams = {
      key: API_KEY,
      q: _q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: p,
      per_page: per_p,
    };
    showLoader();

    const data = await axios.get(URL, {
      params: urlParams,
    });
    // while waiting - showing loader
    hiddenLoader();

    return data;
  } catch (error) {
    alertError('Something went wrong, please try again.');
    return error;
  }
}
