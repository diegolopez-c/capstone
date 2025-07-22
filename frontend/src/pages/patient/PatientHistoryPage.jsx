import React from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import MyHistoryMain from "../../components/patient/MyHistoryMain";

export default function PatientHistoryPage() {
  return (
    <div className="h-screen flex">
      <PatientSidebar />
      <MyHistoryMain />
    </div>
  );
}
