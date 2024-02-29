import styled from "styled-components";

const StyledCredits = styled.p`
  color: ${(props) => props.theme.colors.lightGray};
  font-size: 1.2rem;
  position: absolute;
  bottom: 0;
  margin-bottom: 2.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.6rem;
    margin-bottom: 3.2rem;
  }
`;

const Name = styled.span`
  color: ${(props) => props.theme.colors.cyan};
`;

const Credits: React.FC = () => {
  return (
    <StyledCredits>
      Coded by <Name>Yoseph Winata</Name>
    </StyledCredits>
  );
};

export default Credits;
