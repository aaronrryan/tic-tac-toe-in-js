class TicTacToe {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    
    this.boardElement = document.getElementById('board');
    this.statusElement = document.getElementById('status');
    this.restartButton = document.getElementById('restart');
    
    this.initializeBoard();
    this.restartButton.addEventListener('click', () => this.restartGame());
  }

  initializeBoard() {
    this.boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.addEventListener('click', () => this.makeMove(i));
      this.boardElement.appendChild(cell);
    }
  }

  makeMove(index) {
    if (!this.gameActive || this.board[index]) return;

    this.board[index] = this.currentPlayer;
    this.boardElement.children[index].textContent = this.currentPlayer;
    
    if (this.checkWin()) {
      this.statusElement.textContent = `${this.currentPlayer} wins!`;
      this.gameActive = false;
      return;
    }
    
    if (this.checkDraw()) {
      this.statusElement.textContent = "It's a draw!";
      this.gameActive = false;
      return;
    }
    
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.statusElement.textContent = `${this.currentPlayer}'s turn`;
  }

  checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return this.board[a] &&
             this.board[a] === this.board[b] &&
             this.board[a] === this.board[c];
    });
  }

  checkDraw() {
    return this.board.every(cell => cell !== '');
  }

  restartGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.statusElement.textContent = `${this.currentPlayer}'s turn`;
    Array.from(this.boardElement.children).forEach(cell => {
      cell.textContent = '';
    });
  }
}

new TicTacToe();
