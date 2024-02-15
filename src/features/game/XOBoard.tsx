import styled from "styled-components";
import XOSquare from "./XOSquare";

const StyledXOBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 2rem;
  justify-content: space-between;
`;

const XOBoard: React.FC = () => {
  return (
    <StyledXOBoard>
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
      <XOSquare />
    </StyledXOBoard>
  );
};

export default XOBoard;
