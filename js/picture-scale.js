import {imgPreview} from './picture-change.js';

const STEP_SCALE = 25;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');

let scale;

const onScaleReload = () => {
  scale = 100;
  controlValue.value = '100%';
  controlBigger.disabled = true;
  imgPreview.style.transform = '';
  controlBigger.style. backgroundColor = 'rgba(0, 0, 0, 0.3)';
};

controlSmaller.addEventListener('click', () => {
  scale -= STEP_SCALE;
  controlValue.value = `${scale}%`;
  controlBigger.disabled = false;
  controlBigger.style. backgroundColor = 'rgba(0, 0, 0, 0.6)';
  imgPreview.style.transform = `scale(${scale/100})`;

  if (controlValue.value === '25%') {
    controlSmaller.disabled = true;
    controlSmaller.style. backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }
});

controlBigger.addEventListener('click', () => {
  scale += STEP_SCALE;
  controlValue.value = `${scale}%`;
  controlSmaller.disabled = false;
  controlSmaller.style. backgroundColor = 'rgba(0, 0, 0, 0.6)';
  imgPreview.style.transform = `scale(${scale/100})`;

  if (controlValue.value === '100%') {
    onScaleReload();
  }
});

export {onScaleReload};
