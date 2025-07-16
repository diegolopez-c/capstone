import React, { useState } from "react";
import { NumberInput, Button, addToast } from "@heroui/react";
import { fetchUserById } from "../../api/userFunctions";
import PatientInfo from "./PatientInfo";
import PastPrescriptions from "./PastPrescriptions";
import PastMedicalRecords from "./PastMedicalRecords";

export default function NewPrescriptionMain({ selectPatient }) {
  const [curPatientId, setCurPatientId] = useState();
  const [selectedPatient, setSelectedPatient] = useState();

  async function getPatientInfo() {
    try {
      const patientInfo = await fetchUserById(curPatientId);
      if (patientInfo) {
        setSelectedPatient(patientInfo);
      }
      console.log(patientInfo);
    } catch (error) {
      setCurPatientId();
      setSelectedPatient();
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
    <div className="w-3/4 flex flex-col items-center justify-center gap-10 py-8">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h3 className="text-ca-white text-xl font-bold">
          Search Patient By ID Number
        </h3>
        <div className="w-4/5 gap-4 flex items-center justify-center">
          <NumberInput
            hideStepper
            className="max-w-xs"
            label="Patient ID"
            placeholder="Enter the patient id"
            value={curPatientId}
            onChange={(e) => {
              setCurPatientId(e.target.value);
            }}
          />
          <Button
            onPress={() => {
              getPatientInfo();
            }}
          >
            Select Patient
          </Button>
        </div>
        <PatientInfo patientBody={selectedPatient} />
      </div>
      <div className="w-full flex gap-4 justify-around items-center">
        <PastPrescriptions
          patientId={selectedPatient ? selectedPatient.id : null}
        />
        <PastMedicalRecords
          patientId={selectedPatient ? selectedPatient.id : null}
        />
      </div>
      <Button
        onPress={() => {
          selectPatient(selectedPatient);
        }}
      >
        Next
      </Button>
    </div>
  );
}
