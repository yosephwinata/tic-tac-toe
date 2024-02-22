import styled from "styled-components";
import XOCell from "./XOCell";
import { Cell, GameState, PlayerSymbol } from "/src/utils/types/types";

const StyledXOBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 2rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

interface XOBoardProps {
  gameState: GameState;
  boardState: Cell[][];
  currentPlayer: PlayerSymbol;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

const XOBoard: React.FC<XOBoardProps> = ({
  gameState,
  boardState,
  currentPlayer,
  onCellClick,
}) => {
  return (
    <StyledXOBoard>
      {boardState.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`}>
            <XOCell
              value={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              gameState={gameState}
              currentPlayer={currentPlayer}
              onCellClick={onCellClick}
            />
          </div>
        ))
      )}
    </StyledXOBoard>
  );
};

export default XOBoard;
