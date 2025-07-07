import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useState } from "react";

const tabSteps = ["docotor-selection", "schedule-selection", "confirmation"];

export default function PatientNewAppointmentMain() {
  const [selectedStep, setSelectedStep] = useState("doctor-selection");

  const disabledSteps = tabSteps.filter((key) => key !== selectedStep);

  return (
    <div className="w-3/4 h-screen flex flex-col items-center gap-4 py-8">
      <h1 className="text-ca-white text-3xl font-bold">
        Create New Appointment
      </h1>
      <h2>e</h2>
      <Tabs
        aria-label="Options"
        classNames={{
          tab: "bg-ca-black text-ca-white data-[selected=true]:bg-ca-light-black data-[selected=true]:text-yellow-200",
          tabList: "bg-ca-light-black",
        }}
        selectedKey={selectedStep}
        onSelectionChange={setSelectedStep}
        disabledKeys={disabledSteps}
      >
        <Tab key="doctor-selection" title="1.- Select Your Doctor">
          <Card>
            <CardBody>Lorem ipsum dolor sit amet</CardBody>
          </Card>
        </Tab>
        <Tab key="schedule-selection" title="2.- Select Your Schedule">
          <Card>
            <CardBody>Ut enim ad minim veniam</CardBody>
          </Card>
        </Tab>
        <Tab key="confirmation" title="3.- Finish Your Appointment">
          <Card>
            <CardBody>Excepteur sint occaecat cupidatat non proident</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
