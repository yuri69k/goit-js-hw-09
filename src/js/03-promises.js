import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-top',
  fontSize: '16px',
  useIcon: false,
});
const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`button`),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  for (let i = 0; i < refs.inputAmount.value; i += 1) {
    createPromise(i)
      .then(({ position, startTime }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${startTime}ms`
        )
      )
      .catch(({ position, startTime }) =>
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${startTime}ms`
        )
      );
  }
}

function createPromise(position) {
  const firstDelay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const startTime = firstDelay + step * position;
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, startTime });
      }
      reject({ position, startTime });
    }, startTime);
  });
}
