import { BoardState, CellLocation, PlayerSymbol } from "/src/utils/types/types";
import { checkWinCondition } from "./gameLogic";

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
