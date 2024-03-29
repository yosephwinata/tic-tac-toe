import { Fragment } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Overlay from "/src/ui/Overlay";
import Button from "/src/ui/Button";
import { HandleNewGameVsAI, PlayerSymbol } from "/src/utils/types/types";

const StyledDifficultiesModal = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  width: 100%;
  height: auto;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  z-index: 40;
  text-align: center;
  padding: 4rem 0 5rem 0;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 10rem 0 10rem 0;
  }
`;

const Instructions = styled.p`
  font-size: 2.4rem;
  font-weight: var(--weight-bold);
  letter-spacing: 1.5px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 3rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
    letter-spacing: 2.5px;
    margin-bottom: 3.2rem;
  }
`;

const Buttons = styled.div`
  width: 30rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 32rem;
    gap: 2.5rem;
  }
`;

interface DifficultiesModalProps {
  isVisible: boolean;
  selectedSymbol: PlayerSymbol;
  onNewGameVsAIClick: HandleNewGameVsAI;
}

const DifficultiesModal: React.FC<DifficultiesModalProps> = ({
  isVisible,
  selectedSymbol,
  onNewGameVsAIClick,
}) => {
  return createPortal(
    <>
      {isVisible && (
        <Fragment>
          <Overlay />
          <StyledDifficultiesModal>
            <Instructions>SELECT AI LEVEL</Instructions>
            <Buttons>
              <Button
                size="small"
                color="yellow"
                onClick={() => onNewGameVsAIClick(selectedSymbol, "dumb")}
              >
                IDIOT
              </Button>
              <Button
                size="small"
                color="yellow"
                onClick={() => onNewGameVsAIClick(selectedSymbol, "average")}
              >
                AVERAGE
              </Button>
              <Button
                size="small"
                color="yellow"
                onClick={() => onNewGameVsAIClick(selectedSymbol, "genius")}
              >
                EINSTEIN
              </Button>
            </Buttons>
          </StyledDifficultiesModal>
        </Fragment>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

export default DifficultiesModal;
