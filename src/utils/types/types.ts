// Primitives
export type GameMode = "singleplayer" | "multiplayer";
export type AILevel = "dumb" | "average" | "genius";
export type CurrentPage = "mainMenu" | "inGame";
export type PlayerSymbol = "X" | "O";
export type Cell = PlayerSymbol | null;
export type GameState = "playing" | "wonOrLost" | "tied" | "restart";
export type WinningCells = (number | null)[][];

// Functions
export type HandleNewGameVsAI = (
  selectedSymbol: PlayerSymbol,
  level: AILevel
) => void;

// Reducer
type LastMove = {
  rowIndex: number | undefined;
  colIndex: number | undefined;
  player: PlayerSymbol | undefined;
};

export type InGameStateType = {
  gameState: GameState;
  currentPlayer: PlayerSymbol;
  boardState: Cell[][];
  lastMove: LastMove;
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
  | { type: "UPDATE_LAST_MOVE"; payload: LastMove }
  | { type: "UPDATE_WINNING_CELLS"; payload: WinningCells }
  | { type: "INCREMENT_PLAYER1_SCORE" }
  | { type: "INCREMENT_PLAYER2_SCORE" }
  | { type: "INCREMENT_TIES_SCORE" }
  | { type: "RESET_GAME" }
  | { type: "RESET_SCORES" };
