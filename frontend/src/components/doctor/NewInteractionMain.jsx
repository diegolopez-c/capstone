import React, { useEffect, useState } from "react";
import MedicineTypeaheadSearchbar from "./MedicineTypeaheadSearchbar";
import SymptomTypeaheadSearchbar from "./SymptomTypeaheadSearchbar";
import { Button, Textarea, addToast } from "@heroui/react";
import { createInteractionCall } from "../../api/symptomFunctions";
import { useNavigate } from "react-router-dom";

export default function NewInteractionMain() {
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [selectedSymptom, setSelectedSymptom] = useState();
  const [interactionDescription, setInteractionDescription] = useState();

  const navigate = useNavigate();

  async function createInteraction() {
    if (!selectedMedicine || !selectedSymptom) {
      addToast({
        title: "There was an error creating the new interaction",
        description:
          "Please add a name symptom and medicine before creating a new interaction",
        color: "danger",
        timeout: 10000,
      });
      return;
    }

    try {
      const newInteraction = await createInteractionCall({
        symptomId: selectedSymptom.id,
        medicineId: selectedMedicine.id,
        description: interactionDescription,
      });
      addToast({
        title: "The interaction was created successfully",
        color: "success",
        timeout: 10000,
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "There was an error creating the new interaction",
        description: "Please try again",
        color: "danger",
        timeout: 10000,
      });
    } finally {
      navigate("/doctor-dashboard");
    }
  }

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        Create a New Symptom - Medicine Interaction
      </h1>
      <div className="rounded-xl bg-ca-light-black py-8 w-3/4 flex flex-col justify-center items-center gap-4">
        <div className="w-3/4 flex gap-4 flex-col items-center">
          <MedicineTypeaheadSearchbar
            setSelectedMedicine={setSelectedMedicine}
          />
          <i className="fa-solid fa-xmark text-red-500 text-5xl" />
          <SymptomTypeaheadSearchbar setSelectedSymptom={setSelectedSymptom} />
          <Textarea
            label="Interaction Description"
            placeholder="Enter the new interaction description"
            value={interactionDescription}
            onValueChange={setInteractionDescription}
            minRows={4}
          />
        </div>
        <Button
          color="danger"
          onPress={() => {
            createInteraction();
          }}
        >
          Create Interaction
        </Button>
      </div>
    </div>
  );
}
