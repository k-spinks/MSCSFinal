/**
 * @authors Kevin Spinks, Jacob Boelkow
 * @description Created a wordle clone using a DAWG for dictionary validation
 */

import { dictionary } from "./dictionary.js";

let root = createNode()

// ! Creates a dawg given the dictrionary array
dawg(dictionary)

// Creates initial state
const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(6).fill('')),
  currentRow: 0,
  currentCol: 0,
};

function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letter;
  box.id = `box${row}${col}`;

  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 6) {
        const word = getCurrentWord();
        if (isWordValid(word)) {
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;
        } else {
          alert('Not a valid word.');
        }
      }
    }
    if (key === 'Backspace') {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }

    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {

  // ! Runs through DAWG to validate if word accepted by DAWG
  let currentNode = root

  for(let i = 0; i < word.length; i++) {
      let char = word[i].toLowerCase()
      console.log(`Searching for character "${char}"`)

      if(currentNode.transitions.has(char)) {
          console.log(`Transition found for character "${char}"`)
          currentNode = currentNode.transitions.get(char)
      } else {
          console.log(`No transition found for character "${char}"`);
          return false
      }
  }
  return currentNode.wordEnd
}

function getNumOfOccurrencesInWord(word, letter) {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function getPositionOfOccurrence(word, letter, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;
  const animationDuration = 500; // ms

  for (let i = 0; i < 6; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
      state.secret,
      letter
    );
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
    const letterPosition = getPositionOfOccurrence(guess, letter, i);

    setTimeout(() => {
      if (
        numOfOccurrencesGuess > numOfOccurrencesSecret &&
        letterPosition > numOfOccurrencesSecret
      ) {
        box.classList.add('empty');
      } else {
        if (letter === state.secret[i]) {
          box.classList.add('right');
        } else if (state.secret.includes(letter)) {
          box.classList.add('wrong');
        } else {
          box.classList.add('empty');
        }
      }
    }, ((i + 1) * animationDuration) / 2);

    box.classList.add('animated');
    box.style.animationDelay = `${(i * animationDuration) / 2}ms`;
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 6;

  setTimeout(() => {
    if (isWinner) {
      alert('Congratulations!');
    } else if (isGameOver) {
      alert(`Better luck next time! The word was ${state.secret}.`);
    }
  }, 3 * animationDuration);
}

const showWord = () => {
  alert(state.secret)
};

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 6) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}

function createNode() {
  const node = {transitions: new Map(), wordEnd: false }
  return node
}

function dawg(dictionary) {
  let reg = new Map()

  for(let word of dictionary) {
      let currentNode = root

      for(let i = 0; i < word.length; i++) {
          let char = word[i]

          if(currentNode.transitions.has(char)) {
              currentNode = currentNode.transitions.get(char)
          } else {
              let newNode = createNode()
              currentNode.transitions.set(char, newNode)
              currentNode = newNode
          }
      }

      currentNode.wordEnd = true
      reg.set(currentNode, currentNode)
   }
}

function startGame() {
  const game = document.getElementById('game');
  const revealBtn = document.querySelector('.hiddenWord')
  drawGrid(game);
  registerKeyboardEvents();
  revealBtn.addEventListener('click', showWord)
}

startGame();