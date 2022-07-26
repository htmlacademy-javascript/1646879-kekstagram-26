import { openPictureModal, closePictureModal } from './picture-modal.js';

const LIMIT = 5;

const closeButton = document.querySelector('#picture-cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureImgCaption = document.querySelector('.social__caption');
const bigPictureImgLikes = document.querySelector('.likes-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = document.querySelector('.comments-loader');

let startIndex = 0;
let value = 0;
let photoComments;

const createCommentItem = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const commentItem = socialComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = avatar;
    commentItem.querySelector('.social__picture').alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    commentsList.append(commentItem);
  });
};

const createLoadComments = () => {
  startIndex = value * LIMIT;
  const endIndex = startIndex + LIMIT;

  const commentsVisible = photoComments.slice(startIndex, endIndex);

  createCommentItem(commentsVisible);
  socialCommentCount.textContent = `показанo ${commentsVisible.length} из ${photoComments.length} комментариев`;

  if (endIndex > 5 && endIndex < photoComments.length) {
    socialCommentCount.textContent = `показанo ${endIndex} из ${photoComments.length} комментариев`;
  } else
  if (endIndex >= photoComments.length) {
    commentsLoaderButton.classList.add('hidden');
    socialCommentCount.textContent = 'все комментарии показаны';
  }

  value++;
};

const createFillPicture = ({url, description, comments, likes}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureImgCaption.textContent = description;
  bigPictureImgLikes.textContent = likes;
  photoComments = comments;

  commentsLoaderButton.classList.add('hidden');

  commentsList.innerHTML = '';

  if (comments.length > 5) {
    commentsLoaderButton.classList.remove('hidden');
    createLoadComments();
    commentsLoaderButton.addEventListener('click', createLoadComments);
  } else {
    if (comments.length === 1) {
      socialCommentCount.textContent = `показан ${comments.length} комментарий`;
    } else
    if (comments.length > 1 && comments.length < 5) {
      socialCommentCount.textContent = `показано ${comments.length} комментария`;
    } else
    if (comments.length === 5) {
      socialCommentCount.textContent = `показанo ${comments.length} комментариев`;
    }
    createCommentItem(comments);
  }
};

const pictureModalCloseElement = () => {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePictureModal();
  });
};

const showBigPicture = ({url, description, comments, likes}) => {
  openPictureModal();
  value = 0;
  createFillPicture({url, description, comments, likes});

  pictureModalCloseElement();
};

export {showBigPicture, commentsLoaderButton, createLoadComments};
