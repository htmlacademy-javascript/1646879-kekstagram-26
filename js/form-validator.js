import {openUserModal, closeUserModal} from './user-modal.js';
import {sendData} from './api.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('#hashtags');
const descriptionTextarea = document.querySelector('#description');
const re = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__field-wrapper'
});

const hashtags = (value) => value.toLowerCase().split(' ');

const descriptionValidate = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, (value) => hashtags(value).length <= 5, 'Нельзя указать больше пяти хэш-тегов');
pristine.addValidator(hashtagsInput, (value) => value === '' || hashtags(value).every((elem) => re.test(elem)), 'Хэш-тег начинается с символа # и не может состоять только из одной решётки.\n Хэш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.\n Максимальная длина одного хэш-тега 20 символов, включая решётку.');
pristine.addValidator(hashtagsInput, (value) => hashtags(value).length === new Set(hashtags(value)).size, 'Хэш-теги нечувствительны к регистру. Один и тот же хэш-тег не может быть использован дважды.');
pristine.addValidator(descriptionTextarea, descriptionValidate, 'Максимальная длина сообщения 140 символов');

const deleteFormData = () => {
  uploadFile.value = '';
  hashtagsInput.value = '';
  descriptionTextarea.value = '';
};

const userFormCloseElement = () => {
  uploadCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeUserModal();
  });
};

const onUserFormOpen = () => {
  uploadFile.addEventListener('change', () => {
    const uploadValue = uploadFile.value;
    if (uploadValue !== '') {
      openUserModal();
    }
    userFormCloseElement();
  });
};

onUserFormOpen();

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        onSuccess,
        new FormData(evt.target));
    }
  });
};

export {setUserFormSubmit, deleteFormData};
