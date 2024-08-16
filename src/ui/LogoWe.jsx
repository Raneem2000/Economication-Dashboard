import React from "react";
import styled from "styled-components";
const ImageWeContainer = styled.div`
  width: 96%;
  display: flex;
  justify-content: end;
  align-items: end;
  padding-top: 16px;
`;
const ImgWe = styled.img``;
function LogoWe() {
  return (
    <ImageWeContainer>
      <ImgWe src="/we2.svg" />
    </ImageWeContainer>
  );
}

export default LogoWe;
