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
    margin-inline-start: 20px !important;
    margin-top: 20px !important;
  }

  .react-calendar__month-view__days__day {
    flex: 0 0 36px !important;
    margin-inline-start: 57px;
  }

  .react-calendar__tile {
    padding: 3px;
  }

  .react-calendar__tile--active {
    background: #e9b3d2 !important;
    color: #fff !important;
    font-weight: 500;
    border-radius: 120px;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile--now {
    background: none !important;
    color: #e9b3d2 !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile--selected {
    background: #e9b3d2 !important;
    color: #fff !important;
    border-radius: 120px;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile:hover {
    padding: 0px !important;
    color: #e9b3d2 !important;
    border-radius: 120px;
    background: none !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__navigation button {
    width: 20px;
    background: none;
    border: none;
    &:focus {
      outline: none;
      background: none;
      border: red !important;
    }
    &:hover {
      background: none;
    }
  }
`;

function DataCalendar({ view, date, setDate }) {
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDayWithAl = (date) => {
    const formattedDay = format(date, "EEEE", { locale: ar });
    return `${formattedDay}`;
  };

  return (
    <StyledData>
      <Calendar
        locale="ar"
        onChange={handleDateChange}
        value={date}
        view={view}
        tileClassName={({ date, view }) => {
          if (format(date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
            return "react-calendar__tile--selected";
          }
          if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
            return "react-calendar__tile--now";
          }
          return null;
        }}
        formatDay={(locale, date) => format(date, "d", { locale: ar })}
        formatShortWeekday={(locale, date) => formatDayWithAl(date)}
      />
    </StyledData>
  );
}

export default DataCalendar;
