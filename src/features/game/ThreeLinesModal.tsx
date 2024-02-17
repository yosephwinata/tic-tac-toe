import { createPortal } from "react-dom";
import styled from "styled-components";
import Overlay from "/src/ui/Overlay";
import IconOSvg from "/src/svg/IconOSvg";
import Button from "/src/ui/Button";

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
`;

const SmallText = styled.p`
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 1.6rem;
`;

const TextContainer = styled.div`
  display: inline-flex;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
`;

const LargeText = styled.p`
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  color: ${(props) => props.theme.colors.yellow};
`;

const ButtonsContainer = styled.div`
  display: inline-flex;
  gap: 1.6rem;
`;

const ThreeLinesModal = () => {
  return createPortal(
    <>
      <Overlay />
      <StyledThreeLinesModal>
        <SmallText>OH NO, YOU LOST…</SmallText>
        <TextContainer>
          <IconOSvg width="3rem" />
          <LargeText>TAKES THE ROUND</LargeText>
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
    </>,
    document.getElementById("modal") as Element
  );
};

export default ThreeLinesModal;
