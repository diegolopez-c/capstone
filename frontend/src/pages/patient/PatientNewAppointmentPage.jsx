import React from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientNewAppointmentMain from "../../components/patient/PatientNewAppointmentMain";

export default function PatientNewAppointmentPage() {
  return (
    <div className="h-screen flex">
      <PatientSidebar />
      <PatientNewAppointmentMain />
    </div>
  );
}
