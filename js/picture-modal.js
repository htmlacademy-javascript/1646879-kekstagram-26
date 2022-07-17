import { isEscapeKey } from './util.js';

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

  document.addEventListener('keydown', onModalEscKydown);
};

const closePictureModal = () => {
  addClassHidden();

  document.removeEventListener('keydown', onModalEscKydown);
};

function onModalEscKydown (evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closePictureModal();
  }
}

export {openPictureModal, closePictureModal};
