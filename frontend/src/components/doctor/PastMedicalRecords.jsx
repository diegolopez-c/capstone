import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableColumn,
  TableBody,
  TableHeader,
} from "@heroui/react";
import formatFullDate from "../../utils/formatFullDate";
import { fetchAllPatientMedicalRecords } from "../../api/medicalRecordFunctions";

export default function PastMedicalRecords({ patientId }) {
  const [medicalRecordList, setMedicalRecordList] = useState([]);

  useEffect(() => {
    async function fetchMedical() {
      const response = await fetchAllPatientMedicalRecords(patientId);
      setMedicalRecordList(response.patientMedicalHistory);
    }

    if (patientId) {
      fetchMedical();
    }
  }, [patientId]);

  return (
    <>
      {patientId ? (
        <div className="w-2/5 bg-ca-black flex flex-col items-center rounded-xl p-4 gap-4 max-h-80">
          <h3 className="text-ca-white text-xl font-bold">
            Past Medical Records
          </h3>
          <Table
            hideHeader
            aria-label="Table for patient medical records"
            maxTableHeight={200}
            isVirtualized
          >
            <TableHeader>
              <TableColumn>Date For The Medical Record</TableColumn>
            </TableHeader>
            <TableBody>
              {medicalRecordList.map((medical) => {
                return (
                  <TableRow
                    key={medical.id}
                    className="hover:bg-ca-yellow cursor-pointer"
                  >
                    <TableCell>{formatFullDate(medical.createdAt)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
