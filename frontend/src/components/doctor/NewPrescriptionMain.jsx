import React, { useState, addToast } from "react";
import { NumberInput, Button } from "@heroui/react";
import { fetchUserById } from "../../api/userFunctions";

export default function NewPrescriptionMain() {
  const [curPatientId, setCurPatientId] = useState();
  const [selectedPatient, setSelectedPatient] = useState({});

  async function getPatientInfo() {
    try {
      const patientInfo = await fetchUserById(curPatientId);
      if (patientInfo) {
        setSelectedPatient(patientInfo);
      }
    } catch (error) {
      addToast({
        title: "The Patient Wasn't Found",
        description: "The patient id provided is invalid, try another one",
        color: "danger",
        timeout: 10000,
      });
      console.error(error);
    }
  }

  return (
    <div className="w-3/4 h-screen flex flex-col items-center gap-4 py-8">
      <h1 className="text-ca-white text-3xl font-bold">
        Make New Prescription
      </h1>
      <h3 className="text-ca-white text-xl font-bold">
        Search Patient By ID Number
      </h3>
      <div className="w-4/5 gap-4 flex items-center justify-center">
        <NumberInput
          hideStepper
          className="max-w-xs"
          label="Patient ID"
          placeholder="Enter the patient id"
        />
        <Button>Select Patient</Button>
      </div>
    </div>
  );
}
