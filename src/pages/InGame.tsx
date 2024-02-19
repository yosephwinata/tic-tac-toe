import styled from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../features/game/TurnHint";
import RestartSvg from "../svg/RestartSvg";
import XOBoard from "../features/game/XOBoard";
import ScoreCard from "../features/game/ScoreCard";
import ThreeLinesModal from "../features/game/ThreeLinesModal";
import TwoLinesModal from "../features/game/TwoLinesModal";
import { Cell, PlayerSymbol } from "../utils/types/types";
import { useReducer } from "react";

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
  status: "playing" | "won" | "lost" | "tied" | "restart";
  currentPlayer: PlayerSymbol;
  boardState: Cell[][];
  player1Score: number;
  player2Score: number;
  tiesScore: number;
};

const initialState: StateType = {
  status: "playing",
  currentPlayer: "X",
  boardState: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
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
  | { type: "INCREMENT_TIES_SCORE" };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SWITCH_TURN": {
      let nextPlayer: PlayerSymbol;
      if (state.currentPlayer === "X") nextPlayer = "O";
      else nextPlayer = "X";

      return { ...state, currentPlayer: nextPlayer };
    }
    case "UPDATE_BOARD": {
      const newBoardState = state.boardState;
      newBoardState[action.payload.rowIndex][action.payload.colIndex] =
        action.payload.currentPlayer;
      return { ...state, boardState: newBoardState };
    }
    default:
      throw new Error("Action unkonwn");
  }
};

interface InGameProps {
  player1Symbol: PlayerSymbol;
}

const InGame: React.FC<InGameProps> = ({ player1Symbol }) => {
  const [
    {
      status,
      currentPlayer,
      boardState,
      player1Score,
      player2Score,
      tiesScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const payload = {
      rowIndex,
      colIndex,
      currentPlayer,
    };
    dispatch({ type: "UPDATE_BOARD", payload });
    dispatch({ type: "SWITCH_TURN" });
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
      <XOBoard boardState={boardState} onCellClick={handleCellClick} />
      <ScoreCards>
        <ScoreCard />
        <ScoreCard />
        <ScoreCard />
      </ScoreCards>

      {/* <ThreeLinesModal /> */}
      {/* <TwoLinesModal /> */}
    </GameContainer>
  );
};

export default InGame;
