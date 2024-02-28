import { BoardState, CellLocation, PlayerSymbol } from "/src/utils/types/types";

export const isTie = (moveCount: number, boardState: BoardState): boolean => {
  return moveCount === Math.pow(boardState.length, 2) ? true : false;
};

export const checkWinCondition = (
  boardState: BoardState,
  rowIndex: number,
  colIndex: number,
  currentPlayer: PlayerSymbol
): number[][] | null => {
  // Make a copy of the boardState 2d array
  const newBoardState = boardState.map((innerArray) => [...innerArray]);
  newBoardState[rowIndex][colIndex] = currentPlayer;

  const winningCombination: number[][] = [];

  // check row
  for (let i = 0; i < boardState.length; i++) {
    winningCombination.push([rowIndex, i]);
    if (newBoardState[rowIndex][i] !== currentPlayer) break;
    if (i === boardState.length - 1) return winningCombination; // Wins
  }
  winningCombination.length = 0;

  // check col
  for (let i = 0; i < boardState.length; i++) {
    winningCombination.push([i, colIndex]);
    if (newBoardState[i][colIndex] !== currentPlayer) break;
    if (i === boardState.length - 1) return winningCombination; //Wins
  }
  winningCombination.length = 0;

  // Check diagonal
  if (rowIndex === colIndex) {
    for (let i = 0; i < boardState.length; i++) {
      winningCombination.push([i, i]);
      if (newBoardState[i][i] !== currentPlayer) break;
      if (i === boardState.length - 1) return winningCombination; //Wins
    }
  }
  winningCombination.length = 0;

  // Check anti diagonal
  if (rowIndex + colIndex === boardState.length - 1) {
    for (let i = 0; i < boardState.length; i++) {
      const currentCol = boardState.length - 1 - i;
      winningCombination.push([i, currentCol]);
      if (newBoardState[i][currentCol] !== currentPlayer) break;
      if (i === boardState.length - 1) return winningCombination; //Wins
    }
  }

  return null;
};

export const findDumbMove = (board: BoardState): CellLocation | null => {
  // Find all null cells
  const availableMoves: { rowIndex: number; colIndex: number }[] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        availableMoves.push({ rowIndex, colIndex });
      }
    });
  });

  // Select a random null cell if there are any available
  if (availableMoves.length > 0) {
    const randomMoveIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomMoveIndex];
    return move;
  }
  return null;
};

export const findAverageMove = (
  board: BoardState,
  aiPlayer: PlayerSymbol
): CellLocation | null => {
  const opponent = aiPlayer === "X" ? "O" : "X";

  // 1. Winning Move
  let move = findWinningMove(board, aiPlayer);
  if (move != null) return move;

  // 2. Block Win
  move = findWinningMove(board, opponent);
  if (move != null) return move;

  // 3. Center Control
  if (board[1][1] === null) return { rowIndex: 1, colIndex: 1 };

  // 4. Opposite Corner
  move = takeOppositeCorner(board, opponent);
  if (move != null) return move;

  // 5. Empty Corner
  move = findEmptyCorner(board);
  if (move != null) return move;

  // 6. Empty Side
  return findEmptySide(board);
};

const findWinningMove = (
  board: BoardState,
  player: PlayerSymbol
): CellLocation | null => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board.length; colIndex++) {
      if (board[rowIndex][colIndex]) continue;
      const winningCombination = checkWinCondition(
        board,
        rowIndex,
        colIndex,
        player
      );
      if (winningCombination !== null) {
        return { rowIndex, colIndex };
      }
    }
  }
  return null;
};

function takeOppositeCorner(
  board: BoardState,
  opponent: PlayerSymbol
): CellLocation | null {
  // Define the corners and their opposites
  const cornersAndOpposites: {
    corner: CellLocation;
    opposite: CellLocation;
  }[] = [
    {
      corner: { rowIndex: 0, colIndex: 0 },
      opposite: { rowIndex: 2, colIndex: 2 },
    },
    {
      corner: { rowIndex: 0, colIndex: 2 },
      opposite: { rowIndex: 2, colIndex: 0 },
    },
    {
      corner: { rowIndex: 2, colIndex: 0 },
      opposite: { rowIndex: 0, colIndex: 2 },
    },
    {
      corner: { rowIndex: 2, colIndex: 2 },
      opposite: { rowIndex: 0, colIndex: 0 },
    },
  ];

  // Iterate over the corners to find an occupied corner with an empty opposite
  for (const { corner, opposite } of cornersAndOpposites) {
    if (
      board[corner.rowIndex][corner.colIndex] === opponent &&
      board[opposite.rowIndex][opposite.colIndex] === null
    ) {
      // If an opponent is in a corner and the opposite corner is empty, return the opposite corner's location
      return opposite;
    }
  }

  // If no suitable opposite corner is found, return null
  return null;
}

function findEmptyCorner(board: BoardState): CellLocation | null {
  // Define corner cells in terms of their row and column indices
  const cornerCells: CellLocation[] = [
    { rowIndex: 0, colIndex: 0 },
    { rowIndex: 0, colIndex: 2 },
    { rowIndex: 2, colIndex: 0 },
    { rowIndex: 2, colIndex: 2 },
  ];

  // Iterate over the cornerCells to find an empty one
  for (const cell of cornerCells) {
    if (board[cell.rowIndex][cell.colIndex] === null) {
      // If an empty corner cell is found, return its location
      return cell;
    }
  }

  // If no empty corner cell is found, return null
  return null;
}

function findEmptySide(board: BoardState): CellLocation | null {
  // Define side cells in terms of their row and column indices
  const sideCells: CellLocation[] = [
    { rowIndex: 0, colIndex: 1 },
    { rowIndex: 1, colIndex: 0 },
    { rowIndex: 1, colIndex: 2 },
    { rowIndex: 2, colIndex: 1 },
  ];

  // Iterate over the sideCells to find an empty one
  for (const cell of sideCells) {
    if (board[cell.rowIndex][cell.colIndex] === null) {
      // If an empty side cell is found, return its location
      return cell;
    }
  }

  // If no empty side cell is found, return null
  return null;
}
