import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_blue.css");
import Notiflix from 'notiflix';
import '../css/02-timer.css'

const dateTimePicker = document.getElementById("datetime-picker");
const buttonStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0] >= options.defaultDate) {
        buttonStart.removeAttribute("disabled");    
          
      } if (selectedDates[0] <= options.defaultDate) {

        Notiflix.Report.info("Please choose a date in the future",
        );   
         
        buttonStart.setAttribute("disabled", "disabled");
      }
      selectedDate = selectedDates[0];
  },
};

const flatpickrDateTime = new flatpickr(dateTimePicker, options);
console.log(flatpickrDateTime);

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.onTick = onTick;
        this.init();
    }

    init() {
        const time = convertMs(0);
        this.onTick(time); 
    }
    
    start() {
       
        this.intervalId = setInterval(() => {
           const startTime = new Date().getTime();
            const currentTime = selectedDate.getTime();
            const deltaTime = currentTime - startTime;
            if (deltaTime < 0) {
                clearInterval(this.intervalId);
                return; 
            } else {
                const time = convertMs(deltaTime);
                this.onTick(time);
            }
        }, 1000)
    }
}

function updateClockFace({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`; 

}

const timer = new Timer({
    onTick: updateClockFace, 
});

buttonStart.addEventListener('click', timer.start.bind(timer));

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
