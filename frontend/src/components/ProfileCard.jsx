import { Avatar, Button, Spinner } from "@heroui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId } from "../api/userFunctions";
import { useEffect } from "react";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function ProfileCard() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const getUserId = async () => {
      const id = await fetchUserId(user.email);
      setUserId(id);
    };

    if (!isLoading && user) getUserId();
  }, [user, isLoading]);

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
        <h3>ID: {userId}</h3>
        <Button className="w-min bg-ca-mint border border-ca-dark-blue">
          View Profile
        </Button>
        <LogoutButton />
      </div>
    </div>
  );
}
