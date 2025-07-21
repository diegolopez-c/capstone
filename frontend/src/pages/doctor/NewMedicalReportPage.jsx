import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import NewMedicalRecordMain from "../../components/doctor/NewMedicalRecordMain";

export default function NewMedicalReportPage() {
  return (
    <div className="h-screen flex">
      <DoctorSidebar />
      <NewMedicalRecordMain />
    </div>
  );
}
