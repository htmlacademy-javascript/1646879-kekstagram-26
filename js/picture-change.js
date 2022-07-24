const STEP_SCALE = 25;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const levelValue = document.querySelector('.effect-level__value');

let key = 'none';
let scale = 100;

const EFFECTS = {
  'none': {
    class: 'none',
  },
  'chrome': {
    class: 'effects__preview--chrome',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
  },
  'sepia': {
    class: 'effects__preview--sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
  },
  'marvin': {
    class: 'effects__preview--marvin',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
  },
  'phobos': {
    class: 'effects__preview--phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
  },
  'heat': {
    class: 'effects__preview--heat',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
  },
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 0,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

const unactiveControlBigger = () => {
  if (controlValue.value === '100%') {
    controlBigger.disabled = true;
    controlBigger.style. backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }
};

controlValue.value = `${scale}%`;
unactiveControlBigger();
slider.classList.add('hidden');

const createStepRange = (item) => {
  slider.noUiSlider.on('update', () => {
    levelValue.value = slider.noUiSlider.get();
    imgPreview.style.filter = `${EFFECTS[key]['filter']}(${levelValue.value})`;
    if (item.value === 'marvin') {
      imgPreview.style.filter = `${EFFECTS[key]['filter']}(${levelValue.value}%)`;
    }
    if (item.value === 'phobos') {
      imgPreview.style.filter = `${EFFECTS[key]['filter']}(${levelValue.value}px)`;
    }
  });
};

const createDataUpdate = () => {
  scale = 100;
  controlValue.value = '';
  controlValue.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale/100})`;
  imgPreview.className = '';
  imgPreview.style = '';
  slider.classList.add('hidden');
};

effectsList.addEventListener('change', (evt) => {
  const targetItem = evt.target;

  if (targetItem.tagName === 'INPUT') {
    key = targetItem.value;

    createDataUpdate();

    imgPreview.classList.add(EFFECTS[key]['class']);


    if (targetItem.value === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
      slider.removeAttribute('disabled');

      slider.noUiSlider.updateOptions({
        range: {
          min: EFFECTS[key]['range']['min'],
          max: EFFECTS[key]['range']['max'],
        },
        start: EFFECTS[key]['start'],
        step: EFFECTS[key]['step'],
      });

      createStepRange(targetItem);
    }
  }
});

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
  unactiveControlBigger();
});

export {createDataUpdate};
