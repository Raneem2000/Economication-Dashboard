import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DataCalendar from "./DataCalender";
import { api } from "../../services/apiAuth";

const StyledCalender = styled.div`
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10vh);
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding: 1.2rem 0.3rem 3.2rem 0.3rem;
  width: 100%;
`;

const ButtonsCategory = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
`;

const FilterCategory = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 10px;
`;

const ModalContent = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  font-size: 20px;
  text-align: center;
`;

function Calenders({
  selectedGame,
  setSelectedGame,
  setSelectedGameBorder,
  activeButton,
  setActiveButton,
  setChartData, // إضافة setChartData كـ prop
}) {
  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [calendarKey, setCalendarKey] = useState(0);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (!activeButton || !selectedDate || !selectedGame) {
      setModalMessage("يرجى اختيار فلتر، تاريخ، ولعبة لإتمام العملية.");
    } else {
      setModalMessage("تم الاختيار بنجاح! شكرًا لاختيارك.");

      // تحديد قيم المتغيرات
      const game_id = selectedGame.id;
      const type =
        activeButton === "اليوم"
          ? "daily"
          : activeButton === "الاسبوع"
          ? "weekly"
          : "monthly";
      const day =
        type === "daily" ? selectedDate.toISOString().split("T")[0] : null;
      const from_date =
        type === "weekly" || type === "monthly"
          ? selectedDate.toISOString().split("T")[0]
          : null;
      const to_date =
        type === "weekly"
          ? new Date(selectedDate.setDate(selectedDate.getDate() + 6))
              .toISOString()
              .split("T")[0]
          : type === "monthly"
          ? new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
              .toISOString()
              .split("T")[0]
          : null;

      console.log("Selected Data:");
      console.log("game_id:", game_id);
      console.log("type:", type);
      console.log("day:", day);
      console.log("from_date:", from_date);
      console.log("to_date:", to_date);

      try {
        const response = await api.post(`/dashboard/statistic-games`, {
          game_id,
          type,
          day,
          from_date,
          to_date,
        });
        setChartData(response.data.data.statistic);

        console.log("Response from API:", response.data.data.statistic[0]);
      } catch (error) {
        console.error("Error posting data", error);
      }
    }
    setIsModalVisible(true);
    setSelectedDate(initialDate);
    setCalendarKey((prevKey) => prevKey + 1); // Reset the calendar
  };

  const handleModalClose = () => {
    setActiveButton("اليوم");
    setSelectedDate(initialDate);
    setSelectedGame(null);
    setIsModalVisible(false);
    setSelectedGameBorder(null);
    setCalendarKey((prevKey) => prevKey + 1); // Reset the calendar
  };

  return (
    <StyledCalender>
      <FilterCategory>
        {["اليوم", "الاسبوع", "الشهر"].map((buttonName) => (
          <Button
            key={buttonName}
            isActive={activeButton === buttonName}
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </Button>
        ))}
      </FilterCategory>
      <DataCalendar
        key={calendarKey}
        view={activeButton}
        date={selectedDate}
        setDate={handleDateChange}
        activeButton={activeButton}
      />
      <ButtonsCategory>
        <Button
          style={{ width: "30%", marginTop: "0" }}
          size="large"
          variation="puple"
          onClick={handleSubmit}
        >
          ادخال
        </Button>
        <Button
          style={{ width: "30%", marginTop: "0" }}
          size="large"
          variation="cancelCalender"
          onClick={handleModalClose}
        >
          الغاء
        </Button>
      </ButtonsCategory>
      {isModalVisible && (
        <Modal onClose={handleModalClose}>
          <ModalContent>{modalMessage}</ModalContent>
        </Modal>
      )}
    </StyledCalender>
  );
}

export default Calenders;
