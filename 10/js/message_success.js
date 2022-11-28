const messageErrorTemplate = document.querySelector('#success')
  .content.querySelector('.success');


const createMessageError = () => {
  const messageError = messageErrorTemplate.cloneNode(true);
  return messageError;
};

const closeMessageSuccess = () => {
  const messageElement = document.querySelector('.success');
  messageElement.remove();
  document.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('click', outsideClickListener);
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessageSuccess();
  }
}

function onCancelButtonClick() {
  closeMessageSuccess();
}

function outsideClickListener(event) {
  const messageElement = document.querySelector('.success__inner');
  if (!messageElement.contains(event.target)) {
    closeMessageSuccess();
  }
}

const showMessageSuccess = () => {
  document.body.append(createMessageError());
  const cancelButton = document.querySelector('.success__button');
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', outsideClickListener);
};

export{showMessageSuccess};
