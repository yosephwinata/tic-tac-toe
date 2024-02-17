import styled from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../features/game/TurnHint";
import RestartSvg from "../svg/RestartSvg";
import XOBoard from "../features/game/XOBoard";
import ScoreCard from "../features/game/ScoreCard";
import ThreeLinesModal from "../features/game/ThreeLinesModal";
import TwoLinesModal from "../features/game/TwoLinesModal";

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
      <XOBoard />
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
