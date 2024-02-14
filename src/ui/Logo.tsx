import styled from "styled-components";
import IconX from "../svg/IconX";
import IconO from "../svg/IconO";

const IconsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 3.2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-bottom: 4rem;
  }
`;

const Logo: React.FC = () => {
  return (
    <IconsContainer>
      <IconX width="3.2rem" />
      <IconO width="3.2rem" />
    </IconsContainer>
  );
};

export default Logo;
