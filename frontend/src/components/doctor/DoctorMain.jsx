import React from "react";
import ActionPanel from "../ActionPanel";

import DoctorActiveAppointments from "./DoctorActiveAppointments";
import { useAuth0 } from "@auth0/auth0-react";

export default function DoctorMain() {
  const { user, isLoading } = useAuth0();

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <div className="w-full h-1/4 flex flex-col items-center gap-4 justify-around">
        <h1 className="text-ca-white text-3xl font-bold">
          Welcome,{" "}
          {isLoading ? "User Name" : `${user.given_name} ${user.family_name}`}
        </h1>
        <div className="w-4/5 flex gap-4 justify-between h-20">
          <ActionPanel
            message={"Create New Medical Record"}
            icon={"fa-solid fa-clipboard-user "}
            color={"green-600"}
            path={"/new-medical-report"}
          />
          <ActionPanel
            message={"Create New Prescription"}
            icon={"fa-solid fa-tablets "}
            color={"blue-600"}
            path={"/new-prescription"}
          />
          <ActionPanel
            message={"Create New Symptom"}
            icon={"fa-solid fa-viruses "}
            color={"yellow-600"}
            path={"/new-symptom"}
          />
          <ActionPanel
            message={"Create New Symptom Interaction"}
            icon={"fa-solid fa-virus-slash "}
            color={"red-600"}
            path={"/new-interaction"}
          />
        </div>
      </div>
      <div className="w-full h-3/4 flex flex-col items-center gap-4">
        <DoctorActiveAppointments />
      </div>
    </div>
  );
}
