const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const KeyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    KeyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    // SELECTING A RANDOM WORD AND HINT FROM THE WORDLIST
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase();  // Ensure currentWord is lowercase

    console.log(currentWord);  
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    // After 300ms of game complete .. showing modal with relevant details 
    setTimeout(() => {
        const modelText = isVictory ? `You found the word:` : `The correct word was:`;

        gameModal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`;
        gameModal.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    clickedLetter = clickedLetter.toLowerCase();  // Ensure clickedLetter is lowercase

    // Check if clickedLetter exists in the currentWord
    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check for game over conditions
    if (wrongGuessCount === maxGuesses) {
        return gameOver(false);
    }
    if(correctLetters.length===currentWord.length){
        return gameOver(true);
    }
};

// ADDING KEYBOARD BUTTON
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    KeyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, e.target.innerText));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
