import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import checkDrugInteractions from "../../utils/checkDrugInteractions";
import { Spinner, Divider } from "@heroui/react";

export default function InteractionsModal({
  isOpen,
  onClose,
  prescriptionMedicineList,
}) {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(true);
  const [interactionsList, setInteractionsList] = useState([]);

  useEffect(() => {
    async function fetchDrugInteractions() {
      setIsLoading(true);
      const newList = await checkDrugInteractions(prescriptionMedicineList);
      setInteractionsList(newList);
      setIsLoading(false);
    }

    fetchDrugInteractions();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-ca-black hover:text-red-500 cursor-pointer text-xl font-bold"
        >
          &times;
        </button>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <h3 className="mt-4 text-center">
              The interactions between the prescription's current drugs are
              loading...
            </h3>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Drug Interactions</h2>

            {interactionsList.length > 0 ? (
              <div>
                {interactionsList.map((interaction, key) => (
                  <div key={key} className="text-gray-800">
                    <h3 className="font-bold">{interaction.name}</h3>
                    <p>{interaction.content}</p>
                    <Divider className="my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <h3 className="text-ca-light-black text-center">
                We couldn't find interactions between any pair of drugs in the
                current prescription.
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
}
