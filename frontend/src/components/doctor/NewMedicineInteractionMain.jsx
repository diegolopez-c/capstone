import React, { useEffect, useState } from "react";
import MedicineTypeaheadSearchbar from "./MedicineTypeaheadSearchbar";
import { Button, Textarea, addToast } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { createMedicineInteraction } from "../../api/interactions";

export default function NewMedicineInteractionMain() {
  const [selectedMedicineA, setSelectedMedicineA] = useState();
  const [selectedMedicineB, setSelectedMedicineB] = useState();
  const [interactionDescription, setInteractionDescription] = useState();

  const navigate = useNavigate();

  async function createInteraction() {
    if (!selectedMedicineA || !selectedMedicineB) {
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
      const newInteraction = await createMedicineInteraction(
        selectedMedicineB.id,
        selectedMedicineA.id,
        interactionDescription
      );
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
        New Medicine<span className="text-ca-yellow">/</span>Medicine
        Interaction
      </h1>
      <div className="rounded-xl bg-ca-light-black py-8 w-3/4 flex flex-col justify-center items-center gap-4">
        <div className="w-3/4 flex gap-4 flex-col items-center">
          <MedicineTypeaheadSearchbar
            setSelectedMedicine={setSelectedMedicineA}
          />
          <i className="fa-solid fa-xmark text-red-500 text-5xl" />
          <MedicineTypeaheadSearchbar
            setSelectedMedicine={setSelectedMedicineB}
          />
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
