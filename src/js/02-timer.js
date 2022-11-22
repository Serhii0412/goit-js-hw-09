import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

console.log(refs);

refs.start.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      countDown(selectedDates[0]);
    } else {
      refs.start.removeAttribute('disabled', true);
    }
  },
};

flatpickr(picker, options);

let i = 1;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.start.addEventListener('click', () => {
  let time = setInterval(() => {
    let countDown = new Date(picker.value) - new Date();
    if (countDown >= 0) {
      let timeObject = convertMs(countDown);
      refs.days.textContent = addLeadingZero(timeObject.days);
      refs.hours.textContent = addLeadingZero(timeObject.hours);
      refs.minutes.textContent = addLeadingZero(timeObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeObject.seconds);
      refs.start.removeAttribute('disabled', true);
    } else {
      Notiflix.Notify.success('Countdown finished');
      return clearInterval(time);
    }
  }, 1000);
});

refs.timer.style.display = 'flex';
refs.timer.style.gap = '20px';
