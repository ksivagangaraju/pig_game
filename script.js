'use strict';

const newGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');

const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const targetScore = 100;
let score = [0, 0];
let totalScore = [0, 0];
let player = 0;
let isPlaying = true;

function isWin() {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  const playerName = document.getElementById(`name--${player}`);
  playerName.textContent = '🎉' + playerName.textContent;
  playerName.textContent += '🎉';
  dice.classList.add('hidden');
  document.getElementById(`current--${player}`).textContent = 0;
  isPlaying = false;
}

function changePlayer() {
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  document.getElementById(`current--${player}`).textContent = 0;
  score[player] = 0;
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add('player--active');
  dice.src = `img/dice-1.png`;
}

const newGamePlay = function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';

  totalScore0.textContent = 0;
  totalScore1.textContent = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  score = [0, 0];
  totalScore = [0, 0];
  player = 0;
  isPlaying = true;
};

const rollDice = function () {
  if (isPlaying) {
    const diceRoll = Math.ceil(Math.random() * 6);

    dice.classList.remove('hidden');
    dice.src = `img/dice-${diceRoll}.png`;

    score[player] += diceRoll;

    document.getElementById(`current--${player}`).textContent = score[player];

    if (diceRoll === 1) {
      changePlayer();
    }
  }
};

const holdPlayer = function () {
  if (isPlaying) {
    totalScore[player] += score[player];
    document.getElementById(`score--${player}`).textContent =
      totalScore[player];
    if (totalScore[player] >= targetScore) isWin();
    else changePlayer();
  }
};

newGame.addEventListener('click', newGamePlay);

roll.addEventListener('click', rollDice);

hold.addEventListener('click', holdPlayer);
