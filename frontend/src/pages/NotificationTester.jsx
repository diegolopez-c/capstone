import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchUserId } from "../functions/userFunctions";
import { useAuth0 } from "@auth0/auth0-react";

const socket = io("http://localhost:8080", { withCredentials: true });

export default function NotificationTester() {
  const { user, isLoading } = useAuth0();
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      const getUserId = async () => {
        const id = await fetchUserId(user.email);
        setUserId(id);
      };
      getUserId();
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);

      socket.on("notification", (data) => {
        console.log("New Notification:", data);
        setNotifications((prev) => [...prev, data]);
      });

      return () => {
        socket.off("notification");
        socket.disconnect();
      };
    }
  }, [userId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}
