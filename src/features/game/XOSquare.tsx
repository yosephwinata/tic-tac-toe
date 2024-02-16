import styled from "styled-components";
import IconXSvg from "/src/svg/IconXSvg";
import useViewportSize from "/src/hooks/useViewportSize";

const StyledXOSquare = styled.button`
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.8rem ${(props) => props.theme.colors.veryDarkNavy};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 14rem;
    height: 14rem;
    border-radius: 15px;
    box-shadow: 0 1rem ${(props) => props.theme.colors.veryDarkNavy};
  }
`;

const XOSquare: React.FC = () => {
  const { isTablet, isDesktop } = useViewportSize();
  let width = "4rem";
  if (isTablet) width = "6.4rem";
  if (isDesktop) width = "6.4rem";

  return (
    <StyledXOSquare>
      <IconXSvg width={width} />
    </StyledXOSquare>
  );
};

export default XOSquare;
