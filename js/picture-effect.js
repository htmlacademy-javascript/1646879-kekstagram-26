const DEFAULT_VALUE = 'none';

const EFFECTS = {
  chrome: {
    values: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    values: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    values: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    values: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    values: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
    unit: '',
  },
};

const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const checkedElement = document.querySelector('#effect-none');

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
  },
  connect: 'lower',
});

const useDefaultEffect = () => {
  imgPreview.className = '';
  imgPreview.style = '';
  effectLevelValue.value = '';
  slider.classList.add('hidden');
  checkedElement.checked = true;
};

useDefaultEffect();

const onStepRangeCreate = (targetElement) => {
  slider.noUiSlider.on('update', () => {
    const filter = EFFECTS[targetElement].filter;
    const unit = EFFECTS[targetElement].unit;

    if (targetElement !== DEFAULT_VALUE) {
      const sliderValue = slider.noUiSlider.get();
      imgPreview.style.filter = `${filter}(${sliderValue}${unit})`;
      effectLevelValue.value = sliderValue;
    }
  });
};

const onFilterChange = (evt) => {
  const targetElement = evt.target.value;
  slider.classList.add('hidden');

  if (targetElement !== DEFAULT_VALUE) {
    imgPreview.className = '';
    slider.classList.remove('hidden');
    imgPreview.classList.add(`effects__preview--${targetElement}`);
    slider.noUiSlider.updateOptions(EFFECTS[targetElement].values);
    onStepRangeCreate(targetElement);
  }
};

const activateEffects = () => {
  useDefaultEffect();
  effectsList.addEventListener('change', onFilterChange);
};

const deleteEffects = () => {
  effectsList.removeEventListener('change', onFilterChange);
};


export {deleteEffects, activateEffects, imgPreview};
