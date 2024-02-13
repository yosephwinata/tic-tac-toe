import styled from "styled-components";
import Button from "/src/ui/Button.tsx";
import IconX from "../svg/IconX";
import IconO from "../svg/IconO";

const StyledMainMenu = styled.div`
  margin: 0 2.4rem;

  Button:first-of-type {
    margin-bottom: 1.6rem;
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

const MainMenu = () => {
  return (
    <StyledMainMenu>
      <IconsContainer>
        <IconWrapper>
          <IconX />
        </IconWrapper>
        <IconWrapper>
          <IconO />
        </IconWrapper>
      </IconsContainer>
      <Button color="yellow" size="large" $fullWidth={true}>
        NEW GAME (VS CPU)
      </Button>
      <Button color="cyan" size="large" $fullWidth={true}>
        NEW GAME (VS PLAYER)
      </Button>
    </StyledMainMenu>
  );
};

export default MainMenu;
