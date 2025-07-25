import React from "react";
import PatientSidebar from "../components/patient/PatientSidebar";
import PatientMain from "../components/patient/PatientMain";

export default function PatientDashboard() {
  return (
    <div className="h-screen flex">
      <PatientSidebar />
      <PatientMain />
    </div>
  );
}
