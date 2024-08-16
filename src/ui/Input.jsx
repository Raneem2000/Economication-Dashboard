import styled from "styled-components";

const Input = styled.input`
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 5px 13px;
  border-radius: 4px;
  width: 90%;
  background-color: #fff;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export default Input;
