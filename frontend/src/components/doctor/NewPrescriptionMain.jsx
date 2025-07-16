import React from "react";
import { Tabs, Tab, Card, CardBody, Spinner, addToast } from "@heroui/react";
import { useState } from "react";
import NewPrescriptionMain from "./PatientSelection";

const tabSteps = [
  "patient-selection",
  "medicine-addition",
  "confirm-prescription",
];

export default function NewPrescriptionMain2() {
  //Set selected tab
  const [selectedStep, setSelectedStep] = useState("patient-selection");

  //Set New Prescription an Medicine List of it Body
  const [newPrescription, setNewPrescription] = useState({});
  const [prescriptionMedicineList, setPrescriptionMedicineList] = useState([]);

  //Body compponent depending the selected step
  let body = useState(<NewPrescriptionMain />);

  switch (selectedStep) {
    case "patient-selection":
      body = <NewPrescriptionMain />;
      break;

    case "medicine-selection":
      body = <NewPrescriptionMain />;
      break;

    case "confirm-prescription":
      body = <NewPrescriptionMain />;
      break;

    default:
      body = <Spinner />;
      break;
  }

  return (
    <div className="w-3/4 h-screen flex flex-col items-center gap-8 py-8">
      <h1 className="text-ca-white text-3xl font-bold">
        Make New Prescription
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
          key="patient-selection"
          title="1.- Select The Patient"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6 items-center justify-center">
              {body}
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="medicine-addition"
          title="2.- Add The Medicine For The Prescription"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6 items-center justify-center">
              {body}
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="confirm-prescription"
          title="3.- Confirm The Prescription"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6 items-center justify-center">
              {body}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
