const getEl = selector => document.querySelector(selector);
const body = document.body;
const TIMING = 1000;
let isActive = false;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

onBtnStopClick();

getEl('button[data-start]').addEventListener('click', onBtnStartClick);
getEl('button[data-stop]').addEventListener('click', onBtnStopClick);

function onBtnStartClick(e) {
  isActive = true;

  getEl('button[data-start]').disabled = isActive;
  getEl('button[data-stop]').disabled = !isActive;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log((body.style.backgroundColor = getRandomHexColor()));
  }, TIMING);
}

function onBtnStopClick(e) {
  clearInterval(intervalId);

  isActive = false;
  getEl('button[data-stop]').disabled = !isActive;
  getEl('button[data-start]').disabled = isActive;
}
