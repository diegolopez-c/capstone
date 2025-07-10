import React from "react";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

//Role redirect Page to redirect user in function of their asigned roles in their token
export default function RoleRedirect() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  async function updateUser(role) {
    let userInfo = {
      email: user.email,
      role,
    };

    let response = await fetch(
      import.meta.env.VITE_BASE_URL + "/user/update-user-info",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
  }

  //WHEN A USER LOGS AFTER BEING GIVEN A ROLE IT UPDATES
  useEffect(() => {
    if (isAuthenticated) {
      const roleArr = user["https://hospitall.com/roles"];

      if (roleArr.includes("doctor")) {
        updateUser("DOCTOR");
        navigate("/doctor-dashboard");
      } else if (roleArr.includes("pharmacist")) {
        updateUser("PHARMACIST");
        navigate("/pharmacist-dashboard");
      } else if (roleArr.includes("patient")) {
        updateUser("PATIENT");
        navigate("/patient-dashboard");
      }
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner color="primary" label="Redirecting..." className="text-white" />
    </div>
  );
}
