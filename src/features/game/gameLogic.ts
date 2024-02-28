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

export const makeDumbMove = (board: BoardState): CellLocation | null => {
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
