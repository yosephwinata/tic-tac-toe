import styled, { ThemeContext } from "styled-components";
import Button from "/src/ui/Button";
import IconXSvg from "../svg/IconXSvg";
import IconOSvg from "../svg/IconOSvg";
import LogoSvg from "../svg/LogoSvg";
import DifficultiesModal from "../features/game/DifficultiesModal";
import { useContext, useState } from "react";

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

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-bottom: 3rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 46rem;
  }
`;

const PlayerPickContainer = styled.div`
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  border-radius: 15px;
  padding: 2.4rem 2.4rem 3rem 2.4rem;
  margin-bottom: 3.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2.4rem 2.4rem 3rem 2.4rem;
    margin-bottom: 4rem;
  }
`;

const Instruction = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-weight: var(--weight-bold);
  font-size: 1.6rem;
  letter-spacing: 1px;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const OptionsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.darkNavy};
  border-radius: 10px;
  padding: 0.9rem 0.8rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.7rem;
`;

const OptionButton = styled.div<{ isSelected: boolean }>`
  border: none;
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.gray : "transparent"};
  width: 50%;
  height: 5.4rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Hint = styled.p`
  font-size: 1.4rem;
  font-weight: var(--weight-medium);
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.gray};
  text-align: center;
  opacity: 50%;
`;

const StyledLogo = styled(LogoSvg)`
  margin-bottom: 3.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-bottom: 4rem;
  }
`;

const MainMenu: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const gray = themeContext?.colors?.gray;
  const darkNavy = themeContext?.colors?.darkNavy;

  enum PlayerSymbol {
    X = "X",
    O = "O",
  }

  const [selectedSymbols, setSelectedSymbols] = useState<PlayerSymbol>(
    PlayerSymbol.X
  );

  const handleSymbolClick = (newSymbol: PlayerSymbol): void => {
    setSelectedSymbols(newSymbol);
  };

  return (
    <StyledMainMenu>
      {/* <DifficultiesModal /> */}
      <MainMenuContainer>
        <StyledLogo />
        <PlayerPickContainer>
          <Instruction>PICK PLAYER 1’S MARK</Instruction>
          <OptionsContainer>
            <OptionButton
              isSelected={selectedSymbols === PlayerSymbol.X}
              onClick={() => handleSymbolClick(PlayerSymbol.X)}
            >
              <IconXSvg
                width="3.2rem"
                fillColor={selectedSymbols === PlayerSymbol.X ? darkNavy : gray}
              />
            </OptionButton>
            <OptionButton
              isSelected={selectedSymbols === PlayerSymbol.O}
              onClick={() => handleSymbolClick(PlayerSymbol.O)}
            >
              <IconOSvg
                width="3.2rem"
                fillColor={selectedSymbols === PlayerSymbol.O ? darkNavy : gray}
              />
            </OptionButton>
          </OptionsContainer>
          <Hint>REMEMBER : X GOES FIRST</Hint>
        </PlayerPickContainer>

        <Button color="yellow" size="large" $fullWidth={true}>
          NEW GAME (VS AI)
        </Button>
        <Button color="cyan" size="large" $fullWidth={true}>
          NEW GAME (VS PLAYER)
        </Button>
      </MainMenuContainer>
    </StyledMainMenu>
  );
};

export default MainMenu;
