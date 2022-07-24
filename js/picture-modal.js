import { isEscapeKey } from './util.js';
import { commentsLoaderButton, createLoadComments } from './big-picture.js';

const sectionBigPicture = document.querySelector('.big-picture');

const addClassHidden = () => {
  sectionBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const removeClassHidden = () => {
  sectionBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const openPictureModal = () => {
  removeClassHidden();

  document.addEventListener('keydown', onModalEscKeydown);
};

const closePictureModal = () => {
  addClassHidden();

  document.removeEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
    commentsLoaderButton.removeEventListener('click', createLoadComments);
  }
}

export {openPictureModal, closePictureModal};
