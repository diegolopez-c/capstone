import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import NewInteractionMain from "../../components/doctor/NewInteractionMain";

export default function NewInteractionPage() {
  return (
    <div>
      <div className="h-screen flex">
        <DoctorSidebar />
        <NewInteractionMain />
      </div>
    </div>
  );
}
