import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import NewMedicineInteractionMain from "../../components/doctor/NewMedicineInteractionMain";

export default function NewMedicineInteractionPage() {
  return (
    <div>
      <div className="h-screen flex">
        <DoctorSidebar />
        <NewMedicineInteractionMain />
      </div>
    </div>
  );
}
