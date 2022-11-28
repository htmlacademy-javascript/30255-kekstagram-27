//import {makePhotos} from './data.js';
import {closeModal,setUserFormSubmit} from './form.js';
import {renderPictures} from './picture.js';
import {getData} from './api.js';

getData(renderPictures);
setUserFormSubmit(closeModal);
