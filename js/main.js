// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandom (min, max) {
  if (min >= max || min < 0 || max <= 0) {
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
    throw new Error(`${textExample} \nТекст не превышает ${max} символов`);
  }
  else {
    throw new Error(`${textExample.slice(0, max)}... \nТекст не может превышать ${max} символов`);
  }
}

const text = 'Задание №2. Нужно больше функций.';

getMaxLenght (text, 35);
