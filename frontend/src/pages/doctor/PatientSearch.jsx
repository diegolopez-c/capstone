import React from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import MainSection from "../../components/MainSection";
import { Input } from "@heroui/react";

export default function PatientSeach() {
  return (
    <div className="h-screen flex">
      <DoctorSidebar />
      <MainSection>
        <div className="flex w-full h-1/5 items-center justify-center">
          <Input
            className="w-4/5"
            label="Search Pacient..."
            type="text"
            variant="flat"
          />
        </div>
      </MainSection>
    </div>
  );
}
