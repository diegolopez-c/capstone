import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import formatFullDate from "../../utils/formatFullDate";

import { fetchHistoryById } from "../../api/medicalRecordFunctions";

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

export default function HistoryModal({
  isOpen,
  onOpenChange,
  selectedHistory,
}) {
  const [selectedHistoryBody, setSelectedHistoryBody] = useState();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const fetchedHistory = await fetchHistoryById(selectedHistory);
        setSelectedHistoryBody(fetchedHistory);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHistory();
  }, [selectedHistory]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-ca-black">
              <h3>
                {selectedHistoryBody
                  ? formatFullDate(selectedHistoryBody.createdAt)
                  : "History Body"}
              </h3>
            </ModalHeader>
            <ModalBody className="max-h-96 overflow-scroll text-ca-black">
              {selectedHistoryBody ? (
                <>
                  <p className="text-sm">
                    <span className="font-bold">Doctor:</span>{" "}
                    {`${selectedHistoryBody.doctor.name} ${selectedHistoryBody.doctor.lastname}`}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Diagnosis:</span>{" "}
                    {selectedHistoryBody.diagnosis}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Notes:</span>{" "}
                    {selectedHistoryBody.notes}
                  </p>
                  {selectedHistoryBody.symptoms?.length > 0 && (
                    <>
                      <p className="text-sm">
                        <span className="font-bold">Symptoms:</span>
                      </p>
                      <ul>
                        {selectedHistoryBody.symptoms.map((s, index) => (
                          <li key={index}>- {s.symptom.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : null}
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
