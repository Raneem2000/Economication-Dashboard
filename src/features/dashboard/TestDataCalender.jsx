import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import styled from "styled-components";

const StyledData = styled.div`
  .react-calendar {
    border: none;
    width: 100%;
    font-family: "Cairo", sans-serif;
    height: 100%;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    background-color: #f5eefa;
    border-radius: var(--border-radius-md);
    height: 30px !important;
  }

  .react-calendar button {
    color: #000;
    height: 35px !important;
  }

  .react-calendar__month-view__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 20px 0;
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .react-calendar__tile {
    width: 100% !important;
    height: 36px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px !important;
    box-sizing: border-box;
  }

  .react-calendar__tile--active {
    background-color: #e9b3d2 !important;
    color: #fff !important;
    font-weight: 500;
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    padding: 0 !important;
  }

  .react-calendar__tile--now {
    background-color: #e9b3d2 !important;
    color: #fff !important;
    border-radius: 50%;
    width: 30px !important;
    height: 30px !important;
    padding: 0 !important;
  }

  .react-calendar__tile:hover {
    background-color: #e9b3d2 !important;
    color: #fff !important;
    border-radius: 50%;
    width: 30px !important;
    height: 30px !important;
    padding: 0 !important;
  }

  .react-calendar__tile:disabled {
    background-color: #f5eefa !important;
    color: #d6d6d6 !important;
  }

  .react-calendar__navigation button {
    width: auto;
    background: none;
    border: none;
    &:focus {
      outline: none;
      background: none;
      border: none !important;
    }
    &:hover {
      background: none;
    }
  }
`;

function TestDataCalendar({ onChange }) {
  // Pass onChange as a prop
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    onChange(date); // Call onChange prop with the new date
  };

  const formatDayWithAl = (date) => {
    const formattedDay = format(date, "EEEE", { locale: ar });
    return `${formattedDay}`;
  };

  return (
    <StyledData>
      <Calendar
        locale="ar"
        onChange={handleDateChange} // Use local handleDateChange function
        value={date}
        formatDay={(locale, date) => format(date, "d", { locale: ar })}
        formatShortWeekday={(locale, date) => formatDayWithAl(date)}
      />
    </StyledData>
  );
}

export default TestDataCalendar;
