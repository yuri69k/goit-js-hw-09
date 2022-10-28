import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector(`[data-start]`),
  daysEl: document.querySelector(`[data-days]`),
  hoursEl: document.querySelector(`[data-hours]`),
  minutesEl: document.querySelector(`[data-minutes]`),
  secondsEl: document.querySelector(`[data-seconds]`),
};

let intervalId = null;
let chosenDate = null;
let deltaTime = null;

refs.button.setAttribute(`disabled`, ``);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: Date.now(),

  onClose(selectedDates) {
    chosenDate = selectedDates[0];

    if (Date.now() > chosenDate) {
      Notify.failure('Please choose a date in the future');

      refs.button.setAttribute(`disabled`, ``);
      return;
    }

    refs.button.removeAttribute(`disabled`, ``);
  },
};
flatpickr(`#datetime-picker`, options);

refs.button.addEventListener(`click`, onButtonClick);
function onButtonClick(e) {
  refs.button.setAttribute(`disabled`, ``);
  intervalId = setInterval(() => {
    deltaTime = chosenDate - Date.now();

    updateTimerFace(convertMs(deltaTime));

    if (Number(deltaTime) <= 1000) {
      clearInterval(intervalId);
      return Notify.failure(
        'Information: Countdown is over. Select date again'
      );
    }
  }, 1000);
}
function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}
function addLeadingZero(value) {
  return value.length > 2 ? value : String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
