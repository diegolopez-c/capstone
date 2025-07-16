import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import NewPrescriptionMain2 from "../../components/doctor/NewPrescriptionMain";

export default function NewPrescriptionPage() {
  return (
    <div className="h-screen flex">
      <DoctorSidebar />
      <NewPrescriptionMain2 />
    </div>
  );
}
