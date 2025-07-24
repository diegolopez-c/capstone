import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import NewSymptomMain from "../../components/doctor/NewSymptomMain";

export default function NewSymptomPage() {
  return (
    <div className="h-screen flex">
      <DoctorSidebar />
      <NewSymptomMain />
    </div>
  );
}
