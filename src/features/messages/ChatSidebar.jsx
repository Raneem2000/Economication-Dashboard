import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../ui/Header";

const StyleContainer = styled.div`
  background-color: #68289214;
  flex: 1;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: calc(100vh - 210px);
`;
const StyledHeader = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 6px 15px;
  position: relative;
  background-color: #ebebeb;
  border-radius: 7px;
`;
const StyleInput = styled.input`
  width: 100%;
  border: none;
  padding-right: 35px;
  background: transparent;
  &::placeholder {
    padding-right: 0px;
    color: #a6a6a6;
  }
  &:focus {
    outline: none;
  }
`;
const StyledIconSearch = styled.img`
  position: absolute;
  right: 24px;
  bottom: 10px;
`;
const StyledAllUser = styled.div`
  max-height: 84%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const StyleuserMessage = `
 padding: 7px;
  position: relative;
  cursor: pointer;
   margin: 7px auto;
  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 14px;
    width: 90%;
    height: 2px;
    border-bottom: 1px solid #7365b2;
  }
`;

const StyledUser = styled.div`
  ${StyleuserMessage}
  &:hover {
    background-color: #7365b240;
  }
  ${(props) =>
    props.active &&
    `
    background-color: #7365b280;
  `}
`;

const AboutUser = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 4px;
  gap: 7px;
`;

const StyleInfo = styled.div``;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const UserDesc = styled.p`
  font-size: 14px;
  font-weight: 400;
`;
const ImageName = styled.div`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url(${(props) => props.src});
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    right: -5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.status === "active"
        ? "#02c60a"
        : props.status === "offline"
        ? "#cecece"
        : "transparent"};
  }
`;

function ChatSidebar({ users, onSelectUser, activeUserId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyleContainer>
      <StyledHeader>
        <StyleInput
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledIconSearch src="/search-normal.svg" />
      </StyledHeader>
      <StyledAllUser>
        {filteredUsers.map((user) => (
          <StyledUser
            key={user.id}
            onClick={() => onSelectUser(user)}
            active={user.id === activeUserId}
          >
            <AboutUser>
              <ImageName src={user.img} status={user.status} />
              <StyleInfo>
                <UserName>{user.name}</UserName>
                <UserDesc>{user.desc}</UserDesc>
              </StyleInfo>
            </AboutUser>
          </StyledUser>
        ))}
      </StyledAllUser>
    </StyleContainer>
  );
}

export default ChatSidebar;
