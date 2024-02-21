import { createPortal } from "react-dom";
import styled, { ThemeContext } from "styled-components";
import Overlay from "/src/ui/Overlay";
import IconOSvg from "/src/svg/IconOSvg";
import Button from "/src/ui/Button";
import useViewportSize from "/src/hooks/useViewportSize";
import { GameState, PlayerSymbol } from "/src/utils/types/types";
import IconXSvg from "/src/svg/IconXSvg";
import { useContext } from "react";
import theme from "/src/styles/theme";

const StyledThreeLinesModal = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  width: 100%;
  height: 22.8rem;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  z-index: 40;
  text-align: center;
  padding-top: 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 26.6rem;
    padding-top: 4.5rem;
  }
`;

const SmallText = styled.p`
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 1.6rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.6rem;
    letter-spacing: 1px;
  }
`;

const TextContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: 2.4rem;
  }
`;

const LargeText = styled.p<{ color?: string }>`
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  color: ${(props) => props.color};
  /* color: ${(props) => props.theme.colors.yellow}; */

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
`;

interface ThreeLinesModalProps {
  gameState: GameState;
  player: PlayerSymbol;
}

const ThreeLinesModal: React.FC<ThreeLinesModalProps> = ({
  gameState,
  player,
}) => {
  const { isTablet, isDesktop } = useViewportSize();
  const themeContext = useContext(ThemeContext);
  const xPlayerColor = themeContext?.colors?.cyan;
  const oPlayerColor = themeContext?.colors?.yellow;

  let iconWidth = "3rem";
  if (isTablet) iconWidth = "6.4rem";
  if (isDesktop) iconWidth = "6.4rem";

  return createPortal(
    <>
      {gameState === "wonOrLost" && (
        <div>
          <Overlay />
          <StyledThreeLinesModal>
            <SmallText>OH NO, YOU LOST…</SmallText>
            <TextContainer>
              {player === "X" ? (
                <IconXSvg width={iconWidth} />
              ) : (
                <IconOSvg width={iconWidth} />
              )}
              <LargeText color={player === "X" ? xPlayerColor : oPlayerColor}>
                TAKES THE ROUND
              </LargeText>
            </TextContainer>
            <ButtonsContainer>
              <Button size="small" color="gray">
                QUIT
              </Button>
              <Button size="small" color="yellow">
                NEXT ROUND
              </Button>
            </ButtonsContainer>
          </StyledThreeLinesModal>
        </div>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

export default ThreeLinesModal;
