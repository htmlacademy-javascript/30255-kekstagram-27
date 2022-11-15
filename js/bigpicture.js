const bigPicture = document.querySelector('.big-picture');
//const commentsCount = document.querySelector('.social__comment-count');
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
  // commentList.innerHTML = ''; 1 - способ очистить данные в шаблоне, чтобы затем подставить свои
  commentList.replaceChildren(); /* второй способ */
  commentList.append(...comments.map(createComment));
  // вариант добавления комментариев через fragment
  /*const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);*/
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPicture = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

};
const splitComments = (comments) => {
  const commentsBlocks = [];
  for (let i = 0; i < comments.length; i += 5) {
    const NewArrayComments = comments.slice(i, i + 5);
    commentsBlocks.push(NewArrayComments);
  }
  return commentsBlocks;
};


const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  // commentsLoader.classList.add('hidden');
  //commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  renderPicture(data);
  renderComments(splitComments(data.comments)[0]);
  let count = 1;
  commentsLoaderButton.addEventListener('click', () => {
    count += 1;
    // eslint-disable-next-line no-console
    console.log(splitComments(data.comments).slice(0, count));
    renderComments(splitComments(data.comments).slice(0, count));
  });
};

cancelButton.addEventListener('click', onCancelButtonClick);

export{showBigPicture};

/*var arrayComments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var count=0;
var commentsBlocks = [];
for (let i=0; i<arrayComments.length; i+= 5) {
  var NewArrayComments = arrayComments.slice(i, i+5);
  count++;
  commentsBlocks.push(NewArrayComments);
  console.log(NewArrayComments);

    };
    console.log(commentsBlocks);*/
