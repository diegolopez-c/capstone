import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, ButtonGroup } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";

export default function LandingNav() {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-1/6 flex items-center justify-center">
      <nav className="w-4/5 h-4/5 min-h-5 flex items-center justify-between px-6 rounded-full">
        <img className="h-2/3" src={logo} alt="Clinic All Logo" />

        {!isAuthenticated ? (
          <ButtonGroup>
            <Button onPress={() => loginWithRedirect()} className="bg-ca-mint">
              LogIn
            </Button>
            <Button
              onPress={() => {
                loginWithRedirect({
                  screen_hint: "signup",
                });
              }}
              className="bg-ca-yellow"
            >
              SignUp
            </Button>
          </ButtonGroup>
        ) : (
          <div className="flex gap-2">
            <Avatar size="md" src={user.picture} />
            <LogoutButton />
          </div>
        )}
      </nav>
    </div>
  );
}
