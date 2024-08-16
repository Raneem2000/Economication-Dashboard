import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format, startOfWeek, endOfWeek, isSameDay, isWithinInterval, getMonth, getYear } from "date-fns";
import { ar } from "date-fns/locale";
import styled from "styled-components";

const StyledData = styled.div`
  display: flex;
  flex-grow: 1;
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
    height: 39px !important;
    border-radius: 50%;
    width: 100%;
  }

  .react-calendar__viewContainer {
    height: calc(-560px + 100vh);
  }
  .react-calendar__month-view {
    height: 100%;
    > div {
      height: 100%;
      > div {
        height: 100%;
      }
    }
  }
  .react-calendar__month-view__weekdays {
    margin-inline-start: 14px !important;
    margin-top: 2rem !important;
  }

  .react-calendar__month-view__days {
    flex-grow: 1;
    display: grid;
    margin-inline-start: 15px !important;
    height: 100%;
  }

  .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0;
    flex: 0 0 8.7% !important;
    overflow: hidden;
    margin-inline-end: 10px !important;
    margin-inline-start: 17px !important;

    @media (min-width: 1600px) {
      margin-inline-end: 16px !important;
      margin-inline-start: 13px !important;
    }
    @media (min-width: 1800px) {
      margin-inline-end: 19px !important;
      margin-inline-start: 13px !important;
    }
    @media (min-width: 2200px) {
      margin-inline-end: 24px !important;
      margin-inline-start: 13px !important;
    }
    @media (min-width: 2400px) {
      margin-inline-end: 27px !important;
      margin-inline-end: 35px !important;
    }
  }

  .react-calendar__tile--active {
    background: #e9b3d2 !important;
    color: #fff !important;
    font-weight: 500;
    border-radius: 50%;
    flex: 0 0 8.7% !important;
    overflow: hidden;
    margin-inline-end: 11px !important;
    margin-inline-start: 19px !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile--now {
    background: none !important;
    color: #e9b3d2 !important;
    flex: 0 0 8.7% !important;
    overflow: hidden;
    margin-inline-end: 10px !important;
    margin-inline-start: 17px !important;

    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile--selected {
    background: #e9b3d2 !important;
    color: #fff !important;
    border-radius: 50%;
    flex: 0 0 8.7% !important;
    overflow: hidden;
    margin-inline-end: 10px !important;
    margin-inline-start: 17px !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .react-calendar__tile:hover {
    padding: 0px !important;
    color: #fff !important;
    border-radius: 50%;
    background: #e9b3d2 !important;
    flex: 0 0 8.7% !important;
    overflow: hidden;
    margin-inline-end: 10px !important;
    margin-inline-start: 17px !important;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }
  .react-calendar__tile--current-month {
    background: #e9b3d2 !important;
    color: #fff !important;
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

  .react-calendar__year-view__months {
    display: grid !important;
    margin-left: 26px;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    > button {
      width: 100% !important;
      height: 38px !important;
    }
  }

  .react-calendar__year-view__months__month {
    width: 22.5% !important;
    text-align: center;
    margin: 20px 10px 14px 10px;

    &.react-calendar__tile--current-month {
      background: #e9b3d2 !important;
      color: #fff !important;
      border-radius: 10px;
    }

    &.react-calendar__tile--selected {
      background: #e9b3d2 !important;
      color: #fff !important;
      border-radius: 10px;
    }

    &.react-calendar__tile--now {
      background: none !important;
      color: #e9b3d2 !important;
      border-radius: 10px;
    }

    &:hover {
      background: #e9b3d2 !important;
      color: #fff !important;
      border-radius: 10px;
    }

    &:focus {
      background: #e9b3d2 !important;
      border-radius: 10px;
      color: #fff !important;
      outline: none !important;
    }
  }

  .react-calendar__tile--week {
    background: rgba(233, 179, 210, 0.2) !important;
    border-radius: 50% !important;
  }
  .react-calendar__tile--selected-week-day {
    border-radius: 0 !important;
    color: red;
  }
`;

function DataCalendar({ view, date, setDate, activeButton }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (view === "الشهر") {
      setSelectedDate(date);
    }
  }, [view, date]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setDate(newDate);
  };

  const getView = (view) => {
    switch (view) {
      case "اليوم":
        return "month";
      case "الاسبوع":
        return "month";
      case "الشهر":
        return "year";
      default:
        return "month";
    }
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
        view={getView(view)}
        tileClassName={({ date, view }) => {
          if (view === "year") {
            const isCurrentMonth = getMonth(date) === getMonth(new Date()) && getYear(date) === getYear(new Date());
            const isSelectedMonth = getMonth(date) === getMonth(selectedDate) && getYear(date) === getYear(selectedDate);
            return isSelectedMonth ? "react-calendar__tile--selected" : isCurrentMonth ? "react-calendar__tile--current-month" : null;
          } else if (view === "month" && activeButton === "الاسبوع") {
            const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 6 });
            const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 6 });
            const isCurrentWeek = isWithinInterval(date, { start: startOfCurrentWeek, end: endOfCurrentWeek });
            const isToday = isSameDay(date, new Date());
            const isSelectedDay = isSameDay(date, selectedDate);
            return isSelectedDay ? "react-calendar__tile--selected" : isCurrentWeek ? "react-calendar__tile--week" : isToday ? "react-calendar__tile--now" : null;
          } else {
            if (isSameDay(date, selectedDate)) {
              return "react-calendar__tile--selected";
            }
            if (isSameDay(date, new Date())) {
              return "react-calendar__tile--now";
            }
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
