import { BoardState, CellLocation, PlayerSymbol } from "/src/utils/types/types";

export const findGeniusMove = (
  board: BoardState,
  aiPlayer: PlayerSymbol
): CellLocation | null => {
  let bestVal = -Infinity;
  let bestMove: CellLocation | null = null;

  // Traverse all cells, evaluate minimax function for all empty cells
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        // Make the move
        board[i][j] = aiPlayer;
        // Compute evaluation function for this move
        const moveVal = minimax(board, 0, false, -Infinity, Infinity, aiPlayer);
        // Undo the move
        board[i][j] = null;

        // If the value of the current move is more than the best value, then update best
        if (moveVal > bestVal) {
          bestMove = { rowIndex: i, colIndex: j };
          bestVal = moveVal;
        }
      }
    }
  }

  return bestMove;
};

const minimax = (
  board: BoardState,
  depth: number,
  isMax: boolean,
  alpha: number,
  beta: number,
  aiPlayer: PlayerSymbol
): number => {
  const opponent = aiPlayer === "X" ? "O" : "X";
  const score = evaluate(board, aiPlayer);

  // If Maximizer has won the game return evaluated score
  if (score === 10) return score - depth;

  // If Minimizer has won the game return evaluated score
  if (score === -10) return score + depth;

  // If there are no more moves and no winner then it is a tie
  if (!isMovesLeft(board)) return 0;

  if (isMax) {
    let best = -Infinity;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === null) {
          // Make the move
          board[i][j] = aiPlayer;
          // Call minimax recursively and choose the maximum value
          best = Math.max(
            best,
            minimax(board, depth + 1, !isMax, alpha, beta, aiPlayer)
          );
          // Undo the move
          board[i][j] = null;
          alpha = Math.max(alpha, best);
          if (beta <= alpha) break; // Alpha Beta Pruning
        }
      }
    }
    return best;
  } else {
    let best = Infinity;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === null) {
          // Make the move
          board[i][j] = opponent;
          // Call minimax recursively and choose the minimum value
          best = Math.min(
            best,
            minimax(board, depth + 1, !isMax, alpha, beta, aiPlayer)
          );
          // Undo the move
          board[i][j] = null;
          beta = Math.min(beta, best);
          if (beta <= alpha) break; // Alpha Beta Pruning
        }
      }
    }
    return best;
  }
};

// Evaluate the current board state
const evaluate = (board: BoardState, aiPlayer: PlayerSymbol): number => {
  // Define winning conditions
  const winningConditions = [
    [
      { rowIndex: 0, colIndex: 0 },
      { rowIndex: 0, colIndex: 1 },
      { rowIndex: 0, colIndex: 2 },
    ],
    [
      { rowIndex: 1, colIndex: 0 },
      { rowIndex: 1, colIndex: 1 },
      { rowIndex: 1, colIndex: 2 },
    ],
    [
      { rowIndex: 2, colIndex: 0 },
      { rowIndex: 2, colIndex: 1 },
      { rowIndex: 2, colIndex: 2 },
    ],
    [
      { rowIndex: 0, colIndex: 0 },
      { rowIndex: 1, colIndex: 0 },
      { rowIndex: 2, colIndex: 0 },
    ],
    [
      { rowIndex: 0, colIndex: 1 },
      { rowIndex: 1, colIndex: 1 },
      { rowIndex: 2, colIndex: 1 },
    ],
    [
      { rowIndex: 0, colIndex: 2 },
      { rowIndex: 1, colIndex: 2 },
      { rowIndex: 2, colIndex: 2 },
    ],
    [
      { rowIndex: 0, colIndex: 0 },
      { rowIndex: 1, colIndex: 1 },
      { rowIndex: 2, colIndex: 2 },
    ],
    [
      { rowIndex: 0, colIndex: 2 },
      { rowIndex: 1, colIndex: 1 },
      { rowIndex: 2, colIndex: 0 },
    ],
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      board[a.rowIndex][a.colIndex] === aiPlayer &&
      board[b.rowIndex][b.colIndex] === aiPlayer &&
      board[c.rowIndex][c.colIndex] === aiPlayer
    ) {
      return 10;
    } else if (
      board[a.rowIndex][a.colIndex] !== null &&
      board[a.rowIndex][a.colIndex] !== aiPlayer &&
      board[b.rowIndex][b.colIndex] !== null &&
      board[b.rowIndex][b.colIndex] !== aiPlayer &&
      board[c.rowIndex][c.colIndex] !== null &&
      board[c.rowIndex][c.colIndex] !== aiPlayer
    ) {
      return -10;
    }
  }

  return 0; // No win or loss
};

// Check if there are moves left on the board
const isMovesLeft = (board: BoardState): boolean => {
  return board.some((row) => row.includes(null));
};
