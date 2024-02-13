import styled from "styled-components";
import Button from "/src/ui/Button.tsx";

const StyledMainMenu = styled.div`
  margin: 0 2.4rem;
`;

const MainMenu = () => {
  return (
    <StyledMainMenu>
      <Button color="yellow" size="large" $fullWidth={true}>
        NEW GAME (VS CPU)
      </Button>
    </StyledMainMenu>
  );
};

export default MainMenu;
