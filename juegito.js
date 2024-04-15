// Definir la matriz del tablero
let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null] // La pieza vacía representa el espacio en blanco
  ];
  
  // Función para mezclar las piezas del rompecabezas (ejemplo de algoritmo de mezcla simple)
  function shufflePuzzle() {
    for (let i = 0; i < 100; i++) { // Realizar 100 movimientos aleatorios
      let randomRow = Math.floor(Math.random() * 3);
      let randomCol = Math.floor(Math.random() * 3);
      let emptyRow = board.findIndex(row => row.includes(null));
      let emptyCol = board[emptyRow].indexOf(null);
      swapPieces(randomRow, randomCol, emptyRow, emptyCol);
    }
  }
  
  // Inicializar el juego
  function initGame() {
    shufflePuzzle();
    renderBoard();
  }
  
  // Función para renderizar el tablero en la interfaz gráfica
  function renderBoard() {
    let boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Limpiar el contenido anterior del tablero
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let piece = board[i][j];
        let pieceElement = document.createElement('div');
        pieceElement.textContent = piece === null ? '' : piece;
        pieceElement.classList.add('piece');
        pieceElement.dataset.row = i;
        pieceElement.dataset.col = j;
        pieceElement.addEventListener('click', () => handleClick(i, j));
        boardElement.appendChild(pieceElement);
      }
    }
  }
  
  // Manejar el clic en una pieza para moverla
  function handleClick(row, col) {
    let emptyRow = board.findIndex(row => row.includes(null));
    let emptyCol = board[emptyRow].indexOf(null);
    if ((row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
      swapPieces(row, col, emptyRow, emptyCol);
      renderBoard();
      if (isPuzzleComplete()) {
        alert('¡Felicidades, has completado el rompecabezas!');
      }
    }
  }
  
  // Función para intercambiar dos piezas en el tablero
  function swapPieces(row1, col1, row2, col2) {
    let temp = board[row1][col1];
    board[row1][col1] = board[row2][col2];
    board[row2][col2] = temp;
  }
  
  // Función para verificar si el rompecabezas se ha completado
  function isPuzzleComplete() {
    let counter = 1;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== counter % 9) {
          return false;
        }
        counter++;
      }
    }
    return true;
  }
  
  // Llamar a la función de inicialización cuando se cargue la página
  window.onload = initGame;
  