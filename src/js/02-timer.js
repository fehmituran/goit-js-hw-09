import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import 'flatpickr/dist/themes/material_blue.css';
import {convertMs} from "./convert.js";

const elementDom = {
  inputDate: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),

  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  dd: document.getElementById("dd"),
  hh: document.getElementById("hh"),
  mm: document.getElementById("mm"),
  ss: document.getElementById("ss"),
  day_dot: document.querySelector(".day_dot"),
  hr_dot: document.querySelector(".hr_dot"),
  min_dot: document.querySelector(".min_dot"),
  sec_dot: document.querySelector(".sec_dot"),
  timer: document.querySelector(".timer"),
}


const flatPickerOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] <= Date.now()){    
        Notiflix.Report.failure(
          'Hey My Friend...  🧟‍♂️',
          'Please choose a date in the future',
          'Choose a new date'
        );
        elementDom.startBtn.disabled = true;
        elementDom.timer.style.display = "none";
        elementDom.inputDate.classList.remove("selected");
        return;
      } else {
        elementDom.startBtn.disabled = false;
        elementDom.inputDate.classList.add("selected");
      }
    },
  };

  const calendar = flatpickr(elementDom.inputDate, flatPickerOptions);

  const addLeadingZero = (value) => {
    return value.toString().padStart(2, '0');
  }
 
  const startCount = () => {
    const intervalCount = setInterval(() => {
      const remainingTime = calendar.selectedDates[0].getTime() - Date.now();

      if (remainingTime < 0) {
        clearInterval(intervalCount);
        return;
      }

      const convertedDate = convertMs(remainingTime)
      
      days.innerHTML = `${addLeadingZero(convertedDate.days)} <br><span>Days</span>`;
      hours.innerHTML = `${addLeadingZero(convertedDate.hours)} <br><span>Hours</span>`;
      minutes.innerHTML = `${addLeadingZero(convertedDate.minutes)} <br><span>Minutes</span>`;
      seconds.innerHTML = `${addLeadingZero(convertedDate.seconds)} <br><span>Seconds</span>`;

      elementDom.dd.style.strokeDashoffset = 440 - (440 * convertedDate.days) / 365;
      elementDom.hh.style.strokeDashoffset = 440 - (440 * convertedDate.hours) / 24;
      elementDom.mm.style.strokeDashoffset = 440 - (440 * convertedDate.minutes) / 60;
      elementDom.ss.style.strokeDashoffset = 440 - (440 * convertedDate.seconds) / 60;

      elementDom.day_dot.style.transform = `rotateZ(${convertedDate.days*0.986}deg)`;
      elementDom.hr_dot.style.transform = `rotateZ(${convertedDate.hours*15}deg)`;
      elementDom.min_dot.style.transform = `rotateZ(${convertedDate.minutes*6}deg)`;
      elementDom.sec_dot.style.transform = `rotateZ(${convertedDate.seconds*6}deg)`;
    }, 1000);

    elementDom.timer.style.display = "flex";
  }

  elementDom.startBtn.addEventListener("click", startCount)

