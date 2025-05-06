let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');

// Load sound file
const patakaSound = new Audio('path_to_pataka_sound.mp3'); // Replace with actual path

// Function to handle player moves
function makeMove(index) {
  if (board[index] !== '' || !gameActive) return;
  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;
  checkWinner();
  togglePlayer();
}

// Function to toggle between players
function togglePlayer() {
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Function to check the winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusElement.textContent = `Player ${board[a]} Wins!`;
      highlightWinner(combination);
      patakaSound.play();
      triggerCelebration(); // 🎉 Celebration on Win
      return;
    }
  }

  // Draw condition
  if (!board.includes('')) {
    gameActive = false;
    statusElement.textContent = "It's a Draw!";
  }
}

// Highlight winning cells
function highlightWinner(combination) {
  for (let index of combination) {
    document.getElementsByClassName('cell')[index].classList.add('winner');
  }
}

// Celebration effect using canvas-confetti
function triggerCelebration() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff7e5f', '#feb47b', '#ffffff']
  });

  let duration = 2000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff7e5f', '#feb47b']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff7e5f', '#feb47b']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;
  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.textContent = '';
    cell.classList.remove('winner');
    cell.style.backgroundColor = '#fff';
  }
}
