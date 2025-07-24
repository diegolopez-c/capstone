import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableColumn,
  TableBody,
  TableHeader,
  Button,
  useDisclosure,
} from "@heroui/react";
import formatFullDate from "../../utils/formatFullDate";
import { fetchAllPatientMedicalRecords } from "../../api/medicalRecordFunctions";
import HistoryModal from "../patient/HistoryModal";

export default function PastMedicalRecords({
  patientId,
  setSelectedRecord,
  selectedRecord,
}) {
  const [medicalRecordList, setMedicalRecordList] = useState([]);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "createdAt",
    direction: "descending",
  });

  //Selected record to open modal
  const [selectedHistory, setSelectedHistory] = useState();

  //Modal Actions
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function fetchMedical() {
      const response = await fetchAllPatientMedicalRecords(patientId);
      setMedicalRecordList(response.patientMedicalHistory ?? []);
    }

    if (patientId) {
      fetchMedical();
    }
  }, [patientId]);

  const sortedList = useMemo(() => {
    const sorted = [...medicalRecordList].sort((a, b) => {
      const aDate = new Date(a[sortDescriptor.column]);
      const bDate = new Date(b[sortDescriptor.column]);

      return sortDescriptor.direction === "ascending"
        ? aDate - bDate
        : bDate - aDate;
    });
    return sorted;
  }, [medicalRecordList, sortDescriptor]);

  if (!patientId) return null;

  return (
    <div className="w-full bg-ca-black flex flex-col items-center rounded-xl p-4 gap-4 max-h-80">
      <h3 className="text-ca-white text-xl font-bold">Past Medical Records</h3>
      <Table
        aria-label="Table for patient medical records"
        maxTableHeight={200}
        isVirtualized
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="createdAt" allowsSorting>
            Date For The Medical Record
          </TableColumn>
          <TableColumn key="details">Details</TableColumn>
          <TableColumn key="select">Select</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedList.map((medical) => (
            <TableRow
              key={medical.id}
              className={`cursor-pointer ${
                medical.id === selectedRecord ? "bg-green-100" : "bg-ca-white"
              }`}
            >
              <TableCell>{formatFullDate(medical.createdAt)}</TableCell>
              <TableCell>
                <Button
                  onPress={() => {
                    setSelectedHistory(medical);
                    onOpen();
                  }}
                  variant="light"
                  color="primary"
                >
                  View Details
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onPress={() => {
                    setSelectedRecord(medical.id);
                  }}
                  variant="solid"
                  color="success"
                  isDisabled={typeof setSelectedRecord !== "function"}
                >
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <HistoryModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedHistory={selectedHistory ? selectedHistory.id : 0}
      />
    </div>
  );
}
