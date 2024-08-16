import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/apiAuth";

const MessageContainer = styled.div`
  width: 340px;
  height: 450px;
  background-color: #fff;
  box-shadow: 0px -1px 5.2px 5px #00000040;
  border-radius: 0px 0px 32px 32px;
  position: absolute;
  top: -19px;
  left: -35px;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 0px; /* Hide scrollbar */
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  75% { opacity: 0.5; }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  margin-top: 20px;
`;

const Name = styled.h5`
  font-size: 20px;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const IconSMs = styled.img`
  cursor: pointer;
`;

// Badge for notifications
const NotificationBadge = styled.div`
  position: absolute;
  top: -10px; // Adjust as needed
  right: -8px; // Adjust as needed
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  animation: ${blink} 1s infinite;
`;

const FilterMessage = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 25px 0px 10px 0px;
`;

const StyledFilter = `
 display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledRead = styled.div`
  ${StyledFilter}
`;

const StyledUnRead = styled.div`
  ${StyledFilter}
`;

const CheckIcon = styled(BsCheck2Circle)`
  color: #5c2d91;
  width: 18px;
  height: 18px;
`;

const CheckUnRead = styled.img`
  width: 18px;
  height: 18px;
`;

const TitleRead = styled.p`
  color: ${(props) => (props.active ? "#5c2d91" : "#949599")};
  font-size: 12px;
  font-weight: ${(props) => (props.active ? "600" : "normal")};
`;

const TitleUnRead = styled.p`
  color: ${(props) => (props.active ? "#5c2d91" : "#949599")};
  font-size: 12px;
  font-weight: ${(props) => (props.active ? "600" : "normal")};
`;

const StyledAllUser = styled.div`
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
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
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    border-bottom: 2px solid #7365b2;
  }
`;

// Styled component for user message
const StyledUserMs = styled.div`
  ${StyleuserMessage}

  // Apply different styles based on read_at prop
  background-color: ${({ isUnread }) => (isUnread ? "#5101" : "#fff")};
  color: ${({ isUnread }) => (isUnread ? "#aaa" : "#000")};

  &:hover {
    background-color: ${({ isUnread }) =>
      isUnread ? "#5101" : "#7365b240"};
  }
`;

const ImageContainer = styled.div``;

const AboutUser = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 24px;
  gap: 7px;
`;

const StyleInfo = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
`;

const ImgUser = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledUnReadMs = styled.div`
  width: 42px;
  height: 26px;
  border-radius: 50%;
  object-fit: contain;
  background-color: #5b2c90;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 13px;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5px;
`;

const BtnSendMessage = styled.button`
  width: 193px;
  height: 34px;
  border-radius: 8px;
  background-color: #5c2d91;
  color: #fff;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

function Notifications({ onClose }) {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [messages, setMessages] = useState([]); // State for messages
  const [loading, setLoading] = useState(false); // State to handle loading

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notifications"); // Update the API endpoint as needed
        setMessages(response.data.data); // Set messages state
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching messages", error); // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(); // Call function to fetch messages on component mount
  }, []);

  // Function to mark a message as read
  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/mark-as-read/${id}`);
      // Optionally update unread count here if needed
    } catch (error) {
      console.error("Error marking message as read", error);
    }
  };

  // Filter messages based on the filter type
  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((msg) => msg.read_at === null);

  // Handle card click to mark as read and navigate
 // Handle card click to mark as read and navigate
const handleCardClick = (id, userId) => {
  return () => {
    // Get the message that was clicked
    const clickedMessage = messages.find((msg) => msg.id === id);
    
    // Check if the message has already been read
    if (clickedMessage.read_at === null) {
      // Immediately update the state for UI responsiveness
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, read_at: new Date().toISOString() } : msg
        )
      );

      // Proceed with marking the message as read in the backend
      markAsRead(id);
    }
  };
};


  // Navigate to chat with a specific user
  function handleNavigateToChat(navigate, userId) {
    return () => {
      navigate("/notifications", { state: { userId } });
      onClose();
    };
  }

  // Fetch unread notifications count from API
  const fetchUnreadNotificationsCount = async () => {
    try {
      const response = await api.get(
        "/notifications/count-unread-notifications"
      );
      return response.data.data.count_unread_notifications; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching unread notifications count:", error);
      return 0; // Return a default value if there's an error
    }
  };

  // Get notification count on component mount
  useEffect(() => {
    const getNotificationCount = async () => {
      const count = await fetchUnreadNotificationsCount();
      setNotificationCount(count);
    };

    getNotificationCount();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <MessageContainer>
      <MessageHeader>
        <Name>الاشعارات</Name>
        <IconContainer>
          <IconSMs src="/notification.svg" alt="Notifications" />
          {notificationCount > 0 && (
            <NotificationBadge>{notificationCount}</NotificationBadge>
          )}
        </IconContainer>
      </MessageHeader>
      <FilterMessage>
        <StyledRead onClick={() => setFilter("all")}>
          {filter === "all" ? (
            <CheckIcon />
          ) : (
            <CheckUnRead src="/accept 4.svg" />
          )}
          <TitleRead active={filter === "all"}>الكل</TitleRead>
        </StyledRead>
        <StyledUnRead onClick={() => setFilter("unread")}>
          {filter === "unread" ? (
            <CheckIcon />
          ) : (
            <CheckUnRead src="/accept 4.svg" />
          )}
          <TitleUnRead active={filter === "unread"}>الغير مقروء</TitleUnRead>
        </StyledUnRead>
      </FilterMessage>
      <StyledAllUser>
        {filteredMessages.map((msg) => (
          <StyledUserMs
            key={msg.id}
            isUnread={msg.read_at === null} // Pass a prop indicating unread status
            onClick={handleCardClick(msg.id, msg.id)} // Handle card click
          >
            <AboutUser>
              <ImageContainer>
                <ImgUser src={msg.data.image || "/1.svg"} />
              </ImageContainer>
              <StyleInfo>
                <UserName>{msg.data.body}</UserName>
                {msg.unreadCount > 0 && (
                  <StyledUnReadMs>{msg.unreadCount}</StyledUnReadMs>
                )}
              </StyleInfo>
            </AboutUser>
          </StyledUserMs>
        ))}
      </StyledAllUser>
      <StyledButton onClick={handleNavigateToChat(navigate)}>
        <BtnSendMessage>ارسال اشعار</BtnSendMessage>
      </StyledButton>
    </MessageContainer>
  );
}

export default Notifications;
