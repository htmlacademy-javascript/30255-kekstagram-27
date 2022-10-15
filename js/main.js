//getRandomPositiveInteger -функция, которое выбирает случайное целое число
//getRandomArrayElement - функция, которая выбирает случайный элемент из массива
//makePhoto - функция, которая создает  1 сгенерированный объект с описанием фотографий
//makePhotos - функция, которая создает  массив из 25 сгенерированных объектов с описанием фотографий
//makeComment - фнукция, которая генерит один случайный комментарий
//makeComments - функция, которая собирает массив с помощью функции makeComment
//makeMessage - функция собирает массив случайной длины, полученной из ее параметра, функцией взятия случайного элемента из массива MESSAGE_ARRAY. Затем выполняет склейку этого массива.
//MESSAGE_ARRAY - массив сообщений
//MESSAGE_ARRAY-массив имен
//DESCRIPTION_ARRAY -массив описаний для фотографий

const NUMBER_OF_PHOTOS = 25;
const DESCRIPTION_ARRAY = ['Море','Пейзаж','Селфи','Природа','Путешествие','Портрет','Коллаж'];
const NAMES_ARRAY = ['Петя','Сергей','Маша','Влада','Мирон','Аня'];
const MESSAGE_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const getRandomPositiveInteger = (a,b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const makeMessage = (len) => Array.from({length: len}, () => getRandomArrayElement(MESSAGE_ARRAY)).join(' ');
const makeComment = (id) => ({
  id: id,
  avatar: `img/avatar-${ getRandomPositiveInteger(1,6) }.svg`,
  message: makeMessage(getRandomPositiveInteger(1,2)),
  name: getRandomArrayElement(NAMES_ARRAY)
});
const makeComments = (num) => Array.from({length: num}, (_, index) => makeComment(index + 1));
const makePhoto = (id) => ({
  id: id,
  url: `photos/${ id }.jpg`,
  description: getRandomArrayElement(DESCRIPTION_ARRAY),
  likes:getRandomPositiveInteger(15,200),
  comments: makeComments(getRandomPositiveInteger(1,3))
});
const makePhotos = () => Array.from({length: NUMBER_OF_PHOTOS }, (_, index) => makePhoto(index + 1));
makePhotos();
//const commentLength = (str,maxLength) => str.length <= maxLength;
