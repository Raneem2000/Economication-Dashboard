import styled from "styled-components";

const Content = styled.div`
  margin: 40px 0px;
  width: 350px !important;
`;
const Title = styled.h2`
  margin-bottom: 25px;
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
function BinOrDeleteUser({ title, name, onClose, onSave }) {
  return (
    <Content>
      <Title>
        هل ترغب في {title} {name} ؟
      </Title>
      <ButtonsCategory>
        <ButtonCancel onClick={onSave}> نعم ارغب </ButtonCancel>
        <ButtonEnter onClick={onClose}>لا ارغب</ButtonEnter>
      </ButtonsCategory>
    </Content>
  );
}

export default BinOrDeleteUser;
