import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../services/apiAuth";
import { useEffect } from "react";
import { useRef } from "react";

const StyleContainer = styled.div`
  background-color: #c6badb;
  height: 100%;
  flex: 2;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  margin-left: 30px;
  padding: 10px 30px;
  position: relative;
`;

const StyledHeader = styled.div``;
const StyleUserName = styled.h5`
  font-size: 20px;
`;
const StyleUserEmail = styled.p`
  text-align: right;
  font-size: 15px;
  font-weight: 400;
`;

const StyleChatContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 65%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const StyleChatUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ImageUser = styled.img`
  width: 34px;
  height: 34px;
  object-fit: cover;
`;
const StyleTalkContent = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 20px 40px;
  text-align: right;
  min-height: auto;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const StyleText = styled.h6`
  font-size: 16px;
  font-weight: 500;
`;
const StyleChatAdmin = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: end;
`;
const ImageAdmin = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;
`;
const StyleTalkContentAdmin = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 20px 40px;
  text-align: right;
  min-height: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
`;
const StyledSendMessage = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 12px;
  height: 67px;
  min-height: auto;
  gap: 13px;
`;
const StyleTextArea = styled.textarea`
  width: 80%;
  margin-right: 30px;
  background-color: #fff;
  border-radius: 20px;
  height: 100%;
  padding: 20px 25px;
  border: none;
  outline: none;
  &::-webkit-scrollbar {
    width: 0px;
  }
  resize: none;
  &:focus {
    outline: none;
  }
`;
const SendIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function ChatContent({ activeUser, messages, onSendMessage }) {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (messageText.trim()) {
      try {
        // Make a POST request to send the message
        const response = await api.post("/support-messages/send", {
          user_id: activeUser.id,
          message: messageText,
        });

        if (response.status === 200) {
          // On successful API response, update the local messages
          onSendMessage(activeUser.id, messageText);
          setMessageText("");
        } else {
          console.error("Failed to send message", response.data);
        }
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <StyleContainer>
      <StyledHeader>
        <StyleUserName>{activeUser.name}</StyleUserName>
        <StyleUserEmail>{activeUser.email}</StyleUserEmail>
      </StyledHeader>

      <StyleChatContent>
        {messages.slice().reverse().map((message, index) =>
          message.sender === "admin" ? (
            <StyleChatAdmin key={index}>
              <StyleTalkContentAdmin>
                <StyleText>{message.text}</StyleText>
              </StyleTalkContentAdmin>
              <ImageAdmin src="/Gamzie.svg" />
            </StyleChatAdmin>
          ) : (
            <StyleChatUser key={index}>
              <ImageUser src={activeUser.img} />
              <StyleTalkContent>
                <StyleText>{message.text}</StyleText>
              </StyleTalkContent>
            </StyleChatUser>
          )
        )}
        <div ref={messagesEndRef} />
      </StyleChatContent>
      <StyledSendMessage>
        <StyleTextArea
          placeholder="ارسال رساله..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SendIcon src="/send.svg" onClick={handleSend} />
      </StyledSendMessage>
    </StyleContainer>
  );
}

export default ChatContent;
