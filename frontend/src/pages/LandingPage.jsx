import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import { Button } from "@heroui/react";

export default function LandingPage() {
  return (
    <div className="border border-black flex flex-col items-center justify-center">
      <h1>LandingPage</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Button color="primary" className="w-2">
        Button
      </Button>
    </div>
  );
}
