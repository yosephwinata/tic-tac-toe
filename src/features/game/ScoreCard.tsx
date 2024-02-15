import styled from "styled-components";

const StyledScoreCard = styled.div`
  width: 9.6rem;
  height: 6.4rem;
  background-color: ${(props) => props.theme.colors.cyan};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

const ScoreDescription = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.88px;
  color: ${(props) => props.theme.colors.darkNavy};
`;

const ScoreNum = styled.p`
  font-size: 2rem;
  font-weight: var(--weight-bold);
  letter-spacing: 1.25px;
  color: ${(props) => props.theme.colors.darkNavy};
`;

const ScoreCard: React.FC = () => {
  return (
    <StyledScoreCard>
      <ScoreDescription>X (YOU)</ScoreDescription>
      <ScoreNum>14</ScoreNum>
    </StyledScoreCard>
  );
};

export default ScoreCard;
