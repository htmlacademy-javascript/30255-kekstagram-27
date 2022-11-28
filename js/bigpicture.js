const NUMBER_OF_SHOWED_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsShowedCount = document.querySelector('.social__comment-count');
const CommentsLoaded = document.querySelector('.social__comments').children;
const commentList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#social__comment')
  .content.querySelector('.social__comment');

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  //Добавляем разметку для комментариев с помощью innerHTML
  /*const comment = document.createElement('li');
    comment.innerHTML =
  '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
    comment.classList.add('.social__comment');*/
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


const renderComments = (comments) => {
  //commentList.innerHTML = '';/* 1 - способ очистить данные в шаблоне, чтобы затем подставить свои */
  //commentList.replaceChildren(); /* второй способ */
  //commentList.append(...comments.map(createComment));
  // вариант добавления комментариев через fragment
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick() {
  hideBigPicture();
}

const renderPicture = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createCommentsLoadButton = (onLoadButtonClick) => {
  const button = document.createElement('button');
  button.classList.value = 'social__comments-loader comments-loader';
  button.textContent = 'Загрузить еще';

  button.addEventListener('click', onLoadButtonClick);

  const oldButton = document.querySelector('.comments-loader');
  if (oldButton) {
    oldButton.replaceWith(button);
  }

  return button;
};

const setCommentsInfo = (showedComments, allComments) => {
  commentsShowedCount.textContent = `${showedComments} из ${allComments} комментариев`;
};

const showBigPicture = (data) => {
  commentList.innerHTML = '';

  const loadButton = createCommentsLoadButton(loadButtonClick);
  renderPicture(data);

  function loadButtonClick() {
    renderComments(data.comments.slice(CommentsLoaded.length, CommentsLoaded.length + NUMBER_OF_SHOWED_COMMENTS));
    setCommentsInfo(CommentsLoaded.length, data.comments.length);
    if (CommentsLoaded.length >= data.comments.length) {
      loadButton.classList.add('hidden');
    }
  }

  loadButtonClick();

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscKeyDown);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

export{showBigPicture};
