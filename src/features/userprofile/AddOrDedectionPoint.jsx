import React, { useState } from "react";
import styled from "styled-components";
import { GiTwoCoins } from "react-icons/gi";

const Content = styled.div`
  width: 350px !important;
`;

const TitleModal = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
const NumPoints = styled.div`
  background-color: #fdf7ff;
  width: 140px;
  border-radius: var(--border-radius-md);
  padding: 7px 5px;
  font-size: 16px;
  margin: 7px auto;
  font-weight: 500;
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
const StyledCoins = styled(GiTwoCoins)`
  color: gold;
  font-size: 20px;
`;
const Points = styled.span`
  font-size: 17px;
  font-weight: 500;
  margin-top: 3px;
`;
const Divincrease = styled.div`
  margin: 24px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
const IncreaseIcon = styled.span`
  font-size: 22px;
  color: gray;
  cursor: pointer;
`;
const DecreaseIcon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;
const StyledInput = styled.input`
  width: 120px;
  padding: 6px 0px;
  padding-left: 10px;
  border: none;
  text-align: center;
  outline: none;
  background-color: #e9e7ec;
  border-radius: 6px;
  &:focus {
    outline: none;
  }
`;
const ButtonEnter = styled.button`
  width: 45%;
  border: none;
  outline: none;
  background-color: #5c2d91;
  border-radius: 4px;
  color: #fff;
  padding: 4px 0px;
`;
const ButtonCancel = styled.button`
  width: 45%;
  background-color: #fdf7ff;
  border: 1px solid #e1e3e6;
  padding: 4px 0px;
  border-radius: 4px;
`;
const ButtonsCategory = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
  gap: 20px;
`;
const NunPoints = styled.span`
  text-align: center;
`;

function AddOrDedectionPoint({
  title,
  onClose,
  initialPoints,
  isAdding,
  onSave,
}) {
  const [points, setPoints] = useState(initialPoints);
  const [inputValue, setInputValue] = useState(initialPoints);

  const handleIncrease = () => {
    if (isAdding || (!isAdding && points < initialPoints)) {
      setPoints(points + 1);
      setInputValue(points + 1);
    }
  };

  const handleDecrease = () => {
    if ((!isAdding && points > 0) || (isAdding && points > initialPoints)) {
      setPoints(points - 1);
      setInputValue(points - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setInputValue(value);
      setPoints(value);
    }
  };

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <Content>
      <TitleModal>{title}</TitleModal>
      <NumPoints>
        <Description>
          <StyledCoins /> <NunPoints>{points}</NunPoints> :<Points>نقاط</Points>
        </Description>
      </NumPoints>
      <Divincrease>
        <DecreaseIcon src="/nagative.svg" onClick={handleDecrease} />
        <StyledInput
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
        <IncreaseIcon onClick={handleIncrease}>+</IncreaseIcon>
      </Divincrease>
      <ButtonsCategory>
        <ButtonCancel size="large" variation="cancelCalender" onClick={onClose}>
          الغاء
        </ButtonCancel>
        <ButtonEnter size="large" variation="puple" onClick={handleSave}>
          ادخال
        </ButtonEnter>
      </ButtonsCategory>
    </Content>
  );
}

export default AddOrDedectionPoint;
