// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
// // Change code below this line


const gallery = document.querySelector('.gallery')


const markup = galleryItems.map(({original, preview, description}) =>`<li class="gallery__item">
<a class="gallery__link" href="${original}">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`).join(" ")

gallery.insertAdjacentHTML("beforeend", markup)

gallery.addEventListener('click', onClick)

let instance = null

function onClick(evt) {  
  
  evt.preventDefault();

  if (evt.target.classList.contains('gallery__image')) {
    
    const source = evt.target.dataset.source;
   
    const modalImage = `<img src="${source}">`;

    instance = basicLightbox.create(modalImage);
   
    instance.show();
    
  }

}
window.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    instance.close();
  }
});


