import React from "react";
import ActionPanel from "../ActionPanel";
import { useAuth0 } from "@auth0/auth0-react";
import PatientAppointment from "./PatientAppointment";

export default function PatientMain() {
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
            message={"Create New Appointment"}
            icon={"fa-solid fa-clipboard-user "}
            color={"green-600"}
            path={"/patient-new-appointment"}
          />
          <ActionPanel
            message={"Check Past Appointments"}
            icon={"fa-solid fa-clock "}
            color={"blue-600"}
            path={"/patient-appointments"}
          />
          <ActionPanel
            message={"Check Your Medical Record"}
            icon={"fa-solid fa-book-medical "}
            color={"yellow-600"}
            path={"/patient-history"}
          />
          <ActionPanel
            message={"Check Your Prescriptions"}
            icon={"fa-solid fa-prescription "}
            color={"red-600"}
            path={"/patient-prescriptions"}
          />
        </div>
      </div>
      <div className="w-full h-3/4 flex flex-col items-center gap-4">
        <PatientAppointment active={true} />
      </div>
    </div>
  );
}
