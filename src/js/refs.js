export { refs, hiddenLoader, showLoader, hiddenLoadBtn, showLoadBtn };

const refs = {
  form: document.getElementById('search-form'),
  btn: document.querySelector('btn'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

function hiddenLoader() {
  refs.loader.classList.replace('loader', 'is-hidden');
}

function showLoader() {
  refs.loader.classList.replace('is-hidden', 'loader');
}

function hiddenLoadBtn() {
  refs.loadMore.classList.replace('load-more', 'is-hidden');
}
function showLoadBtn() {
  refs.loadMore.classList.replace('is-hidden', 'load-more');
}
