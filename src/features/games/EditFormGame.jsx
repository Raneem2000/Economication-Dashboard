import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 860px;
  padding: 5px 10px;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #000;
  font-size: 34px;
  font-weight: 500;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  gap: 16px;
`;

const Label = styled.label`
  flex: 1;
  color: #160041;
  font-weight: 400;
  text-align: left;
  font-size: 16px;
`;

const Input = styled.input`
  flex: 2;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 5px 13px;
  border-radius: 4px;
  width: 90%;
  margin-left: 35px;
  background-color: #fff;
  border: none;
  outline: none;
  text-align: right;
  &:focus {
    outline: none;
  }
`;

const FileCameraContainer = styled.div`
  width: 220px;
  height: 220px;
  cursor: pointer;
`;

const ButtonCategory = styled.div`
  width: 64%;
  margin: 30px auto 5px auto;
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  width: 32%;
  padding: 0.75rem 2rem;
  background-color: #5c2d91;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const CancelButton = styled.button`
  width: 32%;
  padding: 0.75rem 2rem;
  background-color: #fdf7ff;
  color: #757d8a;
  border: 1px solid #e1e3e6;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  margin-right: 1rem;
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const StyledInput = styled.div`
  width: 65%;
`;

const Styledcontent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageCamera = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

function AddFormGame({ onClose }) {
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    document.getElementById("file-input").click();
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

  return (
    <FormContainer>
      <FormTitle>تعديل اللعبه</FormTitle>
      <Form>
        <Styledcontent>
          <StyledInput>
            <FormField>
              <Input type="text" id="name" name="name" />
              <Label htmlFor="name">الاسم</Label>
            </FormField>
            <FormField>
              <Input type="text" id="url" name="url" />
              <Label htmlFor="url">Url</Label>
            </FormField>
            <FormField>
              <Input type="number" id="daily-rounds" name="daily-rounds" />
              <Label htmlFor="daily-rounds">عدد الجولات في اليوم الواحد</Label>
            </FormField>
            <FormField>
              <Input type="number" id="win-points" name="win-points" />
              <Label htmlFor="win-points">نقاط الفوز</Label>
            </FormField>
            <FormField>
              <Input type="number" id="loss-points" name="loss-points" />
              <Label htmlFor="loss-points">نقاط الخسارة</Label>
            </FormField>
          </StyledInput>
          <FileCameraContainer onClick={handleImageClick}>
            <ImageCamera src={image || "/Camera.svg"} />
            <HiddenFileInput id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
          </FileCameraContainer>
        </Styledcontent>

        <ButtonCategory>
          <CancelButton onClick={onClose}>إلغاء</CancelButton>
          <SubmitButton>حفظ</SubmitButton>
        </ButtonCategory>
      </Form>
    </FormContainer>
  );
}

export default AddFormGame;
