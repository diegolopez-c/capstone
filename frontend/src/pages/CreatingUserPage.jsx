import React, { useEffect } from "react";
import { Spinner } from "@heroui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function CreatingUserPage() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  async function createUser() {
    let userInfo = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      birthDate: new Date(),
    };

    await fetch(import.meta.env.VITE_BASE_URL + "/user/create-new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then(navigate("/redirect"));
  }

  useEffect(() => {
    createUser();
  }, []);

  // TODO check if its first time register

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner
        color="primary"
        label="Creating User..."
        className="text-white"
      />
    </div>
  );
}
