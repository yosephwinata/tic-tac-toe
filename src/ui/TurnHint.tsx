import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import IconX from "../svg/IconX";

const StyledTurnHint = styled.div`
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  padding: 1rem 1.5rem 1.4rem;
  border-radius: 5px;
  box-shadow: 0 0.4rem ${(props) => props.theme.colors.veryDarkNavy};
  display: inline-flex;
  gap: 0.9rem;
  align-items: center;
`;

const TurnText = styled.span`
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.gray};
`;

const TurnHint: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const fillColor = themeContext.colors?.gray;

  return (
    <StyledTurnHint>
      <IconX width="1.6rem" fillColor={fillColor} />
      <TurnText>Turn</TurnText>
    </StyledTurnHint>
  );
};

export default TurnHint;