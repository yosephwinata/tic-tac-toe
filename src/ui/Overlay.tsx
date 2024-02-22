import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.black};
  opacity: 50%;
`;

const Overlay: React.FC = () => {
  return <StyledOverlay></StyledOverlay>;
};

export default Overlay;
