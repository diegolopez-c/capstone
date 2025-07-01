import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, ButtonGroup } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingNav() {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-1/5 flex items-center justify-center">
      <nav className="w-4/5 h-4/5 min-h-5 flex items-center justify-between bg-ca-light-black px-4 rounded-3xl">
        <img className="h-5/6" src={logo} alt="Clinic All Logo" />

        {!isAuthenticated ? (
          <ButtonGroup>
            <Button onClick={() => loginWithRedirect()} className="bg-ca-mint">
              LogIn
            </Button>
            <Button
              onClick={() => {
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
            <Button
              className="bg-red-400"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
