import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  margin-right: 130px;

  max-width: 90%;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
