export type CurrentPage = "mainMenu" | "inGame";
export type PlayerSymbol = "X" | "O";
export type Cell = PlayerSymbol | null;
export type GameState = "playing" | "wonOrLost" | "tied" | "restart";
export type WinningCells = (number | null)[][];
