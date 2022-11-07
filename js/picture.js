import {showBigPicture} from './bigpicture.js';
const pictureTemplate = document
  .querySelector('#picture') /*Находим шаблон по id */
  .content.querySelector('.picture'); /*Находим элемент в шаблоне, чтобы можно было записать в него данные' */
const pictureContainer = document.querySelector('.pictures');/* Находим элемент в который будем вставлять сгенерированные по шаблону объекты*/

const makePicture = (data) => { /*функция, которая делает копию шаблона, и каждому элементу, найденого по классу, присваивает значения переданные ей в качестве аргумента и возращает созданный объект*/
  const {comments, description, likes, url} = data;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
};

const renderPictures = (pictures) => { /*Создаем функцию, которая будет в качестве аргумента  принимать вызов функции makePhoto, которая генерит данные и записывает их в объект для наших объкетов по шаблону (картинки) */
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {/*Перебираем все переданные объекты и выполняем функцию makePicture для каждого объекта, передавая ей этот объект в качетсве аргумента*/
    const pictureElement = makePicture(picture);
    fragment.append(pictureElement);
  });
  pictureContainer.append(fragment);
};

export {renderPictures};
