import styled from "styled-components";
import XOCell from "./XOCell";
import { Cell, PlayerSymbol, WinningCells } from "/src/utils/types/types";

const StyledXOBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 2rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

interface XOBoardProps {
  boardState: Cell[][];
  winningCells: WinningCells;
  currentPlayer: PlayerSymbol;
  onMove: (rowIndex: number, colIndex: number) => void;
}

const XOBoard: React.FC<XOBoardProps> = ({
  boardState,
  winningCells,
  currentPlayer,
  onMove,
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
              winningCells={winningCells}
              currentPlayer={currentPlayer}
              onMove={onMove}
            />
          </div>
        ))
      )}
    </StyledXOBoard>
  );
};

export default XOBoard;
