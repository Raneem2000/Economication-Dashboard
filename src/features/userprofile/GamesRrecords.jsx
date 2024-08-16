import React from "react";
import styled from "styled-components";
import { GiTwoCoins } from "react-icons/gi";
const StyledCoins = styled(GiTwoCoins)`
  color: gold;
  font-size: 13px;
`;
const Container = styled.div`
  padding: 15px 30px 5px 30px;
  background-color: #ebebeb;
  margin-bottom: 14px;
  border-radius: var(--border-radius-sm);
`;
const AboutGames = styled.div`
  display: flex;
  justify-content: space-between;
`;
const GamesInfo = styled.div`
  display: flex;
  gap: 4px;
  margin-right: -8px;
`;
const ImageGame = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
`;
const GamesDesc = styled.div``;
const Title = styled.h3`
  font-size: 16px;
  color: #160041;
`;
const GameDate = styled.p`
  font-size: 9px;
  color: #5a6474;
`;
const StatusGames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StatusTitle = styled.h6`
  color: #5c2d91;
  font-size: 13px;
  margin-bottom: -8px;
`;
const Icon = styled.p`
  color: #5c2d91;
  margin-bottom: -3px;
`;
const StyledPoints = styled.div`
  background-color: #5c2d91;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 10px;
`;
const NumPoints = styled.p`
  margin-right: 3px;
`;
const StyleTotalContainer = styled.div`
  width: 70%;
  margin: 15px auto 0px auto;
  display: flex;
  justify-content: space-between;
`;
const TotalAboutUser = styled.div`
  background-color: #9d86be;
  width: 130px;
  border-radius: 25px;
  color: #fff;
  padding: 5px 4px;
  text-align: center;
  font-size: 14px;
`;
const TotalDes = styled.span`
  font-size: 12px;
  margin: 0px 3px;
`;
function GamesRrecords({ titleGame, date, statusGame, StatusIcon, points, image }) {
  return (
    <Container>
      <AboutGames>
        <GamesInfo>
          <ImageGame src={image} />
          <GamesDesc>
            <Title> {titleGame} </Title>
            <GameDate>{date}</GameDate>
          </GamesDesc>
        </GamesInfo>
        <StatusGames>
          <StatusTitle>{statusGame}</StatusTitle>
          <Icon>{StatusIcon}</Icon>
          <StyledPoints>
            <StyledCoins />
            <NumPoints>{points}</NumPoints>
          </StyledPoints>
        </StatusGames>
      </AboutGames>
      <StyleTotalContainer>
        <TotalAboutUser>
          1200 <TotalDes>الجوله الاجماليه</TotalDes>
        </TotalAboutUser>
        <TotalAboutUser>
          1200 <TotalDes>الوقت الكلي</TotalDes>
        </TotalAboutUser>
      </StyleTotalContainer>
    </Container>
  );
}

export default GamesRrecords;
