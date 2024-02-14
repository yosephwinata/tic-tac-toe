import styled from "styled-components";
import Button from "/src/ui/Button";
import IconX from "../svg/IconX";
import IconO from "../svg/IconO";
import Logo from "../ui/Logo";

const StyledMainMenu = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainMenuContainer = styled.div`
  width: 32.7rem;
  text-align: center;

  Button:first-of-type {
    margin-bottom: 2.6rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 46rem;
  }
`;

const PlayerPickContainer = styled.div`
  background-color: var(--color-semi-dark-navy);
  border-radius: 15px;
  padding: 2.4rem 2.4rem 3rem 2.4rem;
  margin-bottom: 3.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2.4rem 2.4rem 3rem 2.4rem;
  }
`;

const Instruction = styled.p`
  color: var(--color-gray);
  font-weight: var(--weight-bold);
  font-size: 1.6rem;
  letter-spacing: 1px;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const OptionsContainer = styled.div`
  background-color: var(--color-dark-navy);
  border-radius: 10px;
  padding: 0.9rem 0.8rem;
  display: flex;
  margin-bottom: 1.7rem;
`;

const OptionButton = styled.div`
  background-color: red;
  width: 50%;
  height: 5.4rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hint = styled.p`
  font-size: 1.4rem;
  font-weight: var(--weight-medium);
  letter-spacing: 0.88px;
  color: var(--color-gray);
  text-align: center;
  opacity: 50%;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 3.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-bottom: 4rem;
  }
`;

const MainMenu: React.FC = () => {
  return (
    <StyledMainMenu>
      <MainMenuContainer>
        <StyledLogo />
        <PlayerPickContainer>
          <Instruction>PICK PLAYER 1’S MARK</Instruction>
          <OptionsContainer>
            <OptionButton>
              <IconX width="3.2rem" />
            </OptionButton>
            <OptionButton>
              <IconO width="3.2rem" />
            </OptionButton>
          </OptionsContainer>
          <Hint>REMEMBER : X GOES FIRST</Hint>
        </PlayerPickContainer>

        <Button color="yellow" size="large" $fullWidth={true}>
          NEW GAME (VS CPU)
        </Button>
        <Button color="cyan" size="large" $fullWidth={true}>
          NEW GAME (VS PLAYER)
        </Button>
      </MainMenuContainer>
    </StyledMainMenu>
  );
};

export default MainMenu;
