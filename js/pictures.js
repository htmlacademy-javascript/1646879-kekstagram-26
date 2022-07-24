import { getArray } from './data.js';
import { showBigPicture } from './big-picture.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

getArray.forEach(({url, description, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt= description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;


  pictureFragment.appendChild(pictureElement);
  pictureElement.addEventListener('click', () => {
    showBigPicture({url, description, comments, likes});
  });
});

picturesSection.appendChild(pictureFragment);
