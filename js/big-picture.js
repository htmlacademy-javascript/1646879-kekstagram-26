import { openPictureModal, closePictureModal } from './picture-modal.js';

const closeButton = document.querySelector('#picture-cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureImgCaption = document.querySelector('.social__caption');
const bigPictureImgLikes = document.querySelector('.likes-count');
const commentCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment').cloneNode(true);

const pictureModalCloseElement = (element) => {
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePictureModal(element);
  });
};

const createCommentItem = (comments) => {
  commentCount.textContent = comments.length;

  comments.forEach(({avatar, name, message}) => {
    const commentItem = socialComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = avatar;
    commentItem.querySelector('.social__picture').alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    commentsList.append(commentItem);
  });
};

const creatFillPicture = ({url, description, comments, likes}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureImgCaption.textContent = description;
  bigPictureImgLikes.textContent = likes;

  commentsList.innerHTML = '';
  createCommentItem(comments);
};

const showBigPicture = ({url, description, comments, likes}) => {
  openPictureModal();

  creatFillPicture({url, description, comments, likes});

  pictureModalCloseElement();
};

export {showBigPicture};
