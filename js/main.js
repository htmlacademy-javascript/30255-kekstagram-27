//import {makePhotos} from './data.js';
import {closeModal,setUserFormSubmit} from './form.js';
import {renderPictures} from './picture.js';
//import './form.js';


fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    // eslint-disable-next-line no-console
    console.log(pictures);
    renderPictures(pictures);
  });
setUserFormSubmit(closeModal);
