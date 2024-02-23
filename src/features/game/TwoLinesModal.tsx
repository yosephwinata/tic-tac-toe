import { createPortal } from "react-dom";
import styled from "styled-components";
import Overlay from "/src/ui/Overlay";
import Button from "/src/ui/Button";
import { GameState } from "/src/utils/types/types";

const StyledTwoLinesModal = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  width: 100%;
  height: 22.8rem;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  z-index: 40;
  text-align: center;
  padding-top: 6.1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 26.6rem;
  }
`;

const Text = styled.p`
  font-size: 2.4rem;
  font-weight: var(--weight-bold);
  letter-spacing: 1.5px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 2.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
    letter-spacing: 2.5px;
    margin-bottom: 3.1rem;
  }
`;

const ButtonsContainer = styled.div`
  display: inline-flex;
  gap: 1.6rem;
`;

interface TwoLinesModalProps {
  gameState: GameState;
  onNextRoundClick: () => void;
  onQuitClick: () => void;
}

const TwoLinesModal: React.FC<TwoLinesModalProps> = ({
  gameState,
  onNextRoundClick,
  onQuitClick,
}) => {
  return createPortal(
    <>
      {(gameState === "restart" || gameState === "tied") && (
        <div>
          <Overlay />
          <StyledTwoLinesModal>
            {gameState === "restart" && <Text>RESTART GAME?</Text>}
            {gameState === "tied" && <Text>ROUND TIED</Text>}
            <ButtonsContainer>
              {gameState === "restart" ? (
                <Button size="small" color="gray">
                  NO, CANCEL
                </Button>
              ) : (
                <Button size="small" color="gray" onClick={onQuitClick}>
                  QUIT
                </Button>
              )}
              {gameState === "restart" ? (
                <Button size="small" color="yellow">
                  YES, RESTART
                </Button>
              ) : (
                <Button size="small" color="yellow" onClick={onNextRoundClick}>
                  NEXT ROUND
                </Button>
              )}
            </ButtonsContainer>
          </StyledTwoLinesModal>
        </div>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

export default TwoLinesModal;
