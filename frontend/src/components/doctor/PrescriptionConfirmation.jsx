import React from "react";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import CancelButton from "./CancelButton";

export default function PrescriptionConfirmation({
  prescriptionMedicineList,
  createNewPrescription,
}) {
  return (
    <div className="w-3/4 flex flex-col items-center justify-center gap-10 py-8">
      <div className="flex flex-col w-full items-center justify-center gap-6">
        {prescriptionMedicineList.map((p, k) => {
          return (
            <div
              key={k}
              className="flex w-full flex-col bg-ca-white p-4 rounded-xl"
            >
              <h1 className="text-sm mb-2">{p.name}</h1>
              {p.dosage.length > 0 ? (
                <p className="text-xs">
                  <span className="font-bold">Dosage:</span> {p.dosage}
                </p>
              ) : (
                <></>
              )}
              {p.frequency.length > 0 ? (
                <p className="text-xs">
                  <span className="font-bold">Frequency:</span> {p.frequency}
                </p>
              ) : (
                <></>
              )}
              {p.duration.length > 0 ? (
                <p className="text-xs">
                  <span className="font-bold">Duration:</span> {p.duration}
                </p>
              ) : (
                <></>
              )}
              {p.comments.length > 0 ? (
                <p className="text-xs">
                  <span className="font-bold">Comments:</span> {p.comments}
                </p>
              ) : (
                <></>
              )}
            </div>
          );
        })}

        <div className="w-full flex items-center justify-center gap-8">
          <CancelButton />
          <Button
            color="success"
            onPress={() => {
              createNewPrescription();
            }}
          >
            Create The Prescription
          </Button>
        </div>
      </div>
    </div>
  );
}
