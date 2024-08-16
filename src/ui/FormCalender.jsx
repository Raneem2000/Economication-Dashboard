import React from "react";
import styled from "styled-components";

const FormDesc = styled.h6``;

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
const ButtonCategory = styled.div`
  width: 64%;
  margin: 30px auto 5px auto;
  display: flex;
  justify-content: space-between;
`;
function FormCalender({ onClose }) {
  return (
    <div>
      <FormDesc></FormDesc>

      <ButtonCategory>
        <CancelButton onClick={onClose}>إلغاء</CancelButton>
        <SubmitButton>حفظ</SubmitButton>
      </ButtonCategory>
    </div>
  );
}

export default FormCalender;
