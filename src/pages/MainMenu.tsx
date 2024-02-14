import styled from "styled-components";
import Button from "/src/ui/Button";
import IconX from "../svg/IconX";
import IconO from "../svg/IconO";

const StyledMainMenu = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainMenuContainer = styled.div`
  margin: 0 2.4rem;

  Button:first-of-type {
    margin-bottom: 2.6rem;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 3.2rem;
`;

const IconWrapper = styled.div`
  width: 3.2rem;

  svg {
    width: 100%;
  }
`;

const PlayerPickContainer = styled.div`
  background-color: var(--color-semi-dark-navy);
  border-radius: 15px;
  padding: 2.4rem 2.4rem 3rem 2.4rem;
  margin-bottom: 3.2rem;
`;

const Instruction = styled.p`
  color: var(--color-gray);
  font-weight: var(--weight-bold);
  font-size: 1.6rem;
  letter-spacing: 1px;
  margin-bottom: 3.3rem;
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

const MainMenu: React.FC = () => {
  return (
    <StyledMainMenu>
      <MainMenuContainer>
        <IconsContainer>
          <IconWrapper>
            <IconX />
          </IconWrapper>
          <IconWrapper>
            <IconO />
          </IconWrapper>
        </IconsContainer>

        <PlayerPickContainer>
          <Instruction>PICK PLAYER 1’S MARK</Instruction>
          <OptionsContainer>
            <OptionButton>
              <IconWrapper>
                <IconX />
              </IconWrapper>
            </OptionButton>
            <OptionButton>
              <IconWrapper>
                <IconO />
              </IconWrapper>
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
