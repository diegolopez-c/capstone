import React from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientAppointment from "../../components/patient/PatientAppointment";

export default function PatientAppointmentsPage() {
  return (
    <div className="h-screen flex">
      <PatientSidebar />
      <PatientAppointment />
    </div>
  );
}
