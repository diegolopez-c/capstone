import React from "react";
import { Avatar, Button } from "@heroui/react";
import placeholder from "../assets/images/download.png";

export default function ProfileCard() {
  return (
    <div className="w-full border border-blue-100 h-1/2 flex flex-col items-center justify-center text-center">
      <div className="w-1/2 min-w-48 border border-white-100 rounded-2xl flex flex-col items-center justify-center text-center gap-3 py-7 bg-ca-white text-ca-black shadow-[0px_4px_6px_0px_rgba(255,_255,_255,_0.05)]">
        <Avatar
          className="w-24 h-auto text-ca-mint"
          isBordered
          src={placeholder}
        />
        <h3>Name</h3>
        <h3>Speciality</h3>
        <h3>Id</h3>
        <Button className="w-min bg-ca-mint border border-ca-dark-blue">
          View Profile
        </Button>
      </div>
    </div>
  );
}
