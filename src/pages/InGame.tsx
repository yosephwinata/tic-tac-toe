import styled, { ThemeContext } from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../features/game/TurnHint";
import RestartSvg from "../svg/RestartSvg";
import XOBoard from "../features/game/XOBoard";
import ScoreCard from "../features/game/ScoreCard";
import ThreeLinesModal from "../features/game/ThreeLinesModal";
import TwoLinesModal from "../features/game/TwoLinesModal";
import {
  Cell,
  InGameActionType,
  InGameStateType,
  PlayerSymbol,
} from "../utils/types/types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useRef,
} from "react";

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
  box-shadow: 0 0.6rem ${(props) => props.theme.colors.darkGray};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &:active {
    transform: translateY(0.24rem);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 10px;
  }
`;

const ScoreCards = styled.div`
  display: flex;
  justify-content: space-between;
`;

const initialState: InGameStateType = {
  gameState: "playing",
  currentPlayer: "X",
  boardState: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  winningCells: [
    [null, null],
    [null, null],
    [null, null],
  ],
  player1Score: 0,
  player2Score: 0,
  tiesScore: 0,
};

const reducer = (
  state: InGameStateType,
  action: InGameActionType
): InGameStateType => {
  switch (action.type) {
    case "UPDATE_GAME_STATE":
      return { ...state, gameState: action.payload };
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
    case "UPDATE_WINNING_CELLS": {
      return { ...state, winningCells: action.payload };
    }
    case "INCREMENT_PLAYER1_SCORE": {
      return { ...state, player1Score: state.player1Score + 1 };
    }
    case "INCREMENT_PLAYER2_SCORE": {
      return { ...state, player2Score: state.player2Score + 1 };
    }
    case "INCREMENT_TIES_SCORE": {
      return { ...state, tiesScore: state.tiesScore + 1 };
    }
    case "RESET_GAME": {
      return {
        ...state,
        gameState: "playing",
        currentPlayer: "X",
        boardState: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        winningCells: [
          [null, null],
          [null, null],
          [null, null],
        ],
      };
    }
    case "RESET_SCORES": {
      return {
        ...state,
        player1Score: 0,
        player2Score: 0,
        tiesScore: 0,
      };
    }
    default:
      throw new Error("Action unknown");
  }
};

interface InGameProps {
  player1Symbol: PlayerSymbol;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const InGame: React.FC<InGameProps> = ({ player1Symbol, setCurrentPage }) => {
  const [
    {
      gameState,
      currentPlayer,
      boardState,
      winningCells,
      player1Score,
      player2Score,
      tiesScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const moveCount = useRef(0);
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors;

  const resetMoveCount = () => {
    moveCount.current = 0;
  };

  const handleCellUpdate = (rowIndex: number, colIndex: number) => {
    moveCount.current += 1;
    const payload = {
      rowIndex,
      colIndex,
      currentPlayer,
    };
    const tempWinningCells = checkWinCondition(
      boardState,
      rowIndex,
      colIndex,
      currentPlayer
    );
    dispatch({ type: "UPDATE_BOARD", payload });
    if (tempWinningCells) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "wonOrLost" });
      dispatch({ type: "UPDATE_WINNING_CELLS", payload: tempWinningCells });
      if (currentPlayer === player1Symbol) {
        dispatch({ type: "INCREMENT_PLAYER1_SCORE" });
      } else {
        dispatch({ type: "INCREMENT_PLAYER2_SCORE" });
      }
    } else {
      if (checkTie()) {
        dispatch({ type: "INCREMENT_TIES_SCORE" });
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
    if (moveCount.current === Math.pow(boardState.length, 2)) {
      return true;
    }
    return false;
  };

  const handleQuitGame = (): void => {
    dispatch({ type: "RESET_GAME" });
    dispatch({ type: "RESET_SCORES" });
    resetMoveCount();
    setCurrentPage("mainMenu");
  };

  const handleNextRoundClick = () => {
    dispatch({ type: "RESET_GAME" });
    resetMoveCount();
  };

  const handleRestartClick = () => {
    dispatch({ type: "UPDATE_GAME_STATE", payload: "restart" });
  };

  let xPlayerCardText: string, oPlayerCardText: string;
  if (player1Symbol === "X") {
    xPlayerCardText = "X (P1)";
    oPlayerCardText = "O (P2)";
  } else {
    xPlayerCardText = "X (P2)";
    oPlayerCardText = "O (P1)";
  }

  return (
    <GameContainer>
      <TopBar>
        <LogoSvg />
        <TurnHint currentPlayer={currentPlayer} />
        <RestartButton onClick={handleRestartClick}>
          <RestartSvg width="1.6rem" />
        </RestartButton>
      </TopBar>
      <XOBoard
        boardState={boardState}
        winningCells={winningCells}
        currentPlayer={currentPlayer}
        onCellUpdate={handleCellUpdate}
      />
      <ScoreCards>
        <ScoreCard
          bgColor={colors?.cyan}
          text={xPlayerCardText}
          score={player1Symbol === "X" ? player1Score : player2Score}
        />
        <ScoreCard bgColor={colors?.gray} text="TIES" score={tiesScore} />
        <ScoreCard
          bgColor={colors?.yellow}
          text={oPlayerCardText}
          score={player1Symbol === "O" ? player1Score : player2Score}
        />
      </ScoreCards>

      <ThreeLinesModal
        gameState={gameState}
        winningPlayer={currentPlayer}
        player1={player1Symbol}
        dispatch={dispatch}
        onQuitClick={handleQuitGame}
        onNextRoundClick={handleNextRoundClick}
      />
      <TwoLinesModal
        gameState={gameState}
        dispatch={dispatch}
        onQuitClick={handleQuitGame}
        onNextRoundClick={handleNextRoundClick}
        resetMoveCount={resetMoveCount}
      />
    </GameContainer>
  );
};

export default InGame;
