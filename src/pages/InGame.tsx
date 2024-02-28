import styled, { ThemeContext } from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../features/game/TurnHint";
import RestartSvg from "../svg/RestartSvg";
import XOBoard from "../features/game/XOBoard";
import ScoreCard from "../features/game/ScoreCard";
import ThreeLinesModal from "../features/game/ThreeLinesModal";
import TwoLinesModal from "../features/game/TwoLinesModal";
import {
  AILevel,
  BoardState,
  CurrentPage,
  GameMode,
  InGameActionType,
  InGameStateType,
  PlayerSymbol,
} from "../utils/types/types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { checkWinCondition, isTie } from "../features/game/gameLogic/gameLogic";
import { findDumbMove } from "../features/game/gameLogic/dumbAILogic";
import { findAverageMove } from "../features/game/gameLogic/averageAILogic";

const GameContainer = styled.div`
  width: 32.8rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 46rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
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

const emptyBoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const initialState: InGameStateType = {
  gameState: "playing",
  currentPlayer: "X",
  boardState: emptyBoardState,
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
      const newBoardState = [...state.boardState.map((row) => [...row])];
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
        boardState: emptyBoardState,
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
  gameMode: GameMode;
  aiLevel: AILevel;
  setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
}

const InGame: React.FC<InGameProps> = ({
  player1Symbol,
  gameMode,
  aiLevel,
  setCurrentPage,
}) => {
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
  const isFirstRender = useRef(true);
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors;

  useEffect(() => {
    if (
      isFirstRender.current &&
      gameMode === "singleplayer" &&
      player1Symbol == "O"
    ) {
      executeAITurn(emptyBoardState, "X", aiLevel);
    }
    isFirstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetMoveCount = () => {
    moveCount.current = 0;
  };

  const checkWinOrTie = (
    newRowIndex: number,
    newColIndex: number,
    oldBoardState: BoardState,
    player: PlayerSymbol
  ): boolean => {
    // Early exit if lastMove is not fully defined.
    if (
      newRowIndex === undefined ||
      newColIndex === undefined ||
      player === undefined
    ) {
      return false;
    }

    // if checkWinCondition is null, then it was not a winning move; else it returns the winning cells positions.
    const tempWinningCells = checkWinCondition(
      oldBoardState,
      newRowIndex,
      newColIndex,
      player
    );

    // Check for win
    if (tempWinningCells) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "wonOrLost" });
      dispatch({ type: "UPDATE_WINNING_CELLS", payload: tempWinningCells });

      // Increment winner's score
      const incrementType =
        player === player1Symbol
          ? "INCREMENT_PLAYER1_SCORE"
          : "INCREMENT_PLAYER2_SCORE";
      dispatch({ type: incrementType });
      return true;
    }

    // Check for tie
    if (isTie(moveCount.current, oldBoardState)) {
      dispatch({ type: "UPDATE_GAME_STATE", payload: "tied" });
      dispatch({ type: "INCREMENT_TIES_SCORE" });
      return true;
    }

    // No win or tie
    return false;
  };

  const handleMove = (rowIndex: number, colIndex: number) => {
    moveCount.current += 1;
    const isWinOrTie = checkWinOrTie(
      rowIndex,
      colIndex,
      boardState,
      currentPlayer
    );

    // Prepare for AI turn
    const newBoardForAI = [...boardState.map((row) => [...row])];
    newBoardForAI[rowIndex][colIndex] = currentPlayer;
    const aiSymbol = currentPlayer === "X" ? "O" : "X";

    const payload = {
      rowIndex,
      colIndex,
      currentPlayer,
    };
    dispatch({ type: "UPDATE_BOARD", payload });

    if (isWinOrTie) return;

    dispatch({ type: "SWITCH_TURN" });

    // AI turn
    if (gameMode === "singleplayer") {
      executeAITurn(newBoardForAI, aiSymbol, aiLevel);
    }
  };

  const executeAITurn = (
    boardState: BoardState,
    aiSymbol: PlayerSymbol,
    aiLevel: AILevel
  ) => {
    let move;
    if (aiLevel === "dumb") {
      move = findDumbMove(boardState);
    } else if (aiLevel === "average") {
      move = findAverageMove(boardState, aiSymbol);
    } else if (aiLevel === "genius") {
      console.log("Make genius move");
    }

    moveCount.current += 1;

    if (!move) return;
    const isWinOrTie = checkWinOrTie(
      move.rowIndex,
      move.colIndex,
      boardState,
      aiSymbol
    );

    const payload = {
      rowIndex: move.rowIndex,
      colIndex: move.colIndex,
      currentPlayer: aiSymbol,
    };
    dispatch({ type: "UPDATE_BOARD", payload });

    if (isWinOrTie) return;

    dispatch({ type: "SWITCH_TURN" });
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
    if (gameMode === "singleplayer" && player1Symbol == "O") {
      executeAITurn(emptyBoardState, "X", aiLevel);
    }
  };

  const handleRestartClick = () => {
    dispatch({ type: "UPDATE_GAME_STATE", payload: "restart" });
  };

  let xPlayerCardText: string, oPlayerCardText: string;
  if (player1Symbol === "X") {
    xPlayerCardText = gameMode === "multiplayer" ? "X (P1)" : "X (YOU)";
    oPlayerCardText = gameMode === "multiplayer" ? "O (P2)" : "O (CPU)";
  } else {
    xPlayerCardText = gameMode === "multiplayer" ? "X (P2)" : "X (CPU)";
    oPlayerCardText = gameMode === "multiplayer" ? "O (P1)" : "O (YOU)";
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
        onMove={handleMove}
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
        gameMode={gameMode}
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
