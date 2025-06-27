import React from "react";
import AppointmentList from "./AppointmentList";

export default function DoctorMain() {
  return (
    <div className="w-3/4 border border-ca-dark-blue flex flex-col items-center justify-center">
      <h1>Welcome Diego Lopez</h1>
      <AppointmentList />
    </div>
  );
}
