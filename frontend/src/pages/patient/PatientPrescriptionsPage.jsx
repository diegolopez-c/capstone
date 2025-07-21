import React from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import MyPrescriptions from "../../components/patient/MyPrescriptions";

export default function PatientPrescriptionsPage() {
  return (
    <div className="h-screen flex">
      <PatientSidebar />
      <MyPrescriptions />
    </div>
  );
}
