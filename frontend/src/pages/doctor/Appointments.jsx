import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import AppointmentList from "../../components/AppointmentList";
import MainSection from "../../components/MainSection";

export default function Appointments() {
  return (
    <div className="h-screen flex">
      <DoctorSidebar />
      <MainSection>
        <AppointmentList />
      </MainSection>
    </div>
  );
}
