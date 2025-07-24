import React, { useState } from "react";
import { Input, Textarea, Button, addToast } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { createSymptomCall } from "../../api/symptomFunctions";

export default function NewSymptomMain() {
  const [symptomName, setSymptomName] = useState();
  const [symptomDescription, setSymptomDescription] = useState();

  const navigate = useNavigate();

  async function createNewSymptom() {
    if (!symptomDescription || !symptomName) {
      addToast({
        title: "There was an error creating the new symptom",
        description:
          "Please add a name description or name before creating a new symptom",
        color: "danger",
        timeout: 10000,
      });

      return;
    }

    try {
      const newRecord = await createSymptomCall({
        name: symptomName,
        description: symptomDescription,
      });
      addToast({
        title: "The symptom was added successfully",
        color: "success",
        timeout: 10000,
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "There was an error creating the new symptom",
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
      <h1 className="text-ca-white text-3xl font-bold">New Symptom</h1>
      <div className="rounded-xl bg-ca-light-black py-8 w-3/4 flex flex-col gap-4 justify-center items-center">
        <form
          className="w-5/8 flex flex-col gap-4 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            createNewSymptom();
          }}
        >
          <Input
            type="text"
            label="Symptom's Name"
            placeholder="Enter the new symptom name"
            value={symptomName}
            onValueChange={setSymptomName}
          />
          <Textarea
            label="Symptom's Description"
            placeholder="Enter the new symptom description"
            value={symptomDescription}
            onValueChange={setSymptomDescription}
            minRows={8}
          />
          <Button type="submit" size="md" color="success" className="w-min">
            Complete the registry
          </Button>
        </form>
      </div>
    </div>
  );
}
