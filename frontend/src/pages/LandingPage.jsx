import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import LandingNav from "../components/landing/LandingNav";
import { Button } from "@heroui/react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ca-black">
      <LandingNav />
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
