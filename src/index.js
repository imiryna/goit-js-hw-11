import { fetchPics } from './js/data';
import { alertError, alertImgSuccess } from './js/utils';
import { refs, hiddenLoader, showLoader } from './js/refs';
import { createGallery } from './js/create-gallery';
import { refs } from './js/refs';

let q = '';
let pageCount = 1;
let maxPage = 0;

hiddenLoader();

refs.form.addEventListener('submit', handleSubmit);
// replaced with infinite scroll
// refs.loadMore.addEventListener('click', handlOnClick);

function handleSubmit(e) {
  e.preventDefault();
  pageCount = 1;

  q = e.target.elements.searchQuery.value.trim().replace(' ', '+');

  if (q.trim() === '') {
    alertError('Please filling your search bar.');
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

function loadMoreGallery() {
  if (pageCount === maxPage) {
    alertError("We're sorry, but you've reached the end of search results.");
  } else {
    pageCount += 1;
    let myResponse = fetchPics(q, pageCount);
    showLoader();
    myResponse.then(res => createGallery(res.data.hits));
  }
}

const handleInfiniteScroll = () => {
  const endOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (endOfPage) {
    loadMoreGallery();
  }
};

window.addEventListener('scroll', handleInfiniteScroll);
