export { createGallery };
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const divGallery = document.querySelector('.gallery');

// gallery.on('show.simplelightbox',
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
      <b>Likes: ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photo.downloads}</b>
    </p>
  </div>
</div>
`;
    })
    .join('');
  divGallery.insertAdjacentHTML('beforeend', imgs);

  let gallery = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
  });
}
