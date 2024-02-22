import styled from "styled-components";

const StyledScoreCard = styled.div<{ $bgColor?: string }>`
  width: 9.6rem;
  height: 6.4rem;
  background-color: ${(props) => props.$bgColor || props.theme.colors.cyan};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 14rem;
    height: 7.2refm;
    border-radius: 15px;
    gap: 0.5rem;
  }
`;

const ScoreText = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.darkNavy};
`;

const ScoreNum = styled.p`
  font-size: 2rem;
  font-weight: var(--weight-bold);
  letter-spacing: 1.25px;
  color: ${(props) => props.theme.colors.darkNavy};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2.4rem;
    letter-spacing: 1.5px;
  }
`;

interface ScoreCardProps {
  bgColor?: string;
  text: string;
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ bgColor, text, score }) => {
  return (
    <StyledScoreCard $bgColor={bgColor}>
      <ScoreText>{text}</ScoreText>
      <ScoreNum>{score}</ScoreNum>
    </StyledScoreCard>
  );
};

export default ScoreCard;
