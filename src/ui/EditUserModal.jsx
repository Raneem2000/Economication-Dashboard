import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa"; // User edit icon
import { MdInput } from "react-icons/md"; // Example input icon
import { api } from "../services/apiAuth";
import { useEffect } from "react";
import { useState } from "react";

// Styled components for the modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px; // Adjusted width for better layout
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 7rem 50px;
  position: relative;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: row-reverse; // Display items in a row from right to left
  align-items: center; // Center align vertically
  flex-grow: 1; // Allow content to grow
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px; // Adjusted for RTL layout
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const UserImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px; // Margin between image and input fields
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px; // Adjusted for spacing in RTL
`;

const EditIcon = styled(FaUserEdit)`
  position: absolute;
  bottom: 0;
  left: 0; // Adjusted for RTL layout
  background: #fff;
  font-size: 24px;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
`;

const StyledImageIcon = styled.img`
  margin-left: 10px; // Adjusted for spacing in RTL
  width: 24px; // Consistent size for icons
  height: 24px; // Consistent size for icons
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  flex-grow: 1; // Allow inputs to take remaining space
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: row-reverse; // Arrange items from right to left
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 6px;
  border-radius: 4px;
  color: #000000;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: right; // Align text to the right
  box-shadow: 0 1px 4.8px 0 rgba(0, 0, 0, 0.25); // Apply the shadow with specified values
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center; // Align buttons to the end
  gap: 20px; // Gap between buttons
  margin-top: 25px; // Margin above buttons
`;

const Button = styled.button`
  padding: 8px 60px;
  border-radius: 8px;
  border: 1px solid #e1e3e6;
  cursor: pointer;
  font-size: 16px;
  color: ${({ variant }) => (variant === "cancel" ? "757d8a" : "#fff")};
  background: ${({ variant }) =>
    variant === "cancel"
      ? "FDF7FF"
      : "#5C2D91"}; // Green for save, red for cancel
`;

function CustomModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // دالة لجلب بيانات الملف الشخصي
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/auth/Show-Profile");
        const { name, email } = response.data.data; // استخراج البيانات من الاستجابة
        setName(name); // تعيين الاسم
        setEmail(email); // تعيين البريد الإلكتروني
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData(); // استدعاء الدالة عند تحميل المكون
  }, []);

  const handleSave = async () => {
    try {
      const response = await api.post("/auth/UpdateProfile", {
        name,
        email,
      });
      onClose(); // إغلاق النافذة عند الحفظ بنجاح
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <UserImageContainer>
            <UserImage src="/editcamera.svg" alt="User" />
          </UserImageContainer>

          <InputWrapper>
            <InputContainer>
              <StyledImageIcon src="./userEdit.svg" alt="User Edit Icon" />
              <StyledInput
                placeholder="أدخل الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <StyledImageIcon src="./emailEdit.svg" alt="Email Edit Icon" />
              <StyledInput
                placeholder="أدخل الايميل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
          </InputWrapper>
        </StyledModal>

        <ButtonsWrapper>
          <Button variant="cancel" onClick={handleCancel}>
            إلغاء
          </Button>
          <Button variant="save" onClick={handleSave}>
            حفظ
          </Button>
        </ButtonsWrapper>
      </ModalContainer>
    </Overlay>,
    document.body
  );
}

export default CustomModal;
