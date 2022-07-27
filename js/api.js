const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch((error) => error);
};

const sendData = (success, formData) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        success();
      } else {
        throw new Error('Данные не валидны');
      }
    })
    .catch((error) => error);
};

export {getData, sendData};
