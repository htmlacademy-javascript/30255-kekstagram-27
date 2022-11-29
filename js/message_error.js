const messageErrorTemplate = document.querySelector('#error')
  .content.querySelector('.error');


const createMessageError = () => {
  const messageError = messageErrorTemplate.cloneNode(true);
  return messageError;
};

const closeMessageError = () => {
  const messageElement = document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('click', outsideClickListener);
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessageError();
  }
}

function onCancelButtonClick() {
  closeMessageError();
}

function outsideClickListener(event) {
  const messageElement = document.querySelector('.error__inner');
  if (!messageElement.contains(event.target)) {
    closeMessageError();
  }
}

const showMessageError = () => {
  document.body.append(createMessageError());
  const cancelButton = document.querySelector('.error__button');
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', outsideClickListener);
};

export{showMessageError};
