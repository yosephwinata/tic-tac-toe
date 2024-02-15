import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import IconXSvg from "../../svg/IconXSvg";

const StyledTurnHint = styled.div`
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  padding: 0 1.5rem;
  height: 4rem;
  border-radius: 5px;
  box-shadow: 0 0.4rem ${(props) => props.theme.colors.veryDarkNavy};
  display: inline-flex;
  gap: 0.9rem;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 3rem;
    height: 5.2rem;
    border-radius: 10px;
    box-shadow: 0 0.5rem ${(props) => props.theme.colors.veryDarkNavy};
    gap: 1.3rem;
  }
`;

const TurnText = styled.span`
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.gray};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.6rem;
    letter-spacing: 1px;
  }
`;

const TurnHint: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const fillColor = themeContext?.colors?.gray;
  // let width: string;
  // if (themeContext?.breakpoints?.tablet) {
  //   width = "2rem";
  // } else {
  //   width = "1.6rem";
  // }

  return (
    <StyledTurnHint>
      <IconXSvg width="1.6rem" fillColor={fillColor} />
      <TurnText>Turn</TurnText>
    </StyledTurnHint>
  );
};

export default TurnHint;
