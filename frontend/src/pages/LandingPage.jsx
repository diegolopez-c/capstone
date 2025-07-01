import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import LandingNav from "../components/landing/LandingNav";
import { Button } from "@heroui/react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ca-black">
      <LandingNav />
    </div>
  );
}
