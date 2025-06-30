import React from "react";
import DoctorSidebar from "../components/doctor/DoctorSidebar";
import DoctorMain from "../components/doctor/DoctorMain";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen flex">
      <DoctorSidebar />
      <DoctorMain />
    </div>
  );
}
