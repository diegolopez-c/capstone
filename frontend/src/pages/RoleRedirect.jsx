import React from "react";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

//Role redirect Page to redirect user in function of their asigned roles in their token
export default function RoleRedirect() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner color="primary" label="Redirecting..." className="text-white" />
    </div>
  );
}
