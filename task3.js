let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const AI = 'X';
const HUMAN = 'O';

function makeHumanMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = HUMAN;
    updateBoard();

    if (!checkGameOver()) {
      makeAIMove();
      updateBoard();
      checkGameOver();
    }
  }
}

function makeAIMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = AI;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { row: i, col: j };
        }
      }
    }
  }

  if (move) {
    board[move.row][move.col] = AI;
  }
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result === AI) {
    return 10 - depth;
  } else if (result === HUMAN) {
    return depth - 10;
  } else if (checkTie()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = AI;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = HUMAN;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  const winningCombination = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const combination of winningCombination) {
    if (combination.every((cell) => cell === AI)) {
      return AI;
    } else if (combination.every((cell) => cell === HUMAN)) {
      return HUMAN;
    }
  }

  return null;
}

function checkTie() {
  return board.flat().every((cell) => cell !== '');
}

function checkGameOver() {
  const winner = checkWinner();
  if (winner) {
    alert(`${winner} wins!`);
    resetGame();
    return true;
  } else if (checkTie()) {
    alert("It's a tie!");
    resetGame();
    return true;
  }
  return false;
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    cells[i].textContent = board[row][col];
  }
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  updateBoard();
}

// Add event listeners to cells
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', function() {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    makeHumanMove(row, col);
  });
});

updateBoard();