import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 14.6rem;
  object-fit: contain;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/Gamzie.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
