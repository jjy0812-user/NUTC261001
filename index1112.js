const input = document.querySelector('#guess');
const guessButton = document.querySelector('#guess-button');
const resetButton = document.querySelector('#reset-button');
const rangeText = document.querySelector('#range');
const message = document.querySelector('#message');
const attemptText = document.querySelector('#attempts');

let answer = 0;
let lower = 1;
let upper = 100;
let attempts = 0;
let finished = false;

function checkGuess() {
  if (input.value.trim() === '') {
    message.textContent = '請輸入整數';
    message.className = 'message error';
    return;
  }

  const guess = Number(input.value);

  if (!Number.isInteger(guess)) {
    message.textContent = '請輸入整數';
    message.className = 'message error';
    return;
  }

  if (guess < lower || guess > upper) {
    message.textContent = '請輸入目前範圍內的數字';
    message.className = 'message error';
    return;
  }

  attempts += 1;

  if (guess === answer) {
    finished = true;
    message.textContent = '答對了！終極密碼就是 ' + answer;
    message.className = 'message';
  } else if (guess < answer) {
    lower = Math.max(lower, guess);
    message.textContent = guess + ' 太小，新的範圍是 ' + lower + ' ～ ' + upper;
    message.className = 'message';
  } else {
    upper = Math.min(upper, guess);
    message.textContent = guess + ' 太大，新的範圍是 ' + lower + ' ～ ' + upper;
    message.className = 'message';
  }

  if (lower > upper) {
    finished = true;
    message.textContent = '這個範圍已收斂到無效狀態，請重新開始。';
    message.className = 'message error';
  }

  renderGame();
}

function renderGame() {
  rangeText.textContent = lower + ' ～ ' + upper;
  attemptText.textContent = '已猜 ' + attempts + ' 次';
  guessButton.disabled = finished;
}

function initializeGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  lower = 1;
  upper = 100;
  attempts = 0;
  finished = false;

  input.value = '';
  message.textContent = '請輸入第一個數字';
  message.className = 'message';

  renderGame();
}

guessButton.addEventListener('click', function () {
  if (finished) return;
  checkGuess();
  input.select();
});

resetButton.addEventListener('click', initializeGame);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    guessButton.click();
  }
});

initializeGame();
