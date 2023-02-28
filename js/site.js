const clock1 = document.getElementById('clock1');
const clock1Time = document.getElementById('clock1-time');
const clock2 = document.getElementById('clock2');
const clock2Time = document.getElementById('clock2-time');
const switchButton1 = document.getElementById('switch-button1');
const switchButton2 = document.getElementById('switch-button2');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const timeInput = document.getElementById('time-input');

let time1 = parseInt(timeInput.value) * 60 || 600;
let time2 = parseInt(timeInput.value) * 60 || 600;
let activeTimer = 1;
let intervalId;
let paused = true;

function drawClock(clockElement, clockTimeElement, time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  clockTimeElement.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimer() {
    intervalId = setInterval(() => {
      if (!paused) {
        if (activeTimer === 1) {
          time1--;
          drawClock(clock1, clock1Time, time1);
          if (time1 === 0) {
            stopTimer();
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.textContent = 'Black wins!';
          }
        } else if (activeTimer === 2) {
          time2--;
          drawClock(clock2, clock2Time, time2);
          if (time2 === 0) {
            stopTimer();
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.textContent = 'White wins!';
          }
        }
      }
    }, 1000);
  }
  

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  stopTimer();
  startButton.textContent = 'Start';
  paused = true;
  time1 = parseInt(timeInput.value) * 60 || 600;
  time2 = parseInt(timeInput.value) * 60 || 600;
  drawClock(clock1, clock1Time, time1);
  drawClock(clock2, clock2Time, time2);
  activeTimer = 1;
  clock1.classList.add('active');
  clock2.classList.remove('active');
  const winnerMessage = document.getElementById('winner-message');
  winnerMessage.textContent = 'White goes first';
}

function switchTimer() {
  if (activeTimer === 1) {
    activeTimer = 2;
    clock1.classList.remove('active');
    clock2.classList.add('active');
  } else {
    activeTimer = 1;
    clock1.classList.add('active');
    clock2.classList.remove('active');
  }
}

startButton.addEventListener('click', () => {
  paused = !paused;
  if (!paused) {
    startButton.textContent = 'Pause';
    startTimer();
  } else {
    startButton.textContent = 'Start';
    stopTimer();
  }
});

resetButton.addEventListener('click', () => {
  resetTimer();
});

switchButton1.addEventListener('click', () => {
    if (!paused) {
        if (activeTimer === 1) {
        switchTimer();
        }
    }
});

switchButton2.addEventListener('click', () => {
    if (!paused) {
        if (activeTimer === 2) {
            switchTimer();
        }
    }
});

drawClock(clock1, clock1Time, time1);
drawClock(clock2, clock2Time, time2);
