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
  useReducer,
  useRef,
} from "react";
import {
  checkWinCondition,
  getRandomEmptyCell,
  isTie,
} from "../features/game/gameLogic";

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
    // case "MAKE_DUMB_MOVES": {
    //   // Create a deep copy of the board
    //   const newBoard = [...state.boardState.map((row) => [...row])];
    //   const { rowIndex, colIndex } = action.payload;
    //   newBoard[rowIndex][colIndex] = state.currentPlayer;
    //   return { ...state, boardState: newBoard };
    // }
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
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors;

  const resetMoveCount = () => {
    moveCount.current = 0;
  };

  // useEffect(() => {
  //   if (gameMode === "singleplayer" && currentPlayer !== player1Symbol) {
  //     if (aiLevel === "dumb") {
  //       const selectedCell = getRandomEmptyCell(boardState);
  //       if (selectedCell !== null) {
  //         dispatch({ type: "MAKE_DUMB_MOVES", payload: selectedCell });
  //         //trial
  //         const { rowIndex, colIndex } = selectedCell;
  //         moveCount.current += 1;
  //         dispatch({
  //           type: "UPDATE_LAST_MOVE",
  //           payload: { rowIndex, colIndex, player: currentPlayer },
  //         });
  //       }
  //     }

  //     dispatch({ type: "SWITCH_TURN" });
  //   }
  // }, [currentPlayer, aiLevel, gameMode, boardState, player1Symbol]);

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

    const payload = {
      rowIndex,
      colIndex,
      currentPlayer,
    };
    dispatch({ type: "UPDATE_BOARD", payload });

    if (!isWinOrTie) {
      dispatch({ type: "SWITCH_TURN" });
    }
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
