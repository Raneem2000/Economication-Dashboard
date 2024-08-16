import React, { useState } from "react";
import styled from "styled-components";
import { GiTwoCoins } from "react-icons/gi";
import Modal from "../ui/Modal";
import AddOrDedectionPoint from "../features/userprofile/AddOrDedectionPoint";
import BinOrDeleteUser from "../features/userprofile/BinOrDeleteUser";
import Record from "../features/userprofile/Record";
import { useEffect } from "react";
import { api } from "../services/apiAuth";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import BlockedIcon from "/blocked.svg";
import Header from "../ui/Header";

const ProfileContainer = styled.div`
  width: 90%;
  margin: auto;
`;
const HeaderSuggesions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Suggestion = styled.button`
  background-color: #7959a1;
  color: rgb(232 225 225);
  width: 140px;
  padding: 4px 7px;
  border-radius: 4px;
  border: 2px solid #7959a1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  outline: none;
  &:focus {
    outline: none;
  }
  ${({ isActive }) =>
    isActive &&
    `
    background-color: rgb(179 179 179);
    color :#f6f2f3;
    border:2px solid rgb(179 179 179);
  
  `}
`;
const DetailsUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;
const AboutUser = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
const ImgUser = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 10px;
`;
const TotalAboutUser = styled.div`
  background-color: #92278f;
  width: 170px;
  border-radius: 25px;
  color: #fff;
  padding: 5px 8px;
  text-align: center;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
const EditData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const EditName = styled.p`
  color: #7959a1;
  font-size: 13px;
  font-weight: 600;
`;
const EditIcon = styled.img``;
const TotalDes = styled.span`
  font-size: 12px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.h1`
  font-size: 29px;
  font-weight: 600;
`;
const StyledCoins = styled(GiTwoCoins)`
  color: gold;
  font-size: 20px;
  padding-top: 5px;
`;
const UserPoint = styled.h4`
  margin-right: 7px;
  font-size: 14px;
`;
const ContactMe = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-right: 10px;
`;
const Phone = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 8px 0px;
`;
const IconPhone = styled.img`
  width: 18px;
  height: 18px;
`;
const Location = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 8px 0px;
`;
const IconLocation = styled.img`
  width: 18px;
  height: 18px;
`;
const Email = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 8px 0px;
`;
const IconEmail = styled.img`
  width: 18px;
  height: 18px;
`;
const Date = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 8px 0px;
`;
const IconDate = styled.img`
  width: 18px;
  height: 18px;
`;
const AddIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const MinusIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const RecordIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const BanIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const ButtonEnter = styled.button`
  width: 18%;
  border: none;
  outline: none;
  background-color: #5c2d91;
  border-radius: 4px;
  color: #fff;
  padding: 5px 0px;
  &:focus {
    outline: none;
  }
`;
const ButtonCancel = styled.button`
  width: 18%;
  background-color: #fdf7ff;
  border: 1px solid #e1e3e6;
  padding: 5px 0px;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
const ButtonsCategory = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 20px;
  justify-content: center;
  gap: 20px;
`;
const InputEdit = styled.input`
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 0px 13px;
  border-radius: 4px;
  background-color: #fff;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;
const StyleUserName = styled.div`
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const ImageName = styled.div`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url("/1.svg");
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    right: -5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;

    ${(props) =>
      !props.is_active
        ? `content: url(${BlockedIcon});`
        : props.is_online
        ? `background-color: #02c60a;`
        : `background-color: #cecece;`}
  }
