import { fetchPics } from './js/data';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createGallery } from './js/create-gallery';
import './index.css';

const refs = {
  form: document.getElementById('search-form'),
  btn: document.querySelector('btn'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more'),
};

let q = '';
let pageCount = 1;
const perPage = 40;

refs.loader.classList.replace('loader', 'is-hidden');
refs.loadMore.classList.replace('load-more', 'is-hidden');

refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handlOnClick);

function handleSubmit(e) {
  e.preventDefault();
  q = e.target.elements.searchQuery.value.trim().replace(' ', '+');
  if (q.trim() === '') {
    Notify.failure('Please filling your search bar.');
  }
  let resp = fetchPics(q);
  resp.then(res_data => {
    if (res_data.data.total === 0) {
      console.log(res_data.data.total);
      Notify.failure('No results for your query.');
    } else {
      createGallery(res_data.data.hits);
      refs.loadMore.classList.replace('is-hidden', 'load-more');
    }
  });
  cleanForm();
}

function cleanForm() {
  refs.form.reset();
}

function handlOnClick() {
  pageCount += 1;
  let myResponse = fetchPics(q, pageCount);
  myResponse.then(res => createGallery(res.data.hits));
}
