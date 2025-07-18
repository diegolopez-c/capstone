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
import { fetchAllPatientPrescriptions } from "../../api/prescriptionFunctions";

export default function PastPrescriptions({ patientId }) {
  const [prescriptionsList, setPrescriptionsList] = useState([]);

  useEffect(() => {
    async function fetchPrescriptions() {
      const response = await fetchAllPatientPrescriptions(patientId);
      setPrescriptionsList(response);
    }

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  return (
    <>
      {patientId ? (
        <div className="w-2/5 bg-ca-black flex flex-col items-center rounded-xl p-4 gap-4 max-h-80">
          <h3 className="text-ca-white text-xl font-bold">
            Past Prescriptions
          </h3>
          <Table
            hideHeader
            aria-label="Table for prescriptions"
            maxTableHeight={200}
            isVirtualized
          >
            <TableHeader>
              <TableColumn>Date For The Prescription</TableColumn>
            </TableHeader>
            <TableBody>
              {prescriptionsList.map((prescription) => {
                return (
                  <TableRow
                    key={prescription.id}
                    className="hover:bg-ca-yellow cursor-pointer"
                  >
                    <TableCell>
                      {formatFullDate(prescription.createdAt)}
                    </TableCell>
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
