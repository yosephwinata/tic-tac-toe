import { BoardState, CellLocation } from "/src/utils/types/types";

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
