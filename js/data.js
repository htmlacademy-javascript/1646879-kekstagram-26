import { getRandom } from './util.js';

const VALUE = 25;

const MIN_AVATAR_VALUE = 1;
const MAX_AVATAR_VALUE = 6;

const MESSAGES = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Кузьма',
  'Барсик',
  'Рыжик',
  'Барон',
  'Бегимот',
  'Георгий Олегович',
  'Матильда',
  'Жора',
];

const DESCRIPTIONS = [
  'мур мяу',
  'а я все чаще замечаю',
  'на чиле на раслабоне',
  'лапы, усы и хвост - вот мой паспорт',
  'в любой непонятной ситуации ложись спать',
  'что было дальше',
  'love is',
  'ну и где еда?',
];

const getRandomArrayElement = (elements) => elements[getRandom (0, elements.length - 1)];

const createArrayId = Array.from({length: VALUE}, (value, i) => i+1);
const createArrayUrl = Array.from({length: VALUE}, (value, i) => i+1);

const getRandomNumber = (array) => array.splice(Math.random()*array.length, 1)[0];

const createComment = (element, index) => {
  const createValueAvatar = () => getRandom (MIN_AVATAR_VALUE, MAX_AVATAR_VALUE);

  return {
    id: index + 1,
    avatar: `img/avatar-${createValueAvatar()}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const getCommentsArray = () => Array.from({length:getRandom (0, 20)}, createComment);

const createArray = () => ({
  id: getRandomNumber(createArrayId),
  url: `photos/${getRandomNumber(createArrayUrl)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandom (1, 200),
  comments: getCommentsArray(),
});

const getArray = Array.from({length: VALUE}, createArray);

export {getArray};
