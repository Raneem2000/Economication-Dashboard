import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #c6bbdb;
  padding: 20px 30px;
  border-radius: var(--border-radius-sm);
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
`;
const StyledContent = styled.div`
  justify-content: space-between;
  display: flex;
`;
const Title = styled.h3`
  font: 24px;
  font-weight: 600;
`;
const StyledPoints = styled.p`
  font: 24px;
  font-weight: 600;
`;
const StyledDate = styled.p`
  font: 24px;
  font-weight: 600;
`;
function AboutPoints({ title, points, date }) {
  return (
    <StyledContainer>
      <StyledContent>
        <Title>{title}</Title>
        {points !== undefined ? <StyledPoints>{points} نقطه</StyledPoints> : <StyledDate>{date}</StyledDate>}
      </StyledContent>
    </StyledContainer>
  );
}

export default AboutPoints;
