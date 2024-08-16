import React, { useState } from "react";
import styled from "styled-components";
import AddFormGame from "./AddFormGame";
import Modal from "../../ui/Modal";
import NewGame from "./NewGame";

const StyledContainer = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
  margin-top: 40px;
  flex-wrap: wrap;
  height: 550px;
  overflow-y: auto;
  width: 99%;
  margin: 30px 9px 10px auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const IconAdd = styled.img`
  width: 52px;
  height: 52px;
`;

const StyledTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-top: 14px;
  color: #5c2d91;
  margin-bottom: 55px;
  margin-top: -1px;
`;

const StyledContent = styled.div`
  cursor: pointer;
  width: 225px;
  height: 272px;
  border-radius: 23px;
  background-color: #c6bbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

function AddGames() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <StyledContainer>
        <NewGame />

        <StyledContent onClick={handleOpenModal}>
          <IconAdd src="/plus history.svg" />
          <StyledTitle>اضافه لعبه</StyledTitle>
        </StyledContent>
      </StyledContainer>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AddFormGame
            onClose={handleCloseModal}
            title="اضافه لعبه"
            EditNameButton="حفظ"
          />
        </Modal>
      )}
    </>
  );
}

export default AddGames;