`;
const emailSchema = Yup.string().email("البريد الإلكتروني غير صالح");

const ProfileUser = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isRecordVisible, setIsRecordVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);

  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({
    username: "",
    points: "",
    phone: "",
    address: "",
    email: "",
    date_of_birth: "",
    is_active: true,
  });
  const { profileName } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/show/${profileName}`);
        console.log(response?.data?.data);
        setUserInfo({
          username: response.data?.data.username,
          points: response.data?.data.points,
          phone: response.data?.data.phone,
          address: response.data?.data.address,
          email: response.data?.data.email,
          date_of_birth: response.data?.data.date_of_birth,
          is_active: response.data?.data?.is_active,
          num_rounds: response?.data?.data?.num_rounds,
          time_rounds: response?.data?.data?.time_rounds,
          is_online: response?.data?.data?.is_online,
        });
        setSubscriptionHistory(response?.data?.data?.subscription_history?.[0]|| []);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSuggestionClick = (modalType) => {
    if (modalType === "السجل") {
      setIsRecordVisible(!isRecordVisible);
    } else {
      setIsRecordVisible(false);
      setActiveModal(modalType);
    }
    setActiveButton(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setActiveButton(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    if (name === "email") {
      try {
        await emailSchema.validate(value);
        setErrors((prev) => ({ ...prev, email: null }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, email: err.message }));
      }
    }
  };

  const handleSaveClick = async () => {
    try {
      await emailSchema.validate(userInfo.email); // التحقق من البريد الإلكتروني عند الحفظ
      const {
        points,
        is_online,
        is_active,
        time_rounds,
        num_rounds,
        ...dataToSend
      } = userInfo;
      dataToSend._method = "put";

      const formData = new FormData();
      for (const key in dataToSend) {
        formData.append(key, dataToSend[key]);
      }

      await api.post(`/users/update-profile/${profileName}`, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data", error);
      if (error.name === "البريد الإلكتروني غير صالح") {
        setErrors((prev) => ({ ...prev, email: error.message }));
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await api.delete(`/users/delete/${profileName}`);
      handleCloseModal();
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user data", error);
    }
  };
  const handleBlockClick = async () => {
    try {
      await api.put(`/users/block-unblock/${profileName}`, {
        ...userInfo,
      });
      handleCloseModal();
      navigate("/users");
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };
  const handlePointsUpdate = async (newPoints) => {
    try {
      await api.put(`/users/update-points/${profileName}}`, {
        points: newPoints,
      });
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        points: newPoints,
      }));
    } catch (error) {
      console.error("Error updating points", error);
    }
  };
  const renderModalContent = () => {
    switch (activeModal) {
      case "اضافه نقاط":
        return (
          <>
            <AddOrDedectionPoint
              title="اضافه نقاط"
              onClose={handleCloseModal}
              initialPoints={userInfo?.points}
              isAdding={true}
              onSave={handlePointsUpdate}
            />
          </>
        );
      case "خصم نقاط":
        return (
          <>
            <AddOrDedectionPoint
              title="خصم نقاط"
              onClose={handleCloseModal}
              initialPoints={userInfo?.points}
              isAdding={false}
              onSave={handlePointsUpdate}
            />
          </>
        );
      case "حظر":
        return (
          <BinOrDeleteUser
            title={userInfo?.is_active === true ? "حظر" : "فك الحظر"}
            name={userInfo.username}
            onClose={handleCloseModal}
            onSave={handleBlockClick}
          />
        );
      case "حذف":
        return (
          <>
            <BinOrDeleteUser
              title="حذف"
              name={userInfo.username}
              onClose={handleCloseModal}
              onSave={handleDeleteClick}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <ProfileContainer>
        <HeaderSuggesions>
          <Suggestion
            isActive={activeButton === "اضافه نقاط"}
            onClick={() => handleSuggestionClick("اضافه نقاط")}
          >
            <AddIcon src="/add.svg" /> اضافه نقاط
          </Suggestion>
          <Suggestion
            isActive={activeButton === "خصم نقاط"}
            onClick={() => handleSuggestionClick("خصم نقاط")}
          >
            <MinusIcon src="/deduction.svg" /> خصم نقاط
          </Suggestion>
          <Suggestion
            isActive={activeButton === "السجل"}
            onClick={() => handleSuggestionClick("السجل")}
          >
            <RecordIcon src="/record.svg" /> السجل
          </Suggestion>
          <Suggestion
            isActive={activeButton === "حظر"}
            onClick={() => handleSuggestionClick("حظر")}
          >
            <BanIcon src="/ban.svg" />{" "}
            {userInfo?.is_active === true ? "حظر" : "فك الحظر"}
          </Suggestion>
          <Suggestion
            isActive={activeButton === "حذف"}
            onClick={() => handleSuggestionClick("حذف")}
          >
            <DeleteIcon src="/delete.svg" /> حذف
          </Suggestion>
        </HeaderSuggesions>
        <DetailsUser>
          <AboutUser>
            <ImageName
              is_active={userInfo.is_active}
              is_online={userInfo.is_online}
            />
            <Details>
              {isEditing ? (
                <>
                  <StyleUserName>
                    <InputEdit
                      style={{ margin: "5px " }}
                      type="text"
                      name="username"
                      value={userInfo.username}
                      onChange={handleChange}
                    />
                    <UserPoint style={{ marginBottom: "-16px" }}>
                      النقاط: {userInfo.points} <StyledCoins />
                    </UserPoint>
                  </StyleUserName>
                </>
              ) : (
                <>
                  <UserName>{userInfo.username}</UserName>
                  <UserPoint>
                    النقاط: {userInfo.points} <StyledCoins />
                  </UserPoint>
                </>
              )}
            </Details>
          </AboutUser>
          {!isEditing && (
            <>
              <TotalAboutUser>
                <p>{userInfo?.num_rounds}</p>{" "}
                <TotalDes>الجولات الاجماليه</TotalDes>
              </TotalAboutUser>
              <TotalAboutUser>
                <p>{userInfo?.time_rounds}</p>{" "}
                <TotalDes>الوقت الكلي للجولات</TotalDes>
              </TotalAboutUser>
              <EditData onClick={handleEditClick}>
                <EditName>تعديل البيانات</EditName>
                <EditIcon src="/Edit.svg" />
              </EditData>
            </>
          )}
        </DetailsUser>
        <ContactMe>
          <Phone>
            <IconPhone src="/phone.svg" />
            {isEditing ? (
              <InputEdit type="text" name="phone" value={userInfo.phone} />
            ) : (
              <h4>{userInfo.phone}</h4>
            )}
          </Phone>
          <Location>
            <IconLocation src="/location.svg" />
            {isEditing ? (
              <InputEdit
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
              />
            ) : (
              <h4>{userInfo.address}</h4>
            )}
          </Location>
          <Email>
            <IconEmail src="/email.svg" />
            {isEditing ? (
              <div>
                <InputEdit
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  style={{ fontSize: "16px" }}
                />
                <div>
                  {" "}
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <h4>{userInfo.email}</h4>
            )}
          </Email>
          <Date>
            <IconDate src="/date.svg" />
            {isEditing ? (
              <InputEdit
                type="date"
                name="date_of_birth"
                value={userInfo.date_of_birth}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
              />
            ) : (
              <h4>{userInfo.date_of_birth}</h4>
            )}
          </Date>
        </ContactMe>
        {isEditing && (
          <ButtonsCategory>
            <ButtonEnter onClick={handleSaveClick}>تعديل</ButtonEnter>
            <ButtonCancel onClick={handleCancelClick}>إلغاء</ButtonCancel>
          </ButtonsCategory>
        )}
        {isRecordVisible && <Record data={subscriptionHistory} />}
        {activeModal && (
          <Modal onClose={handleCloseModal}>{renderModalContent()}</Modal>
        )}
      </ProfileContainer>
    </>
  );
};

export default ProfileUser;
