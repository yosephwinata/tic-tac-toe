import styled from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../features/game/TurnHint";
import RestartSvg from "../svg/RestartSvg";
import XOBoard from "../features/game/XOBoard";
import ScoreCard from "../features/game/ScoreCard";
import ThreeLinesModal from "../features/game/ThreeLinesModal";
import TwoLinesModal from "../features/game/TwoLinesModal";
import { Cell, PlayerSymbol } from "../utils/types/types";
import { useReducer, useRef } from "react";
import { GameState } from "../utils/types/types";

const GameContainer = styled.div`
  width: 32.8rem;
  margin: 2.4rem auto;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 46rem;
    margin: 20.1rem auto;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    margin: 13.9rem auto;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 6.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-bottom: 2.25rem;
  }
`;

const RestartButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  border-radius: 5px;
  box-shadow: 0 0.4rem ${(props) => props.theme.colors.darkGray};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 10px;
    box-shadow: 0 0.5rem ${(props) => props.theme.colors.darkGray};
  }
`;

const ScoreCards = styled.div`
  display: flex;
  justify-content: space-between;
`;

type StateType = {
  gameState: GameState;
  currentPlayer: PlayerSymbol;
  boardState: Cell[][];
  moveCount: number;
  player1Score: number;
  player2Score: number;
  tiesScore: number;
};

const initialState: StateType = {
  gameState: "playing",
  currentPlayer: "X",
  boardState: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  moveCount: 0,
  player1Score: 0,
  player2Score: 0,
  tiesScore: 0,
};

interface UpdateCellPayload {
  rowIndex: number;
  colIndex: number;
  currentPlayer: PlayerSymbol;
}

type ActionType =
  | { type: "SWITCH_TURN" }
  | { type: "UPDATE_BOARD"; payload: UpdateCellPayload }
  | { type: "INCREMENT_PLAYER1_SCORE" }
  | { type: "INCREMENT_PLAYER2_SCORE" }
  | { type: "INCREMENT_TIES_SCORE" }
  | {
      type: "UPDATE_GAME_STATE";
      payload: GameState;
    };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SWITCH_TURN": {
      let nextPlayer: PlayerSymbol;
      if (state.currentPlayer === "X") nextPlayer = "O";
      else nextPlayer = "X";

      return { ...state, currentPlayer: nextPlayer };
    }
    case "UPDATE_BOARD": {
      const newBoardState = state.boardState.map((row) => [...row]);
      newBoardState[action.payload.rowIndex][action.payload.colIndex] =
        action.payload.currentPlayer;
      return { ...state, boardState: newBoardState };
    }
    case "UPDATE_GAME_STATE":
      return { ...state, gameState: action.payload };
    default:
      throw new Error("Action unknown");
  }
};

interface InGameProps {
  player1Symbol: PlayerSymbol;
}

const InGame: React.FC<InGameProps> = ({ player1Symbol }) => {
  const [
    {
      gameState,
      currentPlayer,
      boardState,
      player1Score,
      player2Score,
      tiesScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const moveCount = useRef(0);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    moveCount.current += 1;
    const payload = {
      rowIndex,
      colIndex,
      currentPlayer,
    };
    const won = checkWinCondition(
      boardState,
      rowIndex,
      colIndex,
      currentPlayer
    );
    console.log("wo00o0n", won);
    dispatch({ type: "UPDATE_BOARD", payload });
    if (won) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "wonOrLost" });
    } else {
      if (checkTie()) {
        dispatch({ type: "UPDATE_GAME_STATE", payload: "tied" });
      }
      dispatch({ type: "SWITCH_TURN" });
    }
  };

  const checkWinCondition = (
    boardState: Cell[][],
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

  const checkTie = (): boolean => {
    console.log("ttieeee");
    if (moveCount.current === Math.pow(boardState.length, 2)) {
      return true;
    }
    return false;
  };

  return (
    <GameContainer>
      <TopBar>
        <LogoSvg />
        <TurnHint currentPlayer={currentPlayer} />
        <RestartButton>
          <RestartSvg width="1.6rem" />
        </RestartButton>
      </TopBar>
      <XOBoard
        gameState={gameState}
        boardState={boardState}
        currentPlayer={currentPlayer}
        onCellClick={handleCellClick}
      />
      <ScoreCards>
        <ScoreCard />
        <ScoreCard />
        <ScoreCard />
      </ScoreCards>

      <ThreeLinesModal
        gameState={gameState}
        winningPlayer={currentPlayer}
        player1={player1Symbol}
      />
      <TwoLinesModal gameState={gameState} />
    </GameContainer>
  );
};

export default InGame;
