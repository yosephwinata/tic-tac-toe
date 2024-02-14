import styled from "styled-components";
import IconX from "../svg/IconX";
import IconO from "../svg/IconO";

const IconsContainer = styled.div`
  display: inline-flex;
  gap: 0.8rem;
  justify-content: center;
`;

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <IconsContainer className={className}>
      <IconX width="3.2rem" />
      <IconO width="3.2rem" />
    </IconsContainer>
  );
};

export default Logo;
