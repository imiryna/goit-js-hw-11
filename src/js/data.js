import axios from 'axios';
export { fetchPics };
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38926038-9764a0475e6c51ddc0f5eb34a';

//key=${API_KEY}&q=${_q}s&image_type=photo`

async function fetchPics(_q, p = 1) {
  try {
    const urlParams = {
      key: API_KEY,
      q: _q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: p,
    };

    const data = await axios.get(URL, {
      params: urlParams,
    });

    return data;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return error;
  }
}
