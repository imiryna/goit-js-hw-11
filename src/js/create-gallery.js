export { createGallery };
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { alertImgSuccess } from './data';

const divGallery = document.querySelector('.gallery');

function createGallery(data) {
  const imgs = data
    .map(photo => {
      return `
      <div class="photo-card">
      <a class="photo-link" href="${photo.largeImageURL}">
  <img src="${photo.webformatURL}" alt="${photo.tags}" title ="${photo.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${photo.downloads}
    </p>
  </div>
</div>
`;
    })
    .join('');
  divGallery.insertAdjacentHTML('beforeend', imgs);

  let gallery = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}
