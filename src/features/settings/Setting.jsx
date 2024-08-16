import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../../ui/Modal";
import { api } from "../../services/apiAuth";

const Container = styled.div`
  width: 100%;
  margin: 30px auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ContentQuill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const QuillContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 30vh;

  .ql-editor {
    height: 64%;
  }

  .ql-toolbar.ql-snow {
    width: 50vw;
  }

  .ql-container.ql-snow {
    border: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .ql-toolbar.ql-snow {
      width: 100%;
    }
  }
`;

const QuillEditor = styled(ReactQuill)`
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledRowSetting = `
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 10px;
`;

const ContactSetting = styled.div`
  ${StyledRowSetting}
`;

const StyledTitle = `
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 18px 0px;
`;

const TitleGame = styled.div`
  ${StyledTitle}
`;

const PrizeValue = styled.div`
  ${StyledTitle}
`;

const Chargingpoints = styled.div`
  ${StyledTitle}
`;

const GiftPoints = styled.div`
  ${StyledTitle}
`;

const Description = styled.div`
  ${StyledTitle}
`;

const ImageContainer = styled.div`
  width: 297px;
  height: 213px;
  border-radius: 23px;
  margin-top: -30px;
  position: relative;
  cursor: ${({ isEditing }) => (isEditing ? "pointer" : "default")};

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const EditImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const EditData = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const EditName = styled.p`
  color: #7959a1;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const EditIcon = styled.img``;

const ButtonEnter = styled.button`
  width: 18%;
  border: none;
  outline: none;
  background-color: #5c2d91;
  border-radius: 4px;
  color: #fff;
  padding: 5px 0px;
  z-index: 100;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 40%;
  }
`;

const ButtonCancel = styled.button`
  width: 18%;
  background-color: #fdf7ff;
  border: 1px solid #e1e3e6;
  padding: 5px 0px;
  border-radius: 4px;
  z-index: 100;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 40%;
  }
`;

const ButtonsCategory = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const InputEdit = styled.input`
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 0px 13px;
  border-radius: 4px;
  background-color: #fff;
  white-space: normal;
  word-wrap: break-word;
  width: 440px;
  height: 30px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledTextarea = styled.textarea`
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 0px 13px;
  border-radius: 4px;
  background-color: #fff;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 300px;
  border: none;
  text: 2px;
  outline: none;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #5b2c90;
  margin-left: 30px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const StyleResult = styled.h4`
  text-align: center;
  font-weight: 600;
  font-size: 17px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const EditTitle = styled.h3`
  text-align: center;
  font-size: 24px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TermsButton = styled.button`
  background-color: #5c2d91;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  width: 200px;
  margin-top: 20px;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 70%;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  gap: 9px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    [{ color: [] }, { background: [] }],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
];

function Setting() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    game_name_ar: "",
    game_name_en: "",
    prize: 0,
    point_charge: 0,
    gift_charge: 0,
    term_condition: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/setting/show");
        const data = response?.data?.data;
        setUserInfo({
          game_name_ar: data.game_name_ar || "",
          game_name_en: data.game_name_en || "",
          prize: data.prize || 0,
          point_charge: data.point_charge || 0,
          gift_charge: data.gift_charge || 0,
          term_condition: data.term_condition || "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await api.put("/setting/update", userInfo);

      if (response.status === 200) {
        setIsEditing(false);
      } else {
        console.error("Failed to update user info");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleImageClick = () => {
    if (isEditing) {
      document.getElementById("file-input").click();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTermsAndConditions("");
  };

  const handleModalSave = () => {
    console.log("Terms and conditions saved:", termsAndConditions);
    closeModal();
  };

  return (
    <Container>
      {isEditing && <EditTitle>تعديل البيانات</EditTitle>}
      {!isEditing && (
        <EditData onClick={handleEditClick}>
          <EditName>تعديل البيانات</EditName>
          <EditIcon src="/Edit.svg" />
        </EditData>
      )}
      <StyledContent>
        <ImageContainer onClick={handleImageClick} isEditing={isEditing}>
          <Image src={image ? image : "/Gamzie.svg"} />
          {isEditing && <EditImage src={image || "/editGamzies.svg"} />}
          <HiddenFileInput
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ImageContainer>
        <ContactSetting>
          <TitleGame>
            <Title>اسم اللعبه بالعربي</Title>
            {isEditing ? (
              <InputEdit
                type="text"
                name="game_name_ar"
                value={userInfo.game_name_ar}
                onChange={handleChange}
              />
            ) : (
              <StyleResult>{userInfo.game_name_ar}</StyleResult>
            )}
          </TitleGame>
          <TitleGame>
            <Title>اسم اللعبه بالإنجليزي</Title>
            {isEditing ? (
              <InputEdit
                type="text"
                name="game_name_en"
                value={userInfo.game_name_en}
                onChange={handleChange}
              />
            ) : (
              <StyleResult>{userInfo.game_name_en}</StyleResult>
            )}
          </TitleGame>
          <PrizeValue>
            <Title>قيمه الجايزه</Title>
            {isEditing ? (
              <InputEdit
                type="number"
                name="prize"
                value={userInfo.prize}
                onChange={handleChange}
                style={{ fontSize: "16px", marginRight: "-10px" }}
              />
            ) : (
              <StyleResult style={{ marginRight: "-10px" }}>
                {userInfo.prize}
              </StyleResult>
            )}
          </PrizeValue>
          <Chargingpoints>
            <Title>نقاط الشحن</Title>
            {isEditing ? (
              <InputEdit
                type="number"
                name="point_charge"
                value={userInfo.point_charge}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
              />
            ) : (
              <StyleResult>{userInfo.point_charge}</StyleResult>
            )}
          </Chargingpoints>
          <GiftPoints>
            <Title>نقاط الهدايا</Title>
            {isEditing ? (
              <InputEdit
                type="number"
                name="gift_charge"
                value={userInfo.gift_charge}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
              />
            ) : (
              <StyleResult>{userInfo.gift_charge}</StyleResult>
            )}
          </GiftPoints>
          <Description>
            <Title>وصف اللعبه</Title>
            {isEditing ? (
              <StyledTextarea
                name="description_play"
                value={userInfo.description_play}
                onChange={handleChange}
                onInput={handleTextareaInput}
              />
            ) : (
              <StyleResult>{userInfo.description_play}</StyleResult>
            )}
          </Description>
          <Description>
            <Title>الأحكام والشروط </Title>
            {isEditing ? (
              <StyledTextarea
                name="term_condition"
                value={userInfo.term_condition}
                onChange={handleChange}
                onInput={handleTextareaInput}
              />
            ) : (
              <StyleResult>{userInfo.term_condition}</StyleResult>
            )}
          </Description>
        </ContactSetting>
      </StyledContent>
      {isEditing && (
        <ButtonsCategory>
          <ButtonEnter onClick={handleSaveClick}>تعديل</ButtonEnter>
          <ButtonCancel onClick={handleCancelClick}>إلغاء</ButtonCancel>
        </ButtonsCategory>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ContentQuill>
            <QuillContainer>
              <QuillEditor
                value={termsAndConditions}
                onChange={setTermsAndConditions}
                modules={modules}
                formats={formats}
              />
            </QuillContainer>
            <ModalButtons>
              <ButtonCancel onClick={closeModal}>إلغاء</ButtonCancel>
              <ButtonEnter onClick={handleModalSave}>حفظ</ButtonEnter>
            </ModalButtons>
          </ContentQuill>
        </Modal>
      )}
    </Container>
  );
}

export default Setting;
