import React from "react";
import PatientCard from "./PatientCard";
import { Input, Textarea, Button, addToast } from "@heroui/react";
import { useState } from "react";
import { createMedicalRecord } from "../../api/medicalRecordFunctions";
import { useNavigate } from "react-router-dom";
import SymptomTypeaheadSearchbar from "./SymptomTypeaheadSearchbar";
import { createSymptomRecordsCall } from "../../api/symptomFunctions";

export default function NewMedicalRecordForm({
  patientBody,
  newMedicalRecord,
}) {
  //Form fields
  const [notes, setNotes] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [curSymptom, setCurSymptom] = useState();
  const [symptomList, setSymptomList] = useState([]);

  const navigate = useNavigate();

  async function createNewMedicalRecord() {
    if (!diagnosis) {
      addToast({
        title: "There was an error creating the medical record",
        description:
          "Please add a diagnosis before creating the medical record",
        color: "danger",
        timeout: 10000,
      });

      return;
    }

    try {
      const newRecord = await createMedicalRecord({
        ...newMedicalRecord,
        diagnosis,
        notes,
      });

      const symptomMedicalRecords = createSymptomRecordsCall(
        symptomList,
        newRecord.id
      );
    } catch (error) {
      console.error(error);
      addToast({
        title: "There was an error creating the medical record",
        description: "Please try again",
        color: "danger",
        timeout: 10000,
      });
    } finally {
      addToast({
        title: "The medical record was added successfully",
        color: "success",
        timeout: 10000,
      });
      navigate("/doctor-dashboard");
    }
  }

  function addSymptomToList() {
    if (!curSymptom) {
      addToast({
        title: "There was an error adding the symptom",
        description: "Please select a symptom before trying to add one",
        color: "danger",
        timeout: 10000,
      });
      return;
    }

    setSymptomList([...symptomList, curSymptom]);
  }

  function deleteSymptomFromList(symptomId) {
    const newList = symptomList.filter((s) => s.id !== symptomId);
    setSymptomList(newList);
  }

  return (
    <div className="w-7/8 flex items-center justify-center gap-10 py-8">
      <div className="w-3/8">
        <PatientCard patientBody={patientBody} />
      </div>
      <form
        className="w-5/8 flex flex-col gap-4 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          createNewMedicalRecord();
        }}
      >
        <Input
          type="text"
          label="Diagnosis"
          placeholder="Enter your diagnosis"
          value={diagnosis}
          onValueChange={setDiagnosis}
        />
        <Textarea
          label="More Details & Notes"
          placeholder="Enter your description"
          value={notes}
          onValueChange={setNotes}
          minRows={4}
        />
        <SymptomTypeaheadSearchbar setSelectedSymptom={setCurSymptom} />
        <div className="w-full border flex items-center justify-between max-h-22 h-20">
          <div className="w-5/8 bg-ca-white rounded-xl h-full flex flex-col overflow-scroll">
            {symptomList.map((s) => {
              return (
                <div className="w-full hover:bg-ca-yellow p-2 flex items-center justify-between">
                  <h4>{s.name}</h4>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => {
                      deleteSymptomFromList(s.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </div>
          <Button className="bg-ca-mint" onPress={addSymptomToList}>
            Add Symptom
          </Button>
        </div>
        <Button type="submit" size="md" color="success" className="w-min">
          Complete the registry
        </Button>
      </form>
    </div>
  );
}
