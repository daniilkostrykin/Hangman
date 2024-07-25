const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");

let currentWord,
  wrongGuessCount = 0;
const maxGuesses = 6;
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => '<li class="letter"></li>')
    .join("");
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter))
    //Showing correct letters
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter)
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
      if (letter === clickedLetter)
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
    });
  else {
    wrongGuessCount++;
  }
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

for (let i = 1040; i < 1072; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
