import React from "react";
import { useEffect } from "react";
import { Avatar, Button, Spinner } from "@heroui/react";
import placeholder from "../assets/images/download.png";
import { useAuth0 } from "@auth0/auth0-react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080", {
  withCredentials: true,
});

export default function ProfileCard() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-1/2 flex flex-col items-center justify-center text-center">
      <div className="w-1/2 min-w-48 border-2 border-black bg-ca-black rounded-2xl flex flex-col items-center justify-center text-center gap-3 py-7 text-ca-white shadow-[0px_4px_6px_0px_rgba(255,_255,_255,_0.05)]">
        <Avatar
          className="w-24 h-auto text-ca-mint"
          src={isAuthenticated ? user.picture : "Patient PFP"}
        />
        <h3>{isAuthenticated ? user.given_name : "Patient Name"}</h3>
        <h3>{isAuthenticated ? user.family_name : "Patient Lastname"}</h3>
        <h3>Id</h3>
        <Button className="w-min bg-ca-mint border border-ca-dark-blue">
          View Profile
        </Button>
        <Button
          onPress={() => {
            sendMessage();
          }}
        >
          Send Message Socket IO
        </Button>
      </div>
    </div>
  );
}
