import React from "react";
import styled from "styled-components";
import DurationLineChart from "./DurationLineChart";
import { BsCheck2Circle } from "react-icons/bs";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

const StyledGamesContainer = styled.div`
  margin-top: 10px;
  height: calc(100vh - 330px);
  font-family: "Cairo";
  margin-right: 30px;

  width: 100vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    margin-right: 20px;
  }

  @media (max-width: 992px) {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    margin-right: 5px;
  }

  @media (max-width: 576px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const STyleShowData = styled.div`
  background-color: #c6bbdb;
  margin-bottom: 20px;
  border-radius: var(--border-radius-md);
  padding: 10px 10px;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? "2px solid #5c2d91" : "none")};
  box-shadow: ${(props) => (props.isSelected ? "0 2px 8px 2px" : "none")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 576px) {
    height: 90px;
  }
`;

const ChartContainerWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledGameabout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  justify-content: space-between;
`;

const StyledGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
  }
`;

const StyledGameImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: var(--border-radius-md);

  @media (max-width: 768px) {
    width: 6rem;
    height: 6rem;
  }

  @media (max-width: 576px) {
    width: 5rem;
    height: 5rem;
  }
`;

const GameTitle = styled.h2`
  margin-bottom: -5px;
  font-weight: bolder;
  color: #623d99;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const StyledNumPlayers = styled.div`
  display: flex;
  align-items: center;
  background-color: #8e70b4;
  gap: 5px;
  width: 140px;
  border-radius: 24px;
  color: #fff;

  @media (max-width: 768px) {
    width: 120px;
  }

  @media (max-width: 576px) {
    width: 100px;
  }
`;

const NumPlayers = styled.h3`
  font-weight: 400;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 576px) {
    font-size: 10px;
  }
`;

const Players = styled.p`
  font-size: 10px;

  @media (max-width: 768px) {
    font-size: 8px;
  }

  @media (max-width: 576px) {
    font-size: 6px;
  }
`;

const ChartTitle = styled.h3`
  color: #000;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const CheckIcon = styled(BsCheck2Circle)`
  color: #5c2d91;
`;

const CheckMonthly = styled(RiCheckboxBlankCircleLine)`
  color: #5c2d91;
`;

const ChartDays = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ImagePlayer = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
`;

const MonName = styled.h5``;

function GamesResults({
  games,
  onSelectGame,
  selectedGame,
  setSelectedGameBorder,
  activeButton,
  chartData, // استلام chartData كـ prop
}) {
  const handleGameClick = (game) => {
    setSelectedGameBorder(game);
    onSelectGame(game);
  };
  console.log(games);
  return (
    <StyledGamesContainer>
      {games.map((game) => (
        <STyleShowData
          key={game.id}
          onClick={() => handleGameClick(game)}
          isSelected={selectedGame && selectedGame.id === game.id}
        >
          <StyledGameabout>
            <StyledGame>
              <StyledGameImage
                src={game.media.file_path}
                alt={game.media.title}
              />
              <GameTitle>{game.name}</GameTitle>
            </StyledGame>
            <StyledNumPlayers>
              <ImagePlayer src="/1.svg" alt="user-image" />
              <NumPlayers>{game.players}</NumPlayers>
              <Players>عدد الاعبين</Players>
            </StyledNumPlayers>
          </StyledGameabout>
        </STyleShowData>
      ))}

      <ChartContainerWrapper>
        <STyleShowData style={{ flex: 1 }}>
          <ChartContainer>
            <ChartTitle>الالعاب</ChartTitle>
            <ChartDays>
              {activeButton === "اليوم" ? <CheckIcon /> : <CheckMonthly />}
              <MonName>اليوم</MonName>
            </ChartDays>
            <ChartDays>
              {activeButton === "الاسبوع" ? <CheckIcon /> : <CheckMonthly />}
              <MonName>الاسبوع</MonName>
            </ChartDays>
            <ChartDays>
              {activeButton === "الشهر" ? <CheckIcon /> : <CheckMonthly />}
              <MonName>الشهر</MonName>
            </ChartDays>
          </ChartContainer>
          <DurationLineChart data={chartData} />
        </STyleShowData>
      </ChartContainerWrapper>
    </StyledGamesContainer>
  );
}

export default GamesResults;
