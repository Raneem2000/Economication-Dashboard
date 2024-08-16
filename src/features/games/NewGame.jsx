import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import AddFormGame from "./AddFormGame";
import { api } from "../../services/apiAuth";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import BinOrDeleteUser from "../userprofile/BinOrDeleteUser";

const StyledContainer = styled.div`
  background-color: #c6bbdb;
  border-radius: 21px;
  padding: 20px 10px;
  width: 275px;
  height: 380px;
`;

const StyleEditDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  gap: 6px;
  cursor: pointer;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;
const ActionButtonDelete = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: red;
  cursor: pointer;
`;
const EditIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const EditTitle = styled.p`
  font-size: 11px;
  color: #5c2d91;
  font-weight: 400;
`;
const DeleteTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
`;
const StyleMainContent = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 15px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 100%;
  margin: auto;
`;

const ImageContainer = styled.div`
  width: 178px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 178px;
  object-fit: contain;
`;

const TitleImage = styled.h3`
  font-size: 23px;
  font-weight: 500;
  width: 100%;
  margin-top: 20px;
  color: #000000;
`;

const StyledActiveUsersContainer = styled.div`
  width: 94%;
  margin: 35px auto 14px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Users = styled.div`
  width: 48%;
  background-color: #5c2d91;
  border-radius: 14.5px;
  padding: 5px 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Imageuser = styled.img`
  width: 20px;
  height: 20px;
`;

const NumUser = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
`;

const UserTitle = styled.p`
  font-size: 7px;
  font-weight: 400;
  color: #fff;
`;

const ActiveUsers = styled.div`
  width: 48%;
  background-color: #5c2d91;
  border-radius: 14.5px;
  padding: 5px 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledTotalContainer = styled.div`
  width: 88%;
  margin: 7px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TotalTour = styled.div`
  width: 44%;
  border-radius: 14.5px;
  padding: 6px 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #9d86be;
  color: #fff;
`;

const TourNum = styled.p`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const TourName = styled.p`
  font-size: 7px;
  font-weight: 400;
`;

const TotalTime = styled.div`
  width: 44%;
  border-radius: 14.5px;
  padding: 6px 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #9d86be;
  color: #fff;
`;

const TimeNum = styled.p`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const TimeName = styled.p`
  font-size: 7px;
  font-weight: 400;
`;
function NewGame({ game = {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(game);
  const [games, setGames] = useState([]);
  const [gameToDelete, setGameToDelete] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await api.get("/games");
      setGames(response?.data?.data);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleOpenModal = (game) => {
    setCurrentGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveGame = (updatedGame) => {
    setCurrentGame(updatedGame);
  };

  const handleDeleteClick = (game) => {
    setGameToDelete(game);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/games/delete/${gameToDelete.id}`);
      setIsDeleteDialogOpen(false);
      fetchGames();
    } catch (error) {
      console.error("Error deleting game", error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      {games?.map((item) => (
        <StyledContainer key={item.id}>
          <StyleEditDiv>
            <ActionButtonDelete onClick={() => handleDeleteClick(item)}>
              <DeleteTitle>
                <MdDelete />
              </DeleteTitle>
            </ActionButtonDelete>
            <ActionButton onClick={() => handleOpenModal(item)}>
              <EditTitle>تعديل البيانات</EditTitle>
              <EditIcon src="/Edit.svg" />
            </ActionButton>
          </StyleEditDiv>

          <StyleMainContent>
            <ImageContainer>
              <Image src={item.media.file_path || "/knife.svg"} />
            </ImageContainer>
            <TitleImage>{item.name}</TitleImage>
          </StyleMainContent>
          <StyledActiveUsersContainer>
            <Users>
              <Imageuser src="/user.png" alt="user" />
              <NumUser>{item.disactive_users + item.active_users || 0}</NumUser>
              <UserTitle>المستخدمين</UserTitle>
            </Users>
            <ActiveUsers>
              <Imageuser src="/activeuser.svg" alt="user" />
              <NumUser>{item.active_users || 0}</NumUser>
              <UserTitle>المستخدمين الناشطين</UserTitle>
            </ActiveUsers>
          </StyledActiveUsersContainer>
          <StyledTotalContainer>
            <TotalTour>
              <TourNum>{item.number_round_per_day || 0}</TourNum>
              <TourName>الجولات الاجماليه</TourName>
            </TotalTour>
            <TotalTime>
              <TimeNum>{item.all_times || 0}</TimeNum>
              <TimeName>الوقت الكلي</TimeName>
            </TotalTime>
          </StyledTotalContainer>
          {isModalOpen && currentGame.id === item.id && (
            <Modal onClose={handleCloseModal}>
              <AddFormGame
                title="تعديل اللعبه"
                game={currentGame}
                onClose={handleCloseModal}
                onSave={handleSaveGame}
                EditNameButton="تعديل"
                id={item?.id}
                fetchGames={fetchGames}
              />
            </Modal>
          )}
        </StyledContainer>
      ))}
      {isDeleteDialogOpen && (
        <Modal onClose={handleCloseDeleteDialog}>
          <BinOrDeleteUser
            title="حذف"
            name={gameToDelete?.name}
            onClose={handleCloseDeleteDialog}
            onSave={handleConfirmDelete}
          />
        </Modal>
      )}
    </>
  );
}

export default NewGame;
