import { createPortal } from "react-dom";
import { Fragment } from "react";
import styled, { ThemeContext, css, keyframes } from "styled-components";
import Overlay from "/src/ui/Overlay";
import IconOSvg from "/src/svg/IconOSvg";
import Button from "/src/ui/Button";
import useViewportSize from "/src/hooks/useViewportSize";
import {
  GameMode,
  GameState,
  InGameActionType,
  PlayerSymbol,
} from "/src/utils/types/types";
import IconXSvg from "/src/svg/IconXSvg";
import { Dispatch, useContext } from "react";

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(-50%);
  }
`;

const StyledThreeLinesModal = styled.div<{ $show: boolean }>`
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
  animation: ${({ $show }) =>
    $show
      ? css`
          ${slideInAnimation} 0.75s forwards
        `
      : "none"};

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
  gameMode: GameMode;
  gameState: GameState;
  winningPlayer: PlayerSymbol;
  player1: PlayerSymbol;
  dispatch: Dispatch<InGameActionType>;
  onNextRoundClick: () => void;
  onQuitClick: () => void;
}

const ThreeLinesModal: React.FC<ThreeLinesModalProps> = ({
  gameMode,
  gameState,
  winningPlayer,
  player1,
  onNextRoundClick,
  onQuitClick,
}) => {
  const { isTablet, isDesktop } = useViewportSize();
  const themeContext = useContext(ThemeContext);
  const xPlayerColor = themeContext?.colors?.cyan;
  const oPlayerColor = themeContext?.colors?.yellow;

  let iconWidth = "3rem";
  if (isTablet) iconWidth = "6.4rem";
  if (isDesktop) iconWidth = "6.4rem";

  let smallText: string;
  if (gameMode === "singleplayer") {
    if (winningPlayer === player1) smallText = "YOU WON!";
    else smallText = "OH NO, YOU LOST…";
  } else {
    if (winningPlayer === player1) smallText = "PLAYER 1 WINS!";
    else smallText = "PLAYER 2 WINS!";
  }

  const show = gameState === "wonOrLost";

  return createPortal(
    <>
      {show && (
        <Fragment>
          <Overlay />
          <StyledThreeLinesModal $show={show}>
            <SmallText>{smallText}</SmallText>
            <TextContainer>
              {winningPlayer === "X" ? (
                <IconXSvg width={iconWidth} />
              ) : (
                <IconOSvg width={iconWidth} />
              )}
              <LargeText
                color={winningPlayer === "X" ? xPlayerColor : oPlayerColor}
              >
                TAKES THE ROUND
              </LargeText>
            </TextContainer>
            <ButtonsContainer>
              <Button size="small" color="gray" onClick={onQuitClick}>
                QUIT
              </Button>
              <Button size="small" color="yellow" onClick={onNextRoundClick}>
                NEXT ROUND
              </Button>
            </ButtonsContainer>
          </StyledThreeLinesModal>
        </Fragment>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

export default ThreeLinesModal;
