import { isEscapeKey } from './util.js';
import { uploadFile, hashtagsInput, descriptionTextarea } from './user-form.js';

const uploadImgForm = document.querySelector('.img-upload__overlay');

const addClassHidden = () => {
  uploadImgForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtagsInput.value = '';
  descriptionTextarea.value = '';
};

const removeClassHidden = () => {
  uploadImgForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const openUserModal = () => {
  removeClassHidden();

  document.addEventListener('keydown', onModalEscKeydown);
};

const closeUserModal = () => {
  addClassHidden();
  document.removeEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt) && !document.activeElement.classList.contains('focusable')) {
    evt.preventDefault();
    closeUserModal();
  }
}

export {openUserModal, closeUserModal};
