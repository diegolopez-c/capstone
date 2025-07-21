import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getMedicineByPrescription } from "../../api/medicineFunctions";
import { fetchPrescriptionById } from "../../api/prescriptionFunctions";
import formatFullDate from "../../utils/formatFullDate";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";

export default function PrescriptionModal({
  isOpen,
  onOpenChange,
  selectedPrescription,
}) {
  const [prescriptionBody, setPrescriptionBody] = useState();
  const [medicineList, setMedicineList] = useState();

  useEffect(() => {
    async function fetchInformation() {
      try {
        const fetchedPrescription = await fetchPrescriptionById(
          selectedPrescription
        );
        const fetchedMedicineList = await getMedicineByPrescription(
          selectedPrescription
        );

        setPrescriptionBody(fetchedPrescription);
        setMedicineList(fetchedMedicineList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInformation();
  }, [selectedPrescription]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-ca-black">
              <h3>
                {prescriptionBody
                  ? formatFullDate(prescriptionBody.createdAt)
                  : "Prescription Body"}
              </h3>
              {prescriptionBody && prescriptionBody.status ? (
                prescriptionBody.status === "ISSUED" ? (
                  <Chip color="warning">{prescriptionBody.status}</Chip>
                ) : (
                  <Chip color="success">{prescriptionBody.status}</Chip>
                )
              ) : (
                <Chip color="default">No Status</Chip>
              )}
            </ModalHeader>
            <ModalBody className="max-h-96 overflow-scroll">
              {medicineList &&
                medicineList.map((p, i) => {
                  return (
                    <div
                      key={i}
                      className="flex w-full flex-col bg-ca-white p-4 rounded-xl text-ca-black hover:bg-ca-light-black hover:text-ca-white border border-ca-black "
                    >
                      <h1 className="text-sm mb-2">{p.medicine.brandName}</h1>
                      {p.dosage.length > 0 ? (
                        <p className="text-xs">
                          <span className="font-bold">Dosage:</span> {p.dosage}
                        </p>
                      ) : (
                        <></>
                      )}
                      {p.frequency.length > 0 ? (
                        <p className="text-xs">
                          <span className="font-bold">Frequency:</span>{" "}
                          {p.frequency}
                        </p>
                      ) : (
                        <></>
                      )}
                      {p.duration.length > 0 ? (
                        <p className="text-xs">
                          <span className="font-bold">Duration:</span>{" "}
                          {p.duration}
                        </p>
                      ) : (
                        <></>
                      )}
                      {p.comments.length > 0 ? (
                        <p className="text-xs">
                          <span className="font-bold">Comments:</span>{" "}
                          {p.comments}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
