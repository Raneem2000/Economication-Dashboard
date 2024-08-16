import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import DataCalender from "../dashboard/DataCalender";
import AboutPoints from "./AboutPoints";
import GamesRrecords from "./GamesRrecords";
import DataCalendar from "../dashboard/DataCalender";
import { api } from "../../services/apiAuth";
import { date } from "yup";
import { FormatDate } from "../../hook/formatDate";

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 20px; /* Add gap between items */
`;

const StyledCalender = styled.div`
  width: 100%; /* Default to full width on small screens */
  max-width: 100%; /* Ensure it takes up full width on smaller screens */
margin-bottom: 10rem ;
  @media (min-width: 900px) {
    max-width: 45%; /* 45% width on larger screens */
  }
  
  .react-calendar__month-view__weekdays {
    margin-top: 20px !important;
  }

  .react-calendar__month-view__days__day {
    flex: 0 0 calc(100% / 7) !important;
    max-width: calc(100% / 7);
    margin-inline-start: 0px !important;
    box-sizing: border-box;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--now,
  .react-calendar__tile--selected,
  .react-calendar__tile:hover {
    background: #e9b3d2 !important;
    color: #fff !important;
    border-radius: 50%;
    flex: 0 0 8.2% !important;
    overflow: hidden;
    margin-inline-end: 10px !important;
    margin-inline-start: 17px !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar button {
    color: #000;
    height: 30px !important;
    border-radius: 50%;
    width: 100%;
  }

  .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0;
    flex: 0 0 6.8% !important;
    overflow: hidden;
    margin-inline-end: 12px !important;
    margin-inline-start: 21px !important;

    @media (min-width: 1600px) {
      margin-inline-end: 15px !important;
      margin-inline-start: 23px !important;
    }
    @media (min-width: 1900px) {
      margin-inline-end: 17px !important;
      margin-inline-start: 26px !important;
    }
    @media (min-width: 2200px) {
      margin-inline-end: 23px !important;
      margin-inline-start: 31px !important;
    }
    @media (min-width: 2400px) {
      background-color: yellow;
      margin-inline-end: 41px !important;
      margin-inline-start: 34px !important;
    }
  }
`;

const StyledPoints = styled.div`
  width: 100%; /* Default to full width on small screens */
  max-width: 100%; /* Ensure it takes up full width on smaller screens */

  @media (min-width: 900px) {
    max-width: 45%; /* 45% width on larger screens */
    margin-top: 0; /* Remove top margin on larger screens */
  }
  
  @media (max-width: 900px) {
    margin-top: 20px; /* Add top margin on smaller screens */
  }
`;

const StyledGames = styled.div`
  width: 100%; /* Default to full width on small screens */
  margin-top: 20px;

  @media (min-width: 900px) {
    width: auto; /* Adjust width on larger screens */
  }
`;



function Record(data) {
  const [reportGames, setReportGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2024-06-02");
  const fetchGamesReport = (date) => {
    const formattedDate = FormatDate(date); // تنسيق التاريخ
    api
      .get(`/games/report-games`, { params: { day: formattedDate } })
      .then((response) => setReportGames(response.data.data))
      .catch((error) => console.error("Error fetching report games:", error));
  };

  useEffect(() => {
    fetchGamesReport(selectedDate);
  }, [selectedDate]);
  return (
    <Container>
      <StyledCalender>
        <DataCalendar date={selectedDate} setDate={setSelectedDate} />
        {/* <DataCalender /> */}
      </StyledCalender>
      <StyledPoints>
        <AboutPoints title="نقاط شحن" points={data?.data.charge_points || 0} />
        <AboutPoints
          title="نقاط مكافأه"
          points={data.data.gift_charge_points || 0}
        />
        <AboutPoints
          title="اجمالي عدد النقط "
          points={data.data.charge_points + data.data.gift_charge_points || 0}
        />
        <AboutPoints title="تاريخ شحن" date={data.data.date_charge || ""} />

        <StyledGames>
          {reportGames.map((game) => (
            <GamesRrecords
              key={game.id}
              titleGame={game.name_ar}
              date="2024/7/3"
              image={game.media.file_path}
              statusGame={
                game.win_points > game.loss_points ? "المكسب" : "الخساره"
              }
              StatusIcon={game.win_points > game.loss_points ? "+" : "-"}
              points={game.win_points}
            />
          ))}
        </StyledGames>
      </StyledPoints>
    </Container>
  );
}

export default Record;
