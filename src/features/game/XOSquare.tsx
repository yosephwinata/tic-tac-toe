import styled from "styled-components";
import IconXSvg from "/src/svg/IconXSvg";

const StyledXOSquare = styled.button`
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.8rem ${(props) => props.theme.colors.veryDarkNavy};
`;

const XOSquare: React.FC = () => {
  return (
    <StyledXOSquare>
      <IconXSvg width="4rem" />
    </StyledXOSquare>
  );
};

export default XOSquare;
