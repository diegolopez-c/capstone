import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

//Role redirect Page to redirect user in function of their asigned roles in their token
export default function RoleRedirect() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    async function createUser(params) {
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
      });
    }

    createUser();

    if (isAuthenticated) {
      const roleArr = user["https://hospitall.com/roles"];

      if (roleArr.includes("doctor")) {
        navigate("/doctor-dashboard");
      } else if (roleArr.includes("pharmacist")) {
        navigate("/pharmacist-dashboard");
      } else if (roleArr.includes("patient")) {
        navigate("/patient-dashboard");
      }
    }
  }, []);

  return <div>RoleRedirect</div>;
}
