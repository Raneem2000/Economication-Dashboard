import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatSidebar from "../features/messages/ChatSidebar";
import ChatContent from "../features/messages/ChatContent";
import { api } from "../services/apiAuth";
import Header from "../ui/Header";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  height: 100%;
`;

const initialMessages = {}; // Start with an empty initial messages object

function Chat() {
  const [users, setUsers] = useState([]); // Initialize the users state
  const [activeUser, setActiveUser] = useState(null); // Initialize activeUser as null
  const [messages, setMessages] = useState(initialMessages); // Initialize messages as an empty object

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/support-messages?page=1&status=all"); // API call
        const fetchedUsers = response.data.data.data.map((msg) => ({
          id: msg.user.id,
          name: msg.user.username,
          desc: msg.message,
          img: msg.user.image_path || "/1.svg", // Default image if path is empty
          status: msg.user.is_online ? "active" : "offline",
        }));
        setUsers(fetchedUsers); // Set the mapped users to state
        if (fetchedUsers.length > 0) {
          setActiveUser(fetchedUsers[0]); // Set the first user as the active user
          fetchUserMessages(fetchedUsers[0].id); // Fetch messages for the first user
        }
        console.log(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const fetchUserMessages = async (userId) => {
    try {
      const response = await api.get(
        `/support-messages/show?user_id=${userId}`
      );
      const userMessages = response.data.data.data.map((msg) => ({
        sender: msg.is_admin ? "admin" : "user",
        text: msg.message,
      }));

      setMessages((prevMessages) => ({
        ...prevMessages,
        [userId]: userMessages,
      }));
    } catch (error) {
      console.error(`Error fetching messages for user ${userId}`, error);
    }
  };

  const handleSelectUser = (user) => {
    setActiveUser(user);
    fetchUserMessages(user.id); // Fetch messages for the selected user
  };

  const handleSendMessage = (userId, text) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [userId]: [...(prevMessages[userId] || []), { sender: "admin", text }],
    }));
  };

  return (
    <>
      <Header />
      <Container>
        {activeUser && (
          <>
            <ChatSidebar
              users={users}
              onSelectUser={handleSelectUser}
              activeUserId={activeUser.id}
            />
            <ChatContent
              activeUser={activeUser}
              messages={messages[activeUser.id] || []}
              onSendMessage={handleSendMessage}
            />
          </>
        )}
      </Container>
    </>
  );
}
export default Chat;
