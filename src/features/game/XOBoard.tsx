import styled from "styled-components";
import XOCell from "./XOCell";
import { Cell } from "/src/utils/types/types";

const StyledXOBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 2rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

interface XOBoardProps {
  boardState: Cell[][];
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

const XOBoard: React.FC<XOBoardProps> = ({ boardState, onCellClick }) => {
  return (
    <StyledXOBoard>
      {boardState.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`}>
            <XOCell
              value={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onCellClick={onCellClick}
            />
          </div>
        ))
      )}
    </StyledXOBoard>
  );
};

export default XOBoard;
