const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
let currentWord,
    correctLetters = [];
wrongGuessCount = 0;
const maxGuesses = 9;
let usedWords = [];

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  wordDisplay.classList.remove("long-word"); // Удаляем класс long-word
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => '<li class="letter"></li>')
    .join("");

  if (currentWord.length > 8) {
    wordDisplay.classList.add("long-word"); // Добавляем класс long-word
  }

  gameModal.classList.remove("show");
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
};

const getRandomWord = () => {
  if (usedWords.length === wordList.length) {
    alert("Все слова были использованы. Перезапускаем список.");
    usedWords = [];
  }

  let wordObj;
  do {
    wordObj = wordList[Math.floor(Math.random() * wordList.length)];
  } while (usedWords.includes(wordObj.word));

  usedWords.push(wordObj.word);
  currentWord = wordObj.word;
  console.log(currentWord);
  document.querySelector(".hint-text b").innerText = wordObj.hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word: `
      : `The correct word was: `;
    gameModal.querySelector("img").src = `images/${
      isVictory ? `victory` : `lost`
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? `Congratulations!` : `Game Over!`
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b> ${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    // Showing correct letters
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 1040; i < 1072; i++) {
  const button = document.createElement("button");

  if (i == 1046) {
    const buttonYo = document.createElement("button");
    buttonYo.innerText = String.fromCharCode(1025);
    keyboardDiv.appendChild(buttonYo);
    buttonYo.addEventListener("click", (e) =>
      initGame(e.target, String.fromCharCode(1025))
    );
  }

  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

// Добавляем обработчик для ввода с клавиатуры на ПК
document.addEventListener("keydown", (e) => {
  if (!/Mobi|Android/i.test(navigator.userAgent)) {
    const letter = e.key.toUpperCase();
    if (letter >= 'А' && letter <= 'Я' || letter === 'Ё') {
      const button = [...keyboardDiv.querySelectorAll('button')].find(btn => btn.innerText === letter);
      if (button && !button.disabled) {
        initGame(button, letter);
      }
    }
  }
});

// Добавляем обработчик для нажатия Enter, чтобы перезапустить игру
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && gameModal.classList.contains("show")) {
    getRandomWord();
  }
});
