const NUMBER_OF_SHOWED_COMMENTS = 10;
const bigPicture = document.querySelector('.big-picture');
const commentsShowedCount = document.querySelector('.social__comment-count');
const CommentsLoaded = document.querySelector('.social__comments').children;
const commentList = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
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
  document.removeEventListener('click', onEscKeyDown);
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
const splitComments = (comments) => {

  const commentsBlocks = [];
  for (let i = 0; i < comments.length; i += NUMBER_OF_SHOWED_COMMENTS) {
    const NewArrayComments = comments.slice(i, i + NUMBER_OF_SHOWED_COMMENTS);
    commentsBlocks.push(NewArrayComments);
  }
  return commentsBlocks;
};


const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  if (data.comments.length <= NUMBER_OF_SHOWED_COMMENTS) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  renderPicture(data);
  commentList.innerHTML = '';
  commentsShowedCount.textContent = `${splitComments(data.comments)[0].length} из ${data.comments.length} комментариев`;
  renderComments(splitComments(data.comments)[0]);
  let count = 0;
  commentsLoaderButton.addEventListener('click',onLoadButtonClick);
  function onLoadButtonClick() {
    count += 1;
    commentsShowedCount.textContent = `${ CommentsLoaded.length + NUMBER_OF_SHOWED_COMMENTS} из ${data.comments.length} комментариев`;
    renderComments(splitComments(data.comments)[count]);
    if (NUMBER_OF_SHOWED_COMMENTS * count + NUMBER_OF_SHOWED_COMMENTS > data.comments.length - 1) {
      commentsLoaderButton.classList.add('hidden');
      commentsLoaderButton.removeEventListener('click',onLoadButtonClick);
      commentsShowedCount.textContent = `${data.comments.length} из ${data.comments.length} комментариев`;
    }
  }
};

cancelButton.addEventListener('click', onCancelButtonClick);
document.addEventListener('keydown', onEscKeyDown);

export{showBigPicture};
