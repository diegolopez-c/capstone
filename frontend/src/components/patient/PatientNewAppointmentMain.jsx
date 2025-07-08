import React from "react";
import DoctorSelectionBody from "./DoctorSelectionBody";
import { Tabs, Tab, Card, CardBody, Spinner, addToast } from "@heroui/react";
import { useState } from "react";
import ScheduleSelectionBody from "./ScheduleSelectionBody";
import AppointmentDetails from "./AppointmentDetails";

const tabSteps = ["doctor-selection", "schedule-selection", "confirmation"];

export default function PatientNewAppointmentMain() {
  //Set selected tab
  const [selectedStep, setSelectedStep] = useState("doctor-selection");

  //Set New Appointment Body
  const [newAppointment, setNewAppointment] = useState({});

  //Select doctor function
  function selectDoctor(doctorBody) {
    if (!doctorBody) {
      //TODO MAKE MESSAGE TOAST TO DISPLAY ERROR

      return;
    }

    setNewAppointment({ ...newAppointment, doctorId: doctorBody.id });
    setSelectedStep("schedule-selection");
  }

  //Select schedule
  function selectSchedule(scheduleDate) {
    if (!scheduleDate) {
      //TODO MAKE MESSAGE TOAST TO DISPLAY ERROR

      return;
    }

    setNewAppointment({ ...newAppointment, scheduleDate });
    setSelectedStep("confirmation");
  }

  //Body compponent depending the selected step
  let body;
  switch (selectedStep) {
    case "doctor-selection":
      body = <DoctorSelectionBody selectDoctor={selectDoctor} />;
      break;

    case "schedule-selection":
      body = <ScheduleSelectionBody selectSchedule={selectSchedule} />;
      break;

    case "confirmation":
      body = <AppointmentDetails />;
      break;

    default:
      body = <Spinner />;
      break;
  }

  return (
    <div className="w-3/4 h-screen flex flex-col items-center gap-4 py-8">
      {/** Create New Appointment Title */}
      <h1 className="text-ca-white text-3xl font-bold">
        Create New Appointment
      </h1>

      {/** Tab Navigation */}
      <Tabs
        aria-label="Options"
        classNames={{
          tab: "bg-ca-black text-ca-white data-[selected=true]:bg-ca-light-black data-[selected=true]:text-yellow-200",
          tabList: "bg-ca-light-black",
        }}
        selectedKey={selectedStep}
        onSelectionChange={setSelectedStep}
        disabledKeys={tabSteps.filter((key) => key !== selectedStep)}
      >
        {/**Doctor Selection Tab */}
        <Tab
          key="doctor-selection"
          title="1.- Select Your Doctor"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6">{body}</CardBody>
          </Card>
        </Tab>
        <Tab
          key="schedule-selection"
          title="2.- Select Your Schedule"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6">{body}</CardBody>
          </Card>
        </Tab>
        <Tab
          key="confirmation"
          title="3.- Finish Your Appointment"
          className="w-full flex items-center justify-center"
        >
          <Card>
            <CardBody>{body}</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
