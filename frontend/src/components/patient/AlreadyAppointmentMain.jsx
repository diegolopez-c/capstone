import React from "react";
import PatientAppointment from "./PatientAppointment";

export default function AlreadyAppointmentMain() {
  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        You Already Have An Appointment
      </h1>
      <PatientAppointment active={true} />
    </div>
  );
}
