import React from "react";
import logo from "../../assets/images/logo_no_letters.png";
import { Button, ButtonGroup } from "@heroui/button";

export default function LandingNav() {
  return (
    <div className="w-full h-1/5 flex items-center justify-center">
      <nav className="w-4/5 h-4/5 min-h-5 flex items-center justify-between">
        <img className="h-5/6" src={logo} alt="Clinic All Logo" />
        <ButtonGroup>
          <Button className="bg-ca-mint">LogIn</Button>
          <Button className="bg-ca-yellow">SignUp</Button>
        </ButtonGroup>
      </nav>
    </div>
  );
}
