// src/hooks/usePusher.js

import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusher = (userId, onMessage) => {
  useEffect(() => {
    if (!userId) return;

    // Enable logging for Pusher (can be disabled in production)
    Pusher.logToConsole = true;

    // Initialize Pusher
    const pusher = new Pusher("61e1d01bce9dd7dce6da", {
      cluster: "eu",
    });

    // Subscribe to the channel
    const channel = pusher.subscribe("my-channel");

    // Event names based on user ID
    const eventName = `notify-user-${userId}`;
    const supportEventName = `support-message-${userId}`;

    // Handle incoming messages
    const handleMessage = (data) => {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;
      onMessage(parsedData);
    };

    // Bind events
    channel.bind(eventName, handleMessage);
    channel.bind(supportEventName, handleMessage);

    // Clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [userId, onMessage]);
};

export default usePusher;
