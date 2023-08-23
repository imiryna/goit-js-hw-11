import { fetchPics } from './js/data';
import { alertError, alertImgSuccess } from './js/utils';
import {
  refs,
  hiddenLoader,
  showLoader,
  hiddenLoadBtn,
  showLoadBtn,
} from './js/refs';
import { createGallery } from './js/create-gallery';
import { refs } from './js/refs';

let q = '';
let pageCount = 1;
let maxPage = 0;

hiddenLoader();
hiddenLoadBtn();

refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handlOnClick);

function handleSubmit(e) {
  e.preventDefault();

  showLoadBtn();

  q = e.target.elements.searchQuery.value.trim().replace(' ', '+');

  if (q.trim() === '') {
    alertError('Please filling your search bar.');
    hiddenLoadBtn();
    return;
  }

  let resp = fetchPics(q);
  resp.then(res_data => {
    if (res_data.data.totalHits === 0) {
      alertError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      maxPage = Math.ceil(res_data.data.totalHits / 40);

      createGallery(res_data.data.hits);

      alertImgSuccess(res_data.data.totalHits);
    }
  });
  showLoader();
  cleanForm();
  clearGallery();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function cleanForm() {
  refs.form.reset();
}

function handlOnClick() {
  if (pageCount === maxPage) {
    hiddenLoadBtn();
    alertError("We're sorry, but you've reached the end of search results.");
  } else {
    pageCount += 1;
    let myResponse = fetchPics(q, pageCount);
    myResponse.then(res => createGallery(res.data.hits));
  }
}
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
