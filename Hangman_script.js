var europeCapitalCities = ["amsterdam","athens","belgrade","berlin","bern","bratislava","brussels","bucharest",
	"budapest","chisinau","copenhagen","dublin","helsinki","kiev","lisbon","ljubljana","london","madrid","minsk",
  "monaco","moscow","nicosia","oslo","paris","podgorica","prague","reykjavik","riga","rome","sarajevo","skopje","sofia",
  "stockholm","tallin","tirana","valletta","vienna","vilnius","warsaw","zagreb"]
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = europeCapitalCities[Math.floor(Math.random() * europeCapitalCities.length)];
  handleGuess(answer.charAt(0));
  handleGuess(answer.charAt(answer.length - 1));
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklm'.split('').map(letter =>
    `
      <td>  
        <button class="button" id='` + letter + `'onClick="handleGuess('` + letter + `')">` + letter + `</button>
      </td>
    `).join('');
  document.getElementById('keyboardRow1').innerHTML = buttonsHTML;
  let buttonsHTML2 = 'nopqrstuvwxyz'.split('').map(letter =>
    `
      <td>  
        <button class="button" id='` + letter + `'onClick="handleGuess('` + letter + `')">` + letter + `</button>
      </td>
    `).join('');
  document.getElementById('keyboardRow2').innerHTML = buttonsHTML2;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    document.getElementById(chosenLetter).style.backgroundColor = '#3DC83F';
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    document.getElementById(chosenLetter).style.backgroundColor = '#F70B0B';
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    printMessage('You Won!!!');
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    printMessage('You Lost!!!');
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  generateButtons();
  randomWord();
  guessedWord();
  updateMistakes();
}

function printMessage (message) {
  document.getElementById('keyboardRow1').innerHTML = message;
  document.getElementById('keyboardRow2').innerHTML = '';
  if (message === 'You Lost!!!') {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
  }
}

document.getElementById('maxWrong').innerHTML = maxWrong;

generateButtons();
randomWord();
guessedWord();