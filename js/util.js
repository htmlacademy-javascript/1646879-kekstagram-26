// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandom (min, max) {
  if (min >= max) {
    throw new Error('Диапазон включает только положительные числа. Число "от" не может быть больше или равно числу "до".');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const random = min + Math.random() * (max - min + 1);
  return Math.floor(random);
}

getRandom (0, 6);

// Функция для проверки максимальной длины строки.

function getMaxLenght (textExample, max) {
  if (textExample.length <= max) {
    return true;
  }
  else {
    return false;
  }
}

const TEXT = 'Задание №2. Нужно больше функций.';

getMaxLenght (TEXT, 35);

export {getRandom, getMaxLenght};
