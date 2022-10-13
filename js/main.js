//getRandomPositiveInteger -функция которое выбирает случайное целое число
//getRandomArrayElement - функция, которая выбирает случайный элемент из массива
//makeArray - функция которая создает  массив из 25 сгенерированных объектов с описанием фотографий
//makeCommentsObj - фнукция, которая генерит один случайный комментарий
//commentsArray - массив, который наполняется функцией makeCommentsObj в зависимости от его длины, которая так же может генериться функцией getRandomPositiveInteger
//MESSAGE_ARRAY - массив сообщений
//MESSAGE_ARRAY-массив имен

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
const makeCommentsObj = () => ({
  id: getRandomPositiveInteger(0,200),
  avatar: `img/avatar-${ getRandomPositiveInteger(1,6) }.svg`,
  message: getRandomArrayElement(MESSAGE_ARRAY),
  name: getRandomArrayElement(NAMES_ARRAY)
});
const makeArray = () => {
  const array = [];
  for (let i = 1; i <= 25; i++) {
    const commentsArray = Array.from({length: getRandomPositiveInteger(1,3)}, makeCommentsObj);
    const newElement = {
      id: i,
      url: `photos/${ i }.jpg`,
      description: 'строка — описание фотографии. Описание придумайте самостоятельно',
      likes:getRandomPositiveInteger(15,200),
      comments: commentsArray
    };
    array.push(newElement);
  }
  return array;
};
makeArray();
//const commentLength = (str,maxLength) => str.length <= maxLength;

