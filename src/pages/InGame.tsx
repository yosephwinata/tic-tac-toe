import styled from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../ui/TurnHint";
import RestartSvg from "../svg/RestartSvg";

const GameContainer = styled.div`
  margin: 2.4rem;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 6.4rem;
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
`;

const InGame: React.FC = () => {
  return (
    <GameContainer>
      <TopBar>
        <LogoSvg />
        <TurnHint />
        <RestartButton>
          <RestartSvg width="1.6rem" />
        </RestartButton>
      </TopBar>
    </GameContainer>
  );
};

export default InGame;
