import {activateScaleControl} from './scale.js';
import {resetEffects} from './effect.js';

const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const modal = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('#upload-file');
const hashTagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASH_TAG_NUMBER = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'img-upload__field-wrapper_error',
});

const showModal = () => {
  modal.classList.remove('hidden');
  body.classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  activateScaleControl();
};

const closeModal = () => {
  form.reset();
  resetEffects();
  pristine.reset();
  modal.classList.add('hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashTagsField ||
document.activeElement === commentField;

function onEscKeyDown (evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const isvalidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASH_TAG_NUMBER;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validatedTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isvalidTag);
};
pristine.addValidator(
  hashTagsField,
  validatedTags,
  'Неправильно заполнены хэштеги'
);
closeButton.addEventListener('click', closeModal);
fileField.addEventListener('change', showModal);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма отправлена');
  }
});
