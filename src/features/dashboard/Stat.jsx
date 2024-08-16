import styled from "styled-components";

const StyledStat = styled.div`
  background-color: #5b2c90;
  border-radius: var(--border-radius-lg);
  padding: 2.6rem;
  display: flex;
  align-items: center;
  width: 90%;
  margin-right: 12px;
  height: 10rem;
  cursor: pointer;
`;

const IconImage = styled.img`
  margin-left: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 13px;
`;

const Title = styled.h5`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-top: 20px;
  margin-right: 1rem;
  font-weight: 400;
  color: #fff;
  opacity: 0.9;
`;

const Value = styled.p`
  color: var(--color-grey-0);
  font-size: 2em;
  letter-spacing: 1px;
`;

function Stat({ image, title, value, handelClickNavigate }) {
  return (
    <StyledStat onClick={handelClickNavigate}>
      <IconImage src={image} alt={title} />
      <TextContainer>
        <Value>{value}</Value>
        <Title>{title}</Title>
      </TextContainer>
    </StyledStat>
  );
}

export default Stat;
