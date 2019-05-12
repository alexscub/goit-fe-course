'use strict'
/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/
class Stopwatch {
  constructor(parent) {
    this.parent = parent;
    this.startTime;
    this.timerId;
    this.laps = [];
    this.deltaTime = 0;
    this.parent.innerHTML = '<div class="stopwatch"><p class="time js-time">00:00.0</p><button class="btn js-start">Start</button><button class="btn js-take-lap">Lap</button><button class="btn js-reset">Reset</button></div><ul class="laps js-laps"></ul>';
    this.start = parent.querySelector('.js-start');
    this.lap = parent.querySelector('.js-take-lap');
    this.reset = parent.querySelector('.js-reset');
    this.reset.disabled = true;
    this.time = parent.querySelector('.js-time');
    this.lapsList = parent.querySelector('.js-laps');
    this.start.addEventListener('click', this.startTimer.bind(this));
    this.reset.addEventListener('click', this.resetTimer.bind(this));
    this.lap.addEventListener('click', this.takeLap.bind(this));
  }
  startTimer() {
    this.reset.disabled = false;
    if (this.start.classList.contains('started')) {
      clearInterval(this.timerId);
      this.start.textContent = 'Continue';
      this.start.classList.remove('started');
      return;
    }
    this.start.textContent = 'Pause';
    this.start.classList.add('started');
    this.startTime = Date.now() - this.deltaTime;
    this.timerId = setInterval(() => {
    this.deltaTime = Date.now() - this.startTime;
    this.updateClockface(this.time, this.deltaTime);
  }, 100);
  }
  resetTimer() {
  clearInterval(this.timerId);
  this.deltaTime = 0;
  this.updateClockface(this.time, this.deltaTime);
  this.start.textContent = 'Start';
  this.start.classList.remove('started');
  this.laps.length = 0;
  this.lapsList.innerHTML = '';
  this.reset.disabled = true;
}
  takeLap() {
    if ((!this.laps.includes(this.deltaTime))){
    this.laps.push(this.deltaTime);
    this.lapsList.innerHTML += `<li>${this.getFormattedTime(this.deltaTime)}</li>`
    }
}
  updateClockface(elem, time) {
    elem.textContent = this.getFormattedTime(time);
  }
  getFormattedTime(time) {
    let date = new Date(time);
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    let milliseconds = Math.floor(date.getMilliseconds() / 100);
    return `${minutes}:${seconds}.${milliseconds}`
  }

}
const stwA = new Stopwatch(document.querySelector('.parentA'));
const stwB = new Stopwatch(document.querySelector('.parentB'));