const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let interval = null;

start.addEventListener('click', () => {
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.setAttribute('disabled', true);
  stop.removeAttribute('disabled', true);
});

stop.addEventListener('click', () => {
  clearInterval(interval);
  stop.setAttribute('disabled', true);
  start.removeAttribute('disabled', true);
});
