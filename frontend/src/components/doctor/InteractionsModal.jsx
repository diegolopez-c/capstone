import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import checkDrugInteractions from "../../utils/checkDrugInteractions";
import { Spinner, Divider, Button } from "@heroui/react";
import { fetchInteractionsCall } from "../../api/interactions";
import { fetchMedicineInteractionsCall } from "../../api/interactions";

export default function InteractionsModal({
  isOpen,
  onClose,
  prescriptionMedicineList,
  selectedRecord,
}) {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [interactionsList, setInteractionsList] = useState([]);
  const [medicineInteractionsList, setMedicineInteractionsList] = useState([]);
  const [aiInteractions, setAiInteractions] = useState([]);

  useEffect(() => {
    async function fetchDrugInteractions() {
      setIsLoading(true);
      if (selectedRecord) {
        const interactions = await fetchInteractionsCall(
          selectedRecord,
          prescriptionMedicineList
        );
        setInteractionsList(interactions);
      }
      const medicineInteractions = await fetchMedicineInteractionsCall(
        prescriptionMedicineList
      );
      setMedicineInteractionsList(medicineInteractions);
      setIsLoading(false);
    }

    fetchDrugInteractions();
  }, []);

  async function fetchAIDrugInteractions() {
    setIsLoadingAI(true);
    const newList = await checkDrugInteractions(prescriptionMedicineList);
    setAiInteractions(newList);
    setIsLoadingAI(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-ca-black hover:text-red-500 cursor-pointer text-xl font-bold"
        >
          &times;
        </button>

        {/* Symptoms and Drug Interactions */}
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <h3 className="mt-4 text-center">
              The interactions between the prescription's current drugs and the
              medical history symptoms are loading...
            </h3>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Medicine / Symptoms Interactions
            </h2>

            {interactionsList.length > 0 ? (
              <div>
                {interactionsList.map((interaction, key) => (
                  <div key={key} className="text-gray-800">
                    <h3>
                      <span className="font-bold">Medicine:</span>{" "}
                      {interaction.medicine.brandName}{" "}
                      <span className="text-red-500">x </span>
                      <span className="font-bold">Symptom:</span>{" "}
                      {interaction.symptom.name}
                    </h3>
                    <p>{interaction.description}</p>
                    <Divider className="my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <h3 className="text-ca-light-black text-center">
                We couldn't find interactions between any pair of drug -
                symptoms in the current prescription.
              </h3>
            )}

            <Divider className="my-4" />

            <h2 className="text-xl font-semibold my-4">
              Medicine / Medicine Interactions
            </h2>

            {medicineInteractionsList.length > 0 ? (
              <div>
                {medicineInteractionsList.map((interaction, key) => (
                  <div key={key} className="text-gray-800">
                    <h3>
                      <span className="font-bold">Medicine A:</span>{" "}
                      {interaction.medicineA.brandName}{" "}
                      <span className="text-red-500">x </span>
                      <span className="font-bold">Medicine B:</span>{" "}
                      {interaction.medicineB.brandName}
                    </h3>
                    <p>{interaction.description}</p>
                    <Divider className="my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <h3 className="text-ca-light-black text-center">
                We couldn't find interactions between any pair of drug - drug in
                the current prescription.
              </h3>
            )}
          </>
        )}
        <h2 className="text-xl font-semibold mb-4">AI Drug Interactions</h2>
        <div className="flex flex-col items-center justify-center">
          {/* AI Between Drug Interaction */}
          {isLoadingAI ? (
            <div className="flex flex-col items-center">
              <Spinner />
              <h3 className="mt-4 text-center">
                The interactions between the prescription's current drugs are
                loading...
              </h3>
            </div>
          ) : (
            <>
              {aiInteractions.length > 0 ? (
                <div>
                  {aiInteractions.map((interaction, key) => (
                    <div key={key} className="text-gray-800">
                      <h3 className="font-bold">{interaction.name}</h3>
                      <p>{interaction.content}</p>
                      <Divider className="my-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 justify-center">
                  <h3 className="text-ca-light-black text-center">
                    We couldn't find interactions between any pair of drugs in
                    the current prescription.
                  </h3>
                </div>
              )}
              <Button
                className="bg-ca-yellow my-2"
                onPress={() => {
                  fetchAIDrugInteractions();
                }}
                endContent={<i className="fa-solid fa-wand-magic-sparkles" />}
              >
                Get AI Interactions
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
