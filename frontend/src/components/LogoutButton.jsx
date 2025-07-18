import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@heroui/react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="bg-red-400"
      onPress={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
