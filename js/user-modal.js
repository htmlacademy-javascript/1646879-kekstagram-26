import { isEscapeKey } from './util.js';
import { deleteFormData } from './form-validator.js';
import { deleteEffects, activateEffects } from './picture-effect.js';
import { useDefaultScale } from './picture-scale.js';


const uploadImgForm = document.querySelector('.img-upload__overlay');

const addClassHidden = () => {
  uploadImgForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const removeClassHidden = () => {
  uploadImgForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const openUserModal = () => {
  removeClassHidden();
  activateEffects();
  useDefaultScale();
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeUserModal = () => {
  addClassHidden();
  deleteFormData();
  deleteEffects();
  document.removeEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt) && !document.activeElement.classList.contains('focusable')) {
    evt.preventDefault();
    closeUserModal();
  }
}

export {openUserModal, closeUserModal};
