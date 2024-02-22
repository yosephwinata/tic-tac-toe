export type InGameStateType = {
  gameState: GameState;
  currentPlayer: PlayerSymbol;
  boardState: Cell[][];
  winningCells: WinningCells;
  player1Score: number;
  player2Score: number;
  tiesScore: number;
};

interface UpdateCellPayload {
  rowIndex: number;
  colIndex: number;
  currentPlayer: PlayerSymbol;
}

export type InGameActionType =
  | {
      type: "UPDATE_GAME_STATE";
      payload: GameState;
    }
  | { type: "SWITCH_TURN" }
  | { type: "UPDATE_BOARD"; payload: UpdateCellPayload }
  | { type: "UPDATE_WINNING_CELLS"; payload: WinningCells }
  | { type: "INCREMENT_PLAYER1_SCORE" }
  | { type: "INCREMENT_PLAYER2_SCORE" }
  | { type: "INCREMENT_TIES_SCORE" }
  | { type: "GO_TO_NEXT_ROUND" };

export type CurrentPage = "mainMenu" | "inGame";
export type PlayerSymbol = "X" | "O";
export type Cell = PlayerSymbol | null;
export type GameState = "playing" | "wonOrLost" | "tied" | "restart";
export type WinningCells = (number | null)[][];
